import mongoose from "mongoose";
export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.DB_URl, {
      dbName: "quizApp",
      bufferCommands: false,
    });
    console.log("DB connected");
  } catch (error) {
    console.log(error);
  }
};
