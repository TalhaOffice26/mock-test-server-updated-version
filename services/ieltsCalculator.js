// IELTS Band Calculation Helper matching UKA Official Standards

function calculateBand(raw, module, type = "ACADEMIC") {
  if (!raw || raw <= 0) return 0;
  const r = parseInt(raw, 10);
  if (module === "LIS") {
    if (r >= 39) return 9.0;
    if (r >= 37) return 8.5;
    if (r >= 35) return 8.0;
    if (r >= 32) return 7.5;
    if (r >= 30) return 7.0;
    if (r >= 26) return 6.5;
    if (r >= 23) return 6.0;
    if (r >= 18) return 5.5;
    if (r >= 16) return 5.0;
    if (r >= 13) return 4.5;
    return 4.0;
  } else {
    // Reading
    if (type === "ACADEMIC") {
      if (r >= 39) return 9.0;
      if (r >= 37) return 8.5;
      if (r >= 35) return 8.0;
      if (r >= 33) return 7.5;
      if (r >= 30) return 7.0;
      if (r >= 27) return 6.5;
      if (r >= 23) return 6.0;
      if (r >= 19) return 5.5;
      if (r >= 15) return 5.0;
      if (r >= 13) return 4.5;
      return 4.0;
    } else {
      // General Training
      if (r >= 40) return 9.0;
      if (r >= 39) return 8.5;
      if (r >= 37) return 8.0;
      if (r >= 36) return 7.5;
      if (r >= 34) return 7.0;
      if (r >= 32) return 6.5;
      if (r >= 30) return 6.0;
      if (r >= 27) return 5.5;
      if (r >= 23) return 5.0;
      return 4.5;
    }
  }
}

function getCEFR(score) {
  const s = parseFloat(score);
  if (isNaN(s)) return "-";
  if (s >= 8.5) return "C2";
  if (s >= 7.0) return "C1";
  if (s >= 5.5) return "B2";
  if (s >= 4.0) return "B1";
  return "A2";
}

function calculateOverallBand(listeningBand, readingBand, writingBand, speakingBand) {
  const l = parseFloat(listeningBand) || 0;
  const r = parseFloat(readingBand) || 0;
  const w = parseFloat(writingBand) || 0;
  const s = speakingBand !== null && speakingBand !== undefined && speakingBand !== "" ? parseFloat(speakingBand) : null;

  // If speaking is missing or <= 0, overall cannot be calculated yet
  if (s === null || isNaN(s) || s <= 0 || l <= 0 || r <= 0 || w <= 0) {
    return { overallBand: null, cefrLevel: null };
  }

  const avg = (l + r + w + s) / 4;
  const rounded = (Math.round(avg * 2) / 2).toFixed(1);
  return {
    overallBand: parseFloat(rounded),
    cefrLevel: getCEFR(rounded)
  };
}

module.exports = {
  calculateBand,
  getCEFR,
  calculateOverallBand
};
