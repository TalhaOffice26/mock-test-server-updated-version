const mongoose = require("mongoose");

const candidatePasscodeSchema = new mongoose.Schema({
  code: { type: String, required: true },
  planType: { type: String, enum: ["Free", "Premium"], default: "Free" },
  status: { type: String, enum: ["Unused", "Used"], default: "Unused" },
  mockID: { type: String, default: null }, // Mock used on
  assignedAt: { type: Date, default: Date.now },
  usedAt: { type: Date, default: null }
});

const candidateResultSchema = new mongoose.Schema({
  mockID: { type: String, required: true },
  passcode: { type: String, required: true },
  testDate: { type: Date, default: Date.now },
  testType: { type: String, default: "ACADEMIC" }, // ACADEMIC or GENERAL TRAINING

  // Raw & Band Scores
  listeningRaw: { type: Number, default: 0 },
  listeningBand: { type: Number, default: 0 },
  listeningMistakes: { type: Array, default: [] },

  readingRaw: { type: Number, default: 0 },
  readingBand: { type: Number, default: 0 },
  readingMistakes: { type: Array, default: [] },

  writingBand: { type: Number, default: 0 },
  writingTask1Feedback: { type: String, default: "" },
  writingTask2Feedback: { type: String, default: "" },
  writingInputs: { type: Object, default: {} },

  speakingBand: { type: Number, default: null }, // Manual Entry

  overallBand: { type: Number, default: null },
  cefrLevel: { type: String, default: null },

  teacherRecommendation: {
    type: String,
    default: "Consistent practice on task achievement and grammatical range is advised. Join our mock review sessions for deeper insights."
  },

  createdAt: { type: Date, default: Date.now }
});

const candidateAccountSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, unique: true, trim: true },
    organization: { type: String, default: "UKA Technical" },
    candidateId: { type: String, unique: true, index: true }, // e.g. UKA-7890
    passcodes: [candidatePasscodeSchema],
    results: [candidateResultSchema],
    notes: { type: String, default: "" },
    status: { type: String, default: "Active" }
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.CandidateAccount ||
  mongoose.model("CandidateAccount", candidateAccountSchema);
