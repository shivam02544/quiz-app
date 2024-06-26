import mongoose from "mongoose";
const Schema = mongoose.Schema;

const QuizSummarySchema = new Schema(
  {
    option: { type: String, required: true },
    isCorrect: { type: Boolean, required: true },
    answer: { type: String, required: true },
  },
  { _id: false }
);

const ResultSchema = new Schema(
  {
    roomId: { type: String, required: true },
    quizJoiningTime: { type: Date, required: true },
    quizSubmissionTime: { type: Date, required: true },
    totalTimeTaken: { type: String, required: true }, // in milliseconds
    score: { type: Number, required: true },
    numberOfQuestions: { type: Number, required: true },
    quizSummary: [QuizSummarySchema],
  },
  { _id: false }
);

const StudentSchema = new Schema({
  studentId: { type: String, required: true, unique: true },
  results: [ResultSchema],
});

const Student =
  mongoose.models.Student || mongoose.model("Student", StudentSchema);

export default Student;
