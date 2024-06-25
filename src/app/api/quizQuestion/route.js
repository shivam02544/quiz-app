import { connectDb } from "@/helper/connectDb";
import TeacherQuiz from "@/models/teacherModel";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  const { searchParams } = new URL(request.url);
  const roomId = searchParams.get("roomId");
  await connectDb();
  try {
    const questions = await TeacherQuiz.findOne(
      { "questions.roomId": roomId },
      { "questions.$": 1 }
    );
    if (!questions)
      return NextResponse.json(
        { message: "Invalid room code" },
        { status: 400 }
      );
    return NextResponse.json(questions.questions[0], { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong " },
      { status: 500 }
    );
  }
};
