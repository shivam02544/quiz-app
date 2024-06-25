"use server";
import jwt from "jsonwebtoken";
export const getToken = async (data) => {
  const token = jwt.sign({ data }, process.env.JWT_SECRET, {
    expiresIn: "5m",
  });
  return token;
};

export const verifyToken = async (token) => {
  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    return { isValid: true, data: decoded };
  } catch (error) {
    console.log("This is the error", error);
    if (error.name === "TokenExpiredError") {
      return { isValid: false, expired: true, message: "Token has expired" };
    } else {
      return { isValid: false, expired: false, message: "Invalid token" };
    }
  }
};
