const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => globalThis.fetch ? globalThis.fetch(...args) : fetch(...args));

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

/**
 * Realistic & Fair IELTS Writing Evaluation using Gemini 3.5 Flash
 * Follows official British Council/IDP Band Descriptors without overly harsh or unfair marking.
 */
async function evaluateIeltsWriting({ task1Text, task2Text, mockID }) {
  const prompt = `
You are an experienced, official British Council / IDP IELTS Senior Examiner.
Evaluate the following candidate's IELTS Writing test responses fairly, realistically, and constructively.

CRITICAL INSTRUCTIONS FOR FAIR MARKING:
1. Do NOT mark overly harshly like generic AI checkers that deduct marks for minor flaws. Mark realistically like an authentic human IELTS examiner in a main IELTS exam.
2. If a student communicates their ideas clearly with reasonable structure, vocabulary, and grammar, reward them fairly (e.g. Band 6.0, 6.5, 7.0 etc.).
3. Standard IELTS Weighting: Task 2 contributes 66.6% (2/3) and Task 1 contributes 33.3% (1/3) to the overall Writing Band score. Round the calculated final writing band to the nearest 0.5 (e.g., 6.25 -> 6.5, 6.1 -> 6.0, 5.75 -> 6.0).
4. Provide structured, encouraging, and detailed feedback that the student can easily understand and learn from.

Candidate Submissions:
[TASK 1 RESPONSE]:
${task1Text ? task1Text.trim() : "No submission for Task 1."}

[TASK 2 RESPONSE]:
${task2Text ? task2Text.trim() : "No submission for Task 2."}

Please output your evaluation STRICTLY as a valid JSON object with the following structure (no markdown fences, just pure JSON):
{
  "task1": {
    "band": 6.5,
    "criteria": {
      "task_achievement": 6.5,
      "coherence_cohesion": 6.5,
      "lexical_resource": 6.5,
      "grammatical_range_accuracy": 6.0
    },
    "detailed_feedback": "Detailed paragraph highlighting strengths, overview quality, data reporting, and areas for improvement."
  },
  "task2": {
    "band": 6.5,
    "criteria": {
      "task_response": 6.5,
      "coherence_cohesion": 6.5,
      "lexical_resource": 6.5,
      "grammatical_range_accuracy": 6.5
    },
    "detailed_feedback": "Detailed paragraph analyzing idea development, thesis clarity, essay cohesion, vocabulary choice, and grammar accuracy."
  },
  "finalWritingBand": 6.5,
  "teacherRecommendation": "Personalized 2-3 sentence strategic recommendation advising the candidate on how to raise their writing score by half a band."
}
`;

  const modelsToTry = ["gemini-3.5-flash", "gemini-3.5-flash-lite", "gemini-flash-latest"];
  let lastErr = null;

  for (const model of modelsToTry) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;
      
      const payload = {
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.2,
          responseMimeType: "application/json"
        }
      };

      const res = await (globalThis.fetch || fetch)(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`${model} Error (${res.status}): ${errText}`);
      }

      const data = await res.json();
      const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!rawText) {
        throw new Error(`Empty response from ${model}`);
      }

      const cleaned = rawText.replace(/```json/g, "").replace(/```/g, "").trim();
      const parsed = JSON.parse(cleaned);
      return parsed;
    } catch (err) {
      lastErr = err;
      console.warn(`Model ${model} attempt failed:`, err.message);
    }
  }

  throw lastErr || new Error("All AI evaluation attempts failed.");
}

module.exports = {
  evaluateIeltsWriting
};
