const fs = require("fs");
const path = require("path");
const https = require("https");
const http = require("http");
const { S3Client, PutObjectCommand, HeadObjectCommand } = require("@aws-sdk/client-s3");
const mime = require("mime-types");
require("dotenv").config();

const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID;
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID;
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY;
const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME;
const R2_PUBLIC_URL = process.env.R2_PUBLIC_URL || "https://pub-35f6e385af654edaa1c5aded83150048.r2.dev";

const s3 = new S3Client({
  region: "auto",
  endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: R2_ACCESS_KEY_ID,
    secretAccessKey: R2_SECRET_ACCESS_KEY,
  },
});

// Recursively find all source files
function findFiles(dir, list = []) {
  const entries = fs.readdirSync(dir);
  for (const entry of entries) {
    if (entry === "node_modules" || entry === ".git" || entry === ".system_generated") continue;
    const fullPath = path.join(dir, entry);
    if (fs.statSync(fullPath).isDirectory()) {
      findFiles(fullPath, list);
    } else if (/\.(js|html|json|txt|jsx)$/i.test(entry)) {
      list.push(fullPath);
    }
  }
  return list;
}

const { execSync } = require("child_process");

// Download buffer helper using curl.exe to bypass CDN/Cloudflare bot fingerprinting
function downloadBuffer(url) {
  return new Promise((resolve, reject) => {
    // Fallback for known local icons if URL is ibb.co
    if (url.includes("2-UKA-British-council-Logo.png") && fs.existsSync("public/2_UKABritish-council-Logo.png")) {
      return resolve(fs.readFileSync("public/2_UKABritish-council-Logo.png"));
    }
    if (url.includes("highlighter-outline.png") && fs.existsSync("icons/highlighter outline.png")) {
      return resolve(fs.readFileSync("icons/highlighter outline.png"));
    }
    if (url.includes("highlighter.png") && fs.existsSync("icons/highlighter.png")) {
      return resolve(fs.readFileSync("icons/highlighter.png"));
    }

    const tempFile = path.join(__dirname, `temp_dl_${Date.now()}_${Math.random().toString(36).substring(7)}.tmp`);
    try {
      // Use bare curl.exe with follow redirects (-L) (engnovate blocks browser UAs from scripts)
      const cmd = `curl.exe -s -L -o "${tempFile}" -w "%{http_code}" "${url}"`;
      const httpCode = execSync(cmd, { stdio: ["ignore", "pipe", "ignore"], encoding: "utf8" }).trim();

      if (httpCode !== "200" && httpCode !== "304") {
        if (fs.existsSync(tempFile)) fs.unlinkSync(tempFile);
        return reject(new Error(`curl failed with HTTP ${httpCode}: ${url}`));
      }

      if (!fs.existsSync(tempFile) || fs.statSync(tempFile).size === 0) {
        if (fs.existsSync(tempFile)) fs.unlinkSync(tempFile);
        return reject(new Error(`curl downloaded empty file: ${url}`));
      }

      const buffer = fs.readFileSync(tempFile);
      fs.unlinkSync(tempFile);
      resolve(buffer);
    } catch (err) {
      if (fs.existsSync(tempFile)) fs.unlinkSync(tempFile);
      reject(err);
    }
  });
}

// Upload buffer to R2
async function uploadToR2(s3Key, buffer, contentType) {
  await s3.send(
    new PutObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: s3Key,
      Body: buffer,
      ContentType: contentType,
      ContentLength: buffer.length,
    })
  );
}

