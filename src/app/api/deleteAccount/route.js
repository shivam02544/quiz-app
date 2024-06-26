import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/models/userModel";
import TeacherQuiz from "@/models/teacherModel";
import Student from "@/models/student";
import { connectDb } from "@/helper/connectDb";
export const DELETE = async (request) => {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");
  const data = await jwt.decode(token);
  await connectDb();
  await User.findByIdAndDelete(data.id);
  if (data.role == "teacher")
    TeacherQuiz.findOneAndDelete({ teacherId: data.id });
  else Student.findOneAndDelete({ studentId: data.id });

  const response = NextResponse.json(
    { message: "Your account has been deleted" },
    { status: 200 }
  );
  response.cookies.set("token", "");
  return response;
};
