const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const fs = require("fs");
const path = require("path");
const mime = require("mime-types");
require("dotenv").config();

// ==========================================
// ১. আপনার Cloudflare R2 ক্রেডেনশিয়াল
// ==========================================
const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID || "YOUR_ACCOUNT_ID_HERE";
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID || "YOUR_ACCESS_KEY_ID_HERE";
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY || "YOUR_SECRET_ACCESS_KEY_HERE";
const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME || "YOUR_BUCKET_NAME_HERE";

// R2 S3 Client তৈরি
const s3 = new S3Client({
  region: "auto",
  endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: R2_ACCESS_KEY_ID,
    secretAccessKey: R2_SECRET_ACCESS_KEY,
  },
});

// ==========================================
// ২. যেসব ফোল্ডার R2-তে আপলোড হবে
// ==========================================
const UPLOAD_TARGETS = [
  // { localDir: লোকাল ফোল্ডার পাথ, s3Prefix: R2 তে যে ফোল্ডারে যাবে }
  { localDir: path.join(__dirname, "audio"), s3Prefix: "audio" },
  { localDir: path.join(__dirname, "views/practice_pages/listening/audios-practice"), s3Prefix: "audios-practice" },
  { localDir: path.join(__dirname, "public/Image"), s3Prefix: "Image" },
  { localDir: path.join(__dirname, "videos"), s3Prefix: "videos" },
];

// রুট ডিরেক্টরিতে থাকা সিঙ্গেল ইমেজ ফাইল (যদি থাকে)
const SINGLE_FILES = [
  {
    localPath: path.join(__dirname, "cambridge-ielts-19-academic-listening-test-1-16-20.webp"),
    s3Key: "cambridge-ielts-19-academic-listening-test-1-16-20.webp"
  }
];

// ফোল্ডারের ভেতরের সমস্ত ফাইল খোঁজার ফাংশন
function getAllFiles(dirPath, arrayOfFiles = []) {
  if (!fs.existsSync(dirPath)) return arrayOfFiles;
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
    } else {
      arrayOfFiles.push(fullPath);
    }
  });

  return arrayOfFiles;
}

// একটি ফাইল R2-তে আপলোড করার ফাংশন
async function uploadFile(localPath, s3Key) {
  const fileStats = fs.statSync(localPath);
  const fileSize = (fileStats.size / (1024 * 1024)).toFixed(2); // MB
  const fileStream = fs.createReadStream(localPath);
  const contentType = mime.lookup(localPath) || "application/octet-stream";

  const uploadParams = {
    Bucket: R2_BUCKET_NAME,
    Key: s3Key.replace(/\\/g, "/"), // Windows backslash to forward slash
    Body: fileStream,
    ContentLength: fileStats.size,
    ContentType: contentType,
  };

  await s3.send(new PutObjectCommand(uploadParams));
  return fileSize;
}

// মেইন এক্সিকিউশন
async function main() {
  console.log("\n================================================");
  console.log("🚀 Cloudflare R2 Media Uploader Starting...");
  console.log(`📦 Target Bucket: ${R2_BUCKET_NAME}`);
  console.log("================================================\n");

  if (
    R2_ACCOUNT_ID.includes("YOUR_") ||
    R2_ACCESS_KEY_ID.includes("YOUR_") ||
    R2_SECRET_ACCESS_KEY.includes("YOUR_")
  ) {
    console.error("❌ অনুগ্রহ করে .env ফাইল অথবা upload-to-r2.js ফাইলে আপনার R2 Credentials বসান!");
    process.exit(1);
  }

  // আপলোডের তালিকা তৈরি
  const filesToUpload = [];

  for (const target of UPLOAD_TARGETS) {
    if (fs.existsSync(target.localDir)) {
      const files = getAllFiles(target.localDir);
      files.forEach((file) => {
        const relativeToTarget = path.relative(target.localDir, file);
        const s3Key = `${target.s3Prefix}/${relativeToTarget}`;
        filesToUpload.push({ localPath: file, s3Key });
      });
    }
  }

  // সিঙ্গেল ফাইল যুক্ত করা
  for (const item of SINGLE_FILES) {
    if (fs.existsSync(item.localPath)) {
      filesToUpload.push({ localPath: item.localPath, s3Key: item.s3Key });
    }
  }

  console.log(`📊 মোট ফাইল পাওয়া গেছে: ${filesToUpload.length} টি\n`);

  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < filesToUpload.length; i++) {
    const item = filesToUpload[i];
    const progress = `[${i + 1}/${filesToUpload.length}]`;

    try {
      process.stdout.write(`⏳ ${progress} Uploading: ${item.s3Key} ... `);
      const sizeMB = await uploadFile(item.localPath, item.s3Key);
      console.log(`✅ Done (${sizeMB} MB)`);
      successCount++;
    } catch (err) {
      console.log(`❌ Failed: ${err.message}`);
      failCount++;
    }
  }

  console.log("\n================================================");
  console.log(`🎉 আপলোড সম্পন্ন! সফল: ${successCount}, ব্যর্থ: ${failCount}`);
  console.log("================================================\n");
}

main();
