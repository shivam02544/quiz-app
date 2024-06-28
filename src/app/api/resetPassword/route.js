import User from "@/models/userModel";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export const PUT = async (request) => {
  try {
    const body = await request.json();
    const user = await User.findOne({ email: body.email });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(body.password, salt);
    user.password = hashedPassword;
    user.save();
    return NextResponse.json(
      {
        message: "Password updated successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
};
