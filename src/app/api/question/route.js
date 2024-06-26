import { connectDb } from "@/helper/connectDb";
import TeacherQuiz from "@/models/teacherModel";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  const { searchParams } = new URL(request.url);
  const teacherId = searchParams.get("id");
  await connectDb();
  const teacherInfo = await TeacherQuiz.findOne({ teacherId: teacherId });
  if (!teacherInfo) return NextResponse.json([]);
  return NextResponse.json(teacherInfo.questions, {
    status: 200,
  });
};

export const POST = async (request) => {
  await connectDb();
  const body = await request.json();
  let teacherInfo = await TeacherQuiz.findOne({ teacherId: body.id });
  if (!teacherInfo) {
    teacherInfo = await new TeacherQuiz({
      teacherId: body.id,
      questions: [
        {
          questionGeneratedDate: new Date(),
          questions: body.questions,
        },
      ],
    });
  } else {
    teacherInfo.questions.push({
      questionGeneratedDate: new Date(),
      questions: body.questions,
      numberOfQuestions: body.questions.length,
    });
  }
  await teacherInfo.save();
  return NextResponse.json(
    { message: "Question added successfully" },
    { status: 200 }
  );
};

export const DELETE = async (request) => {
  try {
    await connectDb();
    const url = new URL(request.url);
    const teacherId = url.searchParams.get("teacherId");
    const roomId = url.searchParams.get("roomId");

    let teacherInfo = await TeacherQuiz.findOne({ teacherId });

    const roomIndex = teacherInfo.questions.findIndex(
      (q) => q.roomId === roomId
    );

    teacherInfo.questions.splice(roomIndex, 1);

    await teacherInfo.save();

    return NextResponse.json(
      {
        message: "Quiz deleted successfully",
        questions: teacherInfo.questions,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in deleting room:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};