async function main() {
  console.log("==================================================");
  console.log("🔍 Scanning project files for 3rd-party media URLs...");
  console.log("==================================================\n");

  const files = findFiles(".");
  const urlRegex = /(https?:\/\/[^\s"'`><)]+?\.(png|jpg|jpeg|webp|gif|svg)(?:\?[^\s"'`><)]*)?)/gi;
  const urlToFiles = new Map();

  for (const filePath of files) {
    // Skip this migration script itself
    if (filePath.includes("migrate-external-images.js")) continue;

    const content = fs.readFileSync(filePath, "utf8");
    let match;
    while ((match = urlRegex.exec(content)) !== null) {
      let rawUrl = match[1];

      // Clean trailing punctuation if any
      rawUrl = rawUrl.replace(/[,\;)]+$/, "");

      // Ignore localhost, w3.org, and our R2 URLs
      if (
        rawUrl.includes("localhost") ||
        rawUrl.includes("w3.org") ||
        rawUrl.includes(R2_PUBLIC_URL) ||
        rawUrl.includes("r2.cloudflarestorage.com")
      ) {
        continue;
      }

      if (!urlToFiles.has(rawUrl)) {
        urlToFiles.set(rawUrl, new Set());
      }
      urlToFiles.get(rawUrl).add(filePath);
    }
  }

  console.log(`📌 Found ${urlToFiles.size} unique 3rd-party media URLs across project files.\n`);

  const urlMapping = new Map();
  let count = 0;

  for (const [rawUrl, fileSet] of urlToFiles.entries()) {
    count++;
    console.log(`--------------------------------------------------`);
    console.log(`[${count}/${urlToFiles.size}] Processing: ${rawUrl}`);
    console.log(`   Found in ${fileSet.size} file(s):`);
    fileSet.forEach((f) => console.log(`     - ${f}`));

    try {
      // 1. Download image
      process.stdout.write("   ⬇️  Downloading... ");
      const buffer = await downloadBuffer(rawUrl);
      const sizeKB = (buffer.length / 1024).toFixed(2);
      console.log(`Done (${sizeKB} KB)`);

      // 2. Generate clean filename
      const urlObj = new URL(rawUrl);
      let filename = path.basename(decodeURIComponent(urlObj.pathname));
      // Sanitize filename
      filename = filename.replace(/[^a-zA-Z0-9._-]/g, "_");

      const s3Key = `external-images/${filename}`;
      const contentType = mime.lookup(filename) || "image/png";

      // 3. Upload to R2
      process.stdout.write(`   ⬆️  Uploading to R2 (${s3Key})... `);
      await uploadToR2(s3Key, buffer, contentType);
      console.log("Done!");

      const newR2Url = `${R2_PUBLIC_URL}/${s3Key}`;
      urlMapping.set(rawUrl, newR2Url);
      console.log(`   🔗 New R2 URL: ${newR2Url}`);
    } catch (err) {
      console.error(`   ❌ ERROR processing ${rawUrl}:`, err.message);
    }
  }

  console.log("\n==================================================");
  console.log("✏️  Replacing old 3rd-party URLs with permanent R2 URLs...");
  console.log("==================================================\n");

  let totalReplacements = 0;
  const modifiedFiles = new Set();

  for (const [rawUrl, newUrl] of urlMapping.entries()) {
    const targetFiles = urlToFiles.get(rawUrl);
    if (!targetFiles) continue;

    for (const filePath of targetFiles) {
      const originalContent = fs.readFileSync(filePath, "utf8");
      if (originalContent.includes(rawUrl)) {
        const updatedContent = originalContent.split(rawUrl).join(newUrl);
        fs.writeFileSync(filePath, updatedContent, "utf8");
        modifiedFiles.add(filePath);
        totalReplacements++;
        console.log(`   ✅ Replaced in: ${filePath}`);
      }
    }
  }

  console.log("\n==================================================");
  console.log(`🎉 Migration Completed Successfully!`);
  console.log(`   - Images Downloaded & Uploaded to R2: ${urlMapping.size}/${urlToFiles.size}`);
  console.log(`   - Files Modified: ${modifiedFiles.size}`);
  console.log(`   - Total URL Replacements: ${totalReplacements}`);
  console.log("==================================================\n");
}

main().catch((err) => {
  console.error("FATAL ERROR:", err);
  process.exit(1);
});
