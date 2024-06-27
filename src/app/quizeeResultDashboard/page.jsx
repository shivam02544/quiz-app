"use client"
import HeaderAfterLogin from "@/app/components/HeaderAfterLogin";
import PieChartComponent from "@/app/components/PieChartComponent";
import { convertToDateAndFormat } from "@/helper/convertDate";

import { verifyToken } from "@/helper/jwtToken";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

const Page = () => {
  const [results, setResults] = useState([]);
  const router = useRouter()
  const bottomRef = useRef(null);
  useEffect(() => {
    async function get() {
      const token = localStorage.getItem("token");
      const student = await verifyToken(token)
      const res = await fetch(`/api/studentData?id=${student.data.id}`);
      if (!res.ok) {
        toast.dismiss()
        toast.error("Something went wrong")
        router.back()
        return
      }
      const data = await res.json();
      setResults(data)
    }
    get()
    bottomRef.current.scrollIntoView({ behavior: 'smooth' });
  }, []);
  return (

    <div>
      <HeaderAfterLogin />
      <div className="flex flex-wrap justify-center ">
        {
          results.map((result, index) => {
            return (
              <div key={index + 1} className="flex flex-col text-lg m-6 p-4 items-center rounded-xl shadow-xl bg-blue-100 border-blue-400 border-2 ">
                <h2 className="font-extrabold text-2xl mb-2">Quiz Result</h2>
                <span className="text-gray-500">Room code: <span className="text-primary font-bold text-xl text-wrap">{result.roomId}</span></span>
                <span className="text-gray-500">Quiz joined in: <span className="text-primary  text-lg">{convertToDateAndFormat(result.quizJoiningTime)}</span></span>
                <span className="text-gray-500">Quiz submission in: <span className="text-primary  text-lg">{convertToDateAndFormat(result.quizSubmissionTime)}</span></span>
                <span className="text-gray-500">Total time taken: <span className="text-primary  text-lg"> {result.totalTimeTaken}</span></span>
                <span className="text-gray-500">Quiz score: <span className="text-primary  text-xl font-extrabold"> {result.score}/{result.numberOfQuestions} </span></span>
                <PieChartComponent wrong={result.numberOfQuestions - result.score} correct={result.score} />
              </div>
            )

          })
        }
      </div>
      <span ref={bottomRef} ></span>
    </div>
  );
};

export default Page;
