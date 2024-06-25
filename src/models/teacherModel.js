import mongoose from "mongoose";
import { v6 as uuidv6 } from "uuid";

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true, trim: true },
  option1: { type: String, required: true, trim: true },
  option2: { type: String, required: true, trim: true },
  option3: { type: String, required: true, trim: true },
  option4: { type: String, required: true, trim: true },
  answer: { type: String, required: true, trim: true },
});

const questionDetailSchema = new mongoose.Schema({
  roomId: { type: String, default: uuidv6 },
  questionGeneratedDate: { type: Date, required: true, default: Date.now },
  questions: [questionSchema],
  numberOfQuestions: Number,
});

const teacherSchema = new mongoose.Schema({
  teacherId: { type: String, required: true },
  questions: [questionDetailSchema],
});

const TeacherQuiz =
  mongoose.models.Teacher || mongoose.model("Teacher", teacherSchema);

export default TeacherQuiz;
