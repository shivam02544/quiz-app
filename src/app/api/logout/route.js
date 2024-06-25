import { NextResponse } from "next/server";

export const GET = async () => {
  const response = NextResponse.json(
    { message: "User Logout successfully" },
    { status: 200 }
  );
  response.cookies.set("token", "");
  return response;
};
