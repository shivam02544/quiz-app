"use client"
import HeaderAfterLogin from '@/app/components/HeaderAfterLogin'
import { convertToDateAndFormat } from '@/helper/convertDate';
import { verifyToken } from '@/helper/jwtToken';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { spiral } from 'ldrs';

spiral.register();

const Spinner = () => (
    <l-spiral
        size="20" // Adjust size as needed
        speed="0.9"
        color="#4a00ff" // Set the color to white for better visibility on the button
    ></l-spiral>
);

const Page = () => {
    const [loading, setLoading] = useState(false)
    const [currentQuiz, setCurrentQuiz] = useState([]);
    const [quizzes, setQuizzes] = useState([]);
    useEffect(() => {
        const token = localStorage.getItem("token")
        const get = async () => {
            let data = await verifyToken(token);
            const res = await fetch(`/api/question?id=${data.data.id}`)
            if (!res.ok) {
                toast.dismiss()
                toast.error("Something went wrong")
                return
            }
            data = await res.json();
            setQuizzes(data)

        }
        get();
    }, [])
    async function showContent(index) {
        setCurrentQuiz(quizzes[index].questions);
        document.getElementById('my_modal_1').showModal()
        console.log(currentQuiz);

    }
    async function copyRoomLink(index) {
        setLoading(true);
        try {
            let roomId = quizzes[index].roomId;
            await navigator.clipboard.writeText(roomId);
            setLoading(false);
            toast.success(`Coped room code: ${roomId}`)

        } catch (err) {
            toast.error("Failed to copy")
            setLoading(false);
            console.error('Failed to copy: ', err);
        }
    }

    async function deleteQuiz(index) {
        const token = localStorage.getItem("token")
        let data = await verifyToken(token);
        const res = await fetch(`/api/question?teacherId=${data.data.id}&roomId=${quizzes[index].roomId}`, {
            method: "DELETE"
        })
        if (!res.ok) {
            toast.dismiss()
            toast.error("Something went wrong")
            return
        }
        data = await res.json();
        setQuizzes(data.questions);
        toast.success(data.message)

    }
    return (
        <div>
            <HeaderAfterLogin />
            <div className='flex flex-wrap justify-center'>
                {quizzes.length == 0 ? "Kuch n hai bhai" :
                    quizzes.map((quiz, index) => {
                        return (
                            <div key={quiz._id} className='flex flex-col justify-center border-primary border-[3px] m-4 p-2 rounded-md w-[30rem] gap-2 bg-blue-100 shadow-md'>
                                <span className='text-md'>Quiz creation date: <span className='font-bold text-blue-700'>{convertToDateAndFormat(quiz.questionGeneratedDate)}</span> </span>
                                <span className='text-md'>Room code: <span className='font-bold text-blue-700'>{quiz.roomId} </span></span>
                                <div className='flex gap-12 px-6'>
                                    <button onClick={() => showContent(index)} className='btn btn-primary'>Show quiz content</button>
                                    <button className='btn btn-primary'>Edit quiz content</button>
                                </div>
                                <div className='flex gap-6 px-6'>
                                    <button onClick={() => deleteQuiz(index)} className='btn text-white  bg-red-600'>Delete quiz</button>
                                    <button onClick={() => copyRoomLink(index)} className='btn btn-primary'>
                                        {loading ? (
                                            <Spinner />
                                        ) : (
                                            'Copy room link'
                                        )}</button>
                                </div>
                            </div>
                        )
                    })
                }
                <dialog id="my_modal_1" className="modal ">
                    <div className="modal-box w-11/12 max-w-2xl">
                        <h3 className="font-bold text-lg">Your Questions!</h3>
                        <div className='flex flex-col justify-center items-center'>
                            {currentQuiz.map((question, index) => {
                                return (
                                    <div key={question._id} className='flex flex-col justify-center border-primary border-[3px] m-4 p-4 rounded-md w-[30rem] gap-2 bg-blue-100 shadow-md'>
                                        <span className='text-md'>Question{index + 1}:   <span className='font-extrabold text-red-700 text-2xl'> {question.question}</span> </span>
                                        <span className='text-md'>Option 1: <span className='font-bold text-blue-700'> {question.option1}</span> </span>
                                        <span className='text-md'>Option 2: <span className='font-bold text-blue-700'> {question.option2}</span> </span>
                                        <span className='text-md'>Option 3: <span className='font-bold text-blue-700'> {question.option3}</span> </span>
                                        <span className='text-md'>Option 4: <span className='font-bold text-blue-700'> {question.option4}</span> </span>
                                        <span className='text-md'>Answer: <span className='font-bold text-blue-700'>{question.answer}</span> </span>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="modal-action">
                            <form method="dialog">
                                <button className="btn">Close</button>
                            </form>
                        </div>
                    </div>
                </dialog>
            </div>
        </div>
    )
}

export default Page