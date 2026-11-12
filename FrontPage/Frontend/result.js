window.onload = () => {
  // Read saved values
  let percent = Number(localStorage.getItem("finalPercent")) || 0;

  // Convert to 1 decimal place
  percent = Number(percent.toFixed(1));

  const score = Number(localStorage.getItem("finalScore")) || 0;
  const total = Number(localStorage.getItem("totalQuestions")) || 0;
  const cefr = localStorage.getItem("cefrLevel") || 'N/A';
  const time = localStorage.getItem("submitTime") || 'N/A';

  // Update DOM
  document.getElementById("percentText").textContent = `${percent}%`;
  document.getElementById("cefrLevelText").textContent = cefr;

  document.getElementById("resultDetails").innerHTML =
    generateResultMessage(percent, score, total, cefr, time);

  // Animate circles
  animatePercentCircle(percent);
  animateCefrCircle(cefr);
};


/* ======================================================
   Generate Friendly Result Message
====================================================== */
function generateResultMessage(percent, score, total, cefr, time) {
  let message = "";

  const p = Number(percent); // convert for comparisons

  if (p < 30) {
    message = "Don't worry! English takes practice. Keep learning and you'll improve quickly!";
  } else if (p < 45) {
    message = "Good start! Keep studying and practicing to get better results.";
  } else if (p < 60) {
    message = "Nice effort! You have a basic understanding of English. Keep going!";
  } else if (p < 75) {
    message = "Well done! You have a good grasp of English. Keep practicing to improve even more.";
  } else if (p < 90) {
    message = "Great job! Your English is strong. You're ready for more advanced challenges!";
  } else {
    message = "Excellent! Your English skills are impressive. Keep up the great work!";
  }

  const cefrMeaning = {
    A1: "Beginner",
    A2: "Elementary",
    B1: "Intermediate",
    B2: "Upper Intermediate",
    C1: "Advanced",
    C2: "Proficient"
  }[cefr] || "N/A";

  message += `<br><br><strong>Score:</strong> ${score}/${total} • <strong>Percentage:</strong> ${percent}% • <strong>Time:</strong> ${time}`;
  message += `<br><strong>CEFR Level:</strong> ${cefr} (${cefrMeaning})`;

  return message;
}


/* ======================================================
   Circle Animation — Percentage
====================================================== */
function animatePercentCircle(percent) {
  percent = Number(percent); // ensure it's number

  const arc = document.getElementById("percentArc");
  const r = 60;
  const c = 2 * Math.PI * r;

  arc.style.strokeDasharray = c;
  arc.style.strokeDashoffset = c;

  setTimeout(() => {
    arc.style.transition = "stroke-dashoffset 1.2s ease";
    arc.style.strokeDashoffset = c - (percent / 100) * c;
  }, 200);
}


/* ======================================================
   Circle Animation — CEFR
====================================================== */
function animateCefrCircle(level) {
  const cefrMap = {
    A1: 15,
    A2: 30,
    B1: 50,
    B2: 70,
    C1: 85,
    C2: 100
  };

  const percent = cefrMap[level] || 0;

  const arc = document.getElementById("cefrArc");
  const r = 60;
  const c = 2 * Math.PI * r;

  arc.style.strokeDasharray = c;
  arc.style.strokeDashoffset = c;

  setTimeout(() => {
    arc.style.transition = "stroke-dashoffset 1.2s ease";
    arc.style.strokeDashoffset = c - (percent / 100) * c;
  }, 200);
}



/* -------------------------- PDF DOWNLOAD --------------------------- */
function downloadPDF() {
  createAndDownloadPDF();
}

