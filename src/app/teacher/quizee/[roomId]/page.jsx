"use client"
import HeaderAfterLogin from '@/app/components/HeaderAfterLogin'
import Spinner from '@/app/components/Spinner';
import { convertToDateAndFormat } from '@/helper/convertDate';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const Page = ({ params }) => {
    const [results, setResult] = useState([]);
    useEffect(() => {
        async function get() {
            const response = await fetch(`/api/studentData?roomId=${params.roomId}`, {
                method: 'PATCH',
            })
            if (!response.ok) {
                toast.dismiss()
                toast.error("Something went wrong")
                return
            }
            const data = await response.json()
            console.log(data);
            setResult(data)
        }
        get();
    }, [])
    if (!results) {
        return <div>Loading<Spinner /></div>
    }
    return (
        <div>
            <HeaderAfterLogin />
            <div className='flex flex-col items-center'>
                <h1 className='text-gray-400 font-bold text-3xl border-b-2 border-gray-300'>Room: <span className='text-primary'>{params.roomId}</span> PARTICIPANTS</h1>
                {
                    results.length == 0 ? "Kuchh n hai bhai" :
                        results.map((data, index) => {
                            return (
                                <div key={index + 1}>
                                    <div className='border-[1.5px] border-blue-500 rounded-lg shadow-lg p-4 m-6 w-[56rem] '>
                                        <div className='flex justify-between border-b-[1px] border-primary pb-2 '>
                                            <span className='text-gray-400 text-lg'>Student Name: <span className='text-primary font-bold text-xl'>{data.name}</span></span>
                                            <span className='text-gray-400 text-lg'>Student E-mail: <span className='text-primary font-bold text-xl'>{data.email}</span></span>
                                        </div>
                                        {
                                            data.results.map((result, index) => {
                                                return (
                                                    <div key={index + 1} className='border-b-[1px] border-primary my-2 p-2'>
                                                        <div className='flex justify-between'>
                                                            <span className='text-gray-400 text-lg'>Quiz joining time: <span className='text-primary font-bold'>{convertToDateAndFormat(result.quizJoiningTime)}</span></span>
                                                            <span className='text-gray-400 text-lg'>Quiz submission time: <span className='text-primary font-bold'>{convertToDateAndFormat(result.quizSubmissionTime)}</span></span>
                                                        </div>
                                                        <div className='flex justify-between'>
                                                            <span className='text-gray-400 text-lg'>Score: <span className='text-primary font-bold'>{result.score + "/" + result.numberOfQuestions}</span></span>
                                                            <span className='text-gray-400 text-lg'>Time taken: <span className='text-primary font-bold'>{result.totalTimeTaken}</span></span>
                                                        </div>
                                                        {/* <div className='flex flex-col flex-wrap'> */}
                                                        {/* <div className='flex flex-col items-center my-4'> */}
                                                        {/* <h1 className='text-2xl font-bold p-4 text-center'>What is your name?</h1> */}
                                                        {/* <div className='flex gap-8 flex-wrap'> */}
                                                        {/* <button className='bg-gray-200 shadow-sm hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out'>Correct</button> */}
                                                        {/* <button className='bg-gray-200 shadow-sm hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out'>Wrong</button> */}
                                                        {/* </div> */}
                                                        {/* </div> */}
                                                        {/* </div> */}
                                                    </div>
                                                )
                                            })
                                        }

                                    </div>
                                </div>
                            )
                        })
                }
            </div>

        </div>
    )
}

export default Page