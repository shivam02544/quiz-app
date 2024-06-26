"use client"
import HeaderAfterLogin from '@/components/HeaderAfterLogin'
import { getTimeInterval } from '@/helper/getTimeInterval'
import { verifyToken } from '@/helper/jwtToken'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { spiral } from 'ldrs';

spiral.register();

const Spinner = () => (
    <l-spiral
        size="20" // Adjust size as needed
        speed="0.9"
        color="#4a00ff" // Set the color to white for better visibility on the button
    ></l-spiral>
);

const page = ({ params }) => {
    const router = useRouter()
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState()
    const [questionIndex, setQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [answered, setAnswered] = useState(false)
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [submit, setSubmit] = useState(false)
    const [quizStartTime, setQuizStartTime] = useState("");
    const [answerSummary, setAnswerSummary] = useState([]);
    const [loading, setLoading] = useState(false);


    const handleAnswerOptionClick = (answerOption) => {
        setSelectedAnswer(answerOption);
        setAnswered(true);

        if (answerOption == currentQuestion.answer) {
            setAnswerSummary([...answerSummary, { option: answerOption, isCorrect: true, answer: currentQuestion.answer }])
            setScore(score + 1);

        }
        else {
            setAnswerSummary([...answerSummary, { option: answerOption, isCorrect: false, answer: currentQuestion.answer }])
        }
    };
    const handleNextQuestion = () => {
        setAnswered(false);
        setSelectedAnswer(null);
        let nextIndex = questionIndex + 1;
        if (nextIndex < questions.questions.length) {
            setQuestionIndex(nextIndex);
            setCurrentQuestion(questions.questions[nextIndex]);
            if (nextIndex == questions.questions.length - 1)
                setSubmit(true)
        }

    };
    async function handleSubmit() {
        setLoading(true);
        const quizSubmissionTime = new Date();
        const token = localStorage.getItem("token");
        const student = await verifyToken(token)
        const totalTimeTaken = getTimeInterval(quizStartTime, new Date());
        const numberOfQuestions = questions.questions.length
        const res = await fetch(`/api/studentData`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                studentId: student.data.id,
                roomId: questions.roomId,
                quizJoiningTime: quizStartTime,
                quizSubmissionTime: quizSubmissionTime,
                totalTimeTaken: totalTimeTaken,
                score: score,
                numberOfQuestions: numberOfQuestions,
                quizSummary: answerSummary,
            })
        })
        if (!res.ok) {
            toast.dismiss()
            toast.error("Something went wrong, try again later")
            setLoading(false)
            return
        }
        const data = await res.json()
        toast.dismiss()
        toast.success(data.message)
        setLoading(false)
        router.push("/quizeeResultDashboard")
    }

    useEffect(() => {
        console.log("Use Effect called");
        async function get() {
            const res = await fetch(`/api/quizQuestion?roomId=${params.roomId}`)
            const data = await res.json();
            if (!res.ok) {
                toast.dismiss()
                toast.error(data.message)
                router.push("/student")
                return
            }
            setQuestions(data)
            setCurrentQuestion(data.questions[0])
            if (data.questions.length == 1) setSubmit(true)
            setQuizStartTime(new Date())
        }
        get();
    }, [])


    if (!currentQuestion) {
        return <div>Loading...</div>;
    }


    return (
        <div>
            <HeaderAfterLogin />
            <div className='flex flex-col justify-center items-center h-[80vh] px-4 md:px-0'>
                <div className='border-blue-300 border-[1px] rounded-xl w-full md:w-[46rem] shadow-lg'>
                    <div className='flex flex-col md:flex-row justify-between items-center border-blue-300 border-b-[1px] px-4 py-2'>
                        <span className='text-lg text-gray-600'>Room Code: <span className='text-xl font-bold text-primary'>{questions.roomId}</span></span>
                        <div className='flex gap-4 items-center mt-2 md:mt-0'>
                            <span>{questionIndex + 1} of {questions.questions.length}</span>
                            <button className='btn cursor-none'>Score: {score}</button>
                        </div>
                    </div>
                    <div className='flex flex-col items-center justify-center mb-4 px-4'>
                        <h1 className='text-2xl font-bold p-4 text-center'>{currentQuestion.question}</h1>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 w-full'>
                            {
                                [
                                    currentQuestion.option1,
                                    currentQuestion.option2,
                                    currentQuestion.option3,
                                    currentQuestion.option4,
                                ].map((option, index) => {
                                    return (
                                        <button key={index} className={`bg-gray-200 shadow-sm hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out
                                            ${answered ?
                                                selectedAnswer == currentQuestion.answer ?
                                                    selectedAnswer == option ?
                                                        'border-2 border-green-600 cursor-not-allowed' :
                                                        'opacity-50 cursor-not-allowed' :
                                                    selectedAnswer == option ?
                                                        'border-2 border-red-600 cursor-not-allowed' :
                                                        option == currentQuestion.answer ?
                                                            'border-2 border-green-600 cursor-not-allowed' :
                                                            'opacity-50 cursor-not-allowed'
                                                :
                                                ''
                                            }`}
                                            onClick={() => handleAnswerOptionClick(option)}
                                            disabled={answered}
                                        >
                                            {option}
                                        </button>
                                    )
                                })
                            }
                        </div>
                        {
                            answered &&
                            (
                                submit ?
                                    <button disabled={loading} onClick={handleSubmit} className='btn bg-green-600 mt-4 shadow-lg text-white'>
                                        {loading ? (
                                            <Spinner />
                                        ) : (
                                            'Submit'
                                        )}</button>
                                    :
                                    <button onClick={handleNextQuestion} className='btn btn-primary mt-4 shadow-lg'>Next -{'>'}</button>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page;