async function createAndDownloadPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const now = new Date().toLocaleString();

  // User info
  const user = JSON.parse(localStorage.getItem("loggedInUser")) || { name: "N/A", email: "N/A" };

  // Test Results
  let percent = Number(localStorage.getItem("finalPercent")) || 0;
  percent = Number(percent).toFixed(1); // ⭐ 1 decimal place for PDF also

  const score = Number(localStorage.getItem("finalScore")) || 0;
  const total = Number(localStorage.getItem("totalQuestions")) || 0;
  const cefr = localStorage.getItem("cefrLevel") || "N/A";

  const cefrMeaning = {
    A1:"Beginner",
    A2:"Elementary",
    B1:"Intermediate",
    B2:"Upper Intermediate",
    C1:"Advanced",
    C2:"Proficient"
  }[cefr] || "N/A";

  // Background
  doc.setFillColor(245, 248, 252);
  doc.rect(0,0,pageWidth,pageHeight,'F');

  // Logo
  const logoImg = new Image();
  logoImg.src = "2_UKA-&-British-council-Logo.png";

  logoImg.onload = () => {

    /* ============== HEADER ============== */
    const logoWidth = 300;
    const logoHeight = 80;

    doc.addImage(
      logoImg,
      "PNG",
      pageWidth / 2 - logoWidth / 2,
      40,
      logoWidth,
      logoHeight
    );

    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(46,184,184);
    doc.text("UKA TECHNICAL INSTITUTE", pageWidth/2, 40 + logoHeight + 35, {align:"center"});

    doc.setFont("helvetica", "normal");
    doc.setFontSize(14);
    doc.setTextColor(60,60,60);
    doc.text("English Level Test Result", pageWidth/2, 40 + logoHeight + 60, {align:"center"});

    /* ============== Candidate Box ============== */

    const candidateBoxY = 40 + logoHeight + 90;

    doc.setDrawColor(46,184,184);
    doc.setFillColor(230,250,250);
    doc.roundedRect(40, candidateBoxY, pageWidth - 80, 70, 10, 10, 'FD');

    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("Candidate Name:", 60, candidateBoxY + 25);
    doc.setFont("helvetica","normal");
    doc.text(user.name, 180, candidateBoxY + 25);

    doc.setFont("helvetica", "bold");
    doc.text("Email:", 60, candidateBoxY + 50);
    doc.setFont("helvetica","normal");
    doc.text(user.email, 180, candidateBoxY + 50);

    /* ============== Result Box ============== */

    const resultBoxY = candidateBoxY + 100;

    doc.setDrawColor(46,184,184);
    doc.setFillColor(255,255,255);
    doc.roundedRect(40, resultBoxY, pageWidth - 80, 220, 12,12,'FD');

    // Percentage BIG
    doc.setFont("helvetica","bold");
    doc.setFontSize(48);
    doc.setTextColor(46,184,184);
    doc.text(`${percent}%`, pageWidth/2, resultBoxY + 70, {align:"center"});

    doc.setFont("helvetica","italic");
    doc.setFontSize(14);
    doc.setTextColor(80,80,80);
    doc.text("Overall Performance", pageWidth/2, resultBoxY + 100, {align:"center"});

    // Table
    let y = resultBoxY + 130;
    const data = [
      ["Score", `${score}/${total}`],
      ["Percentage", `${percent}%`],
      ["CEFR Level", `${cefr} (${cefrMeaning})`]
    ];

    data.forEach(([label,value])=>{
      doc.setFont("helvetica","bold");
      doc.setFontSize(14);
      doc.text(label, 80, y);
      doc.setFont("helvetica","normal");
      doc.text(":", 240, y);
      doc.text(value, 260, y);
      y += 30;
    });

    /* ============== FOOTER ============== */

    doc.setFont("helvetica","normal");
    doc.setFontSize(12);
    doc.setTextColor(50,50,50);

    doc.text("English Level Test by UKA TECHNICAL INSTITUTE", pageWidth/2, pageHeight - 40, {align:"center"});
    doc.text(`Date: ${now}`, pageWidth/2, pageHeight - 20, {align:"center"});

    /* ============== SAVE ============== */
    doc.save(`UKA_Result_${user.name.replace(/\s+/g,"_")}.pdf`);
  };
}
