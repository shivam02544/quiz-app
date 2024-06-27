import { connectDb } from "@/helper/connectDb";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};
export const POST = async (request, { params }) => {
  const { searchParams } = new URL(request.url);
  const role = searchParams.get("role");
  try {
    const otp = generateOtp();
    const email = params.email;
    await connectDb();
    let user = await User.findOne({ email: email });
    if (role == "signup") {
      if (user) {
        return NextResponse.json(
          { message: "Email is already registered..." },
          { status: 400 }
        );
      }
    } else {
      if (!user) {
        return NextResponse.json(
          { message: "Email is not registered" },
          { status: 400 }
        );
      }
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "anteshkumar114@gmail.com",
        pass: "twmyfauxoxowfnjo",
      },
    });
    const mailOptions = {
      from: "anteshkumar114@gmail.com",
      to: email,
      subject: "Verification OTP",
      text: `Your verification OTP is: ${otp}`,
      html: `<p>Your verification OTP is: <strong>${otp}</strong></p>`,
    };
    await transporter.sendMail(mailOptions);
    return NextResponse.json({
      message: "Otp Sent on your email address",
      otp,
    });
  } catch (error) {
    console.error("Error sending OTP:", error);
    return NextResponse.json(
      {
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
};
