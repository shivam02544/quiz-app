"use client"
import HeaderAfterLogin from '@/app/components/HeaderAfterLogin'
import { verifyToken } from '@/helper/jwtToken';
import React, { useState } from 'react'
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

const page = () => {
    const [loading, setLoading] = useState(false)
    const [question, setQuestion] = useState("");
    const [option1, setOption1] = useState("");
    const [option2, setOption2] = useState("");
    const [option3, setOption3] = useState("");
    const [option4, setOption4] = useState("");
    const [answer, setAnswer] = useState("");
    const [questions, setQuestions] = useState([]);
    const addQuestion = () => {
        if (!question || !option1 || !option2 || !option3 || !option4 || !answer) {
            toast.error("All fields are required")
            return
        }
        const newQuestion = { question, option1, option2, option3, option4, answer };
        setQuestions([...questions, newQuestion]);
        setQuestion("");
        setOption1("");
        setOption2("");
        setOption3("");
        setOption4("")
        setAnswer("");
    }
    const showAddedQuestion = () => {
        document.getElementById('my_modal_1').showModal()
    }
    const submit = async () => {
        if (questions.length == 0) {
            toast.dismiss()
            toast.error("You must have some questions to submit")
            return
        }
        setLoading(true)
        const token = localStorage.getItem("token");
        let data = await verifyToken(token)
        const res = await fetch("/api/question", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ questions, id: data.data.id })
        })
        if (!res.ok) {
            toast.error("something went wrong")
            setLoading(false)
            return
        }
        data = await res.json()
        setQuestions([])
        toast.success(data.message)
        setLoading(false)

    }
    return (
        <div>
            <HeaderAfterLogin />
            <div className='flex flex-col justify-center items-center h-[80vh]'>
                <h1 className='bg-primary text-white my-4 rounded-lg px-3 py-2 font-extrabold text-2xl'>Add questions for student</h1>
                <div className='flex flex-col gap-4 '>
                    <textarea
                        placeholder="Question"
                        className="textarea textarea-primary textarea-md w-full max-w-xl text-red-600 text-xl border-[4px]"
                        name="question"
                        onChange={(e) => { setQuestion(e.target.value) }}
                        value={question}
                        required
                    ></textarea>
                    <div className='flex gap-4 text-primary'>
                        <input
                            onChange={(e) => { setOption1(e.target.value) }}
                            value={option1}
                            name='option1'
                            type="text"
                            placeholder="option 1"
                            className="input input-bordered input-primary w-full max-w-xs border-[2px]" />

                        <input
                            onChange={(e) => { setOption2(e.target.value) }}
                            value={option2}
                            name='option2'
                            type="text"
                            placeholder="option 2"
                            className="input input-bordered input-primary w-full max-w-xs border-[2px]" />

                    </div>
                    <div className='flex gap-4 text-primary'>
                        <input
                            onChange={(e) => { setOption3(e.target.value) }}
                            value={option3}
                            name='option3'
                            type="text"
                            placeholder="option 3"
                            className="input input-bordered input-primary w-full max-w-xs border-[2px]" />
                        <input
                            onChange={(e) => { setOption4(e.target.value) }}
                            value={option4}
                            name='option4'
                            type="text"
                            placeholder="option 4"
                            className="input input-bordered input-primary w-full max-w-xs border-[2px]" />
                    </div>
                    <div className='flex gap-4'>
                        <input
                            onChange={(e) => { setAnswer(e.target.value) }}
                            value={answer}
                            name='answer'
                            type="text"
                            placeholder="Answer"
                            className="input input-bordered input-primary w-full max-w-xs border-[2px]" />
                        <button onClick={addQuestion} className='btn btn-primary w-64 text-lg'>Add question</button>
                    </div>
                    <div className='flex gap-4'>
                        <button onClick={showAddedQuestion} className='btn btn-primary w-64 text-lg' >Show added question</button>
                        <button onClick={submit} className='btn  w-64 text-lg bg-red-600 text-white' >
                            {loading ? (
                                <Spinner />
                            ) : (
                                'Submit'
                            )}
                        </button>
                    </div>
                </div>
                <dialog id="my_modal_1" className="modal ">
                    <div className="modal-box w-11/12 max-w-2xl">
                        <h3 className="font-bold text-lg">Your Questions!</h3>
                        <div className='flex flex-col justify-center items-center'>
                            {questions.map((question, index) => {
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

export default page