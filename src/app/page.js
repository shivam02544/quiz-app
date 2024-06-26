import Header from "@/components/Header";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <Header />
      <div className="flex flex-col items-center justify-center h-[85vh] ">
        <h1 className="font-extrabold text-3xl text-gray-600">
          Welcome to our{" "}
          <span className="text-7xl bg-gradient-to-tr from-blue-600 via-blue-500 to-blue-400 bg-clip-text text-transparent">
            Q
          </span>
          uizee{" "}
          <span className="text-7xl bg-gradient-to-tr from-blue-600 via-blue-500 to-blue-400 bg-clip-text text-transparent">
            Q
          </span>
          uiz application.
        </h1>
        <p className=" text-gray-600 max-w-4xl m-4 text-center">
          " Teachers create quizzes with multiple-choice questions, generating
          unique links and room codes for student access. They monitor student
          participation and view real-time results post-quiz. Students join
          quizzes using room codes, select answers, and instantly receive
          feedback."
        </p>
        <div className="flex gap-8 m-4">
          <Link href="/login">
            <button className="btn text-xl shadow-2xl text-white bg-gradient-to-tr from-blue-600 via-blue-500 to-blue-400">
              Login
            </button>
          </Link>
          <Link href="/signup">
            <button className="btn text-xl shadow-2xl text-white bg-gradient-to-tr from-blue-600 via-blue-500 to-blue-400">
              Register
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
