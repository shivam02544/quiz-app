import { connectDb } from "@/helper/connectDb";
import Student from "@/models/student";
import { NextResponse } from "next/server";
export const GET = async (request) => {
  const { searchParams } = await new URL(request.url);
  const studentId = await searchParams.get("id");
  await connectDb();
  const studentInfo = await Student.findOne({ studentId: studentId });
  if (!studentInfo) return NextResponse.json({});
  return NextResponse.json(studentInfo.results, {
    status: 200,
  });
};

export const POST = async (request) => {
  const body = await request.json();
  await connectDb();
  let studentInfo = await Student.findOne({ studentId: body.studentId });
  if (!studentInfo) {
    studentInfo = await new Student({
      studentId: body.studentId,
      results: [
        {
          roomId: body.roomId,
          quizJoiningTime: body.quizJoiningTime,
          quizSubmissionTime: body.quizSubmissionTime,
          totalTimeTaken: body.totalTimeTaken,
          score: body.score,
          numberOfQuestions: body.numberOfQuestions,
          quizSummary: body.quizSummary,
        },
      ],
    });
  } else {
    studentInfo.results.push({
      roomId: body.roomId,
      quizJoiningTime: body.quizJoiningTime,
      quizSubmissionTime: body.quizSubmissionTime,
      totalTimeTaken: body.totalTimeTaken,
      score: body.score,
      numberOfQuestions: body.numberOfQuestions,
      quizSummary: body.quizSummary,
    });
  }
  await studentInfo.save();

  return NextResponse.json(
    { message: "See your Score card at the last position on score dashboard " },
    {
      status: 200,
    }
  );
};
