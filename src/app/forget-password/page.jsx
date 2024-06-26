"use client"
import Header from '@/app/components/Header'
import React from 'react';
import { getToken } from '@/helper/jwtToken';
import { useRouter } from 'next/navigation';
import { spiral } from 'ldrs';

spiral.register();

const Spinner = () => (
    <l-spiral
        size="20" // Adjust size as needed
        speed="0.9"
        color="#4a00ff" // Set the color to white for better visibility on the button
    ></l-spiral>
);

import React, { useState } from 'react'
import toast from 'react-hot-toast';

const page = () => {
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const [email, setEmail] = useState("");
    async function sendOtp(e) {
        setLoading(true)
        e.preventDefault()
        let res = await fetch(`/api/sendOtp/${email}?role=forget`)
        let data = await res.json();
        if (!res.ok) {
            toast.error(data.message)
            setLoading(false)
            return
        }
        let userOtp = prompt("Enter your otp from your email address")
        if (data.otp != userOtp) {
            toast.error("Otp is not valid")
            setLoading(false)
            return
        }
        const token = await getToken(email)
        setLoading(false)
        router.push(`forget-password/${token}`)
        toast.success("Redirecting to reset password page")





    }
    return (
        <div>
            <Header />
            <div className='flex flex-col justify-center items-center h-[85vh]'>
                <h1 className=' m-6 py-1 px-4 rounded-lg font-extrabold text-2xl bg-gradient-to-r from-blue-600 to-blue-300 text-white'>Reset password</h1>
                <form onSubmit={sendOtp} className='flex flex-col gap-4 '>
                    <input onChange={(e) => { setEmail(e.target.value) }} className="input input-bordered w-full max-w-xs" type="email" placeholder='Email address' name='email' required />
                    <button disabled={loading} type='submit' className='text-lg btn btn-primary w-full max-w-xs'>
                        {loading ? (
                            <Spinner />
                        ) : (
                            'Send otp'
                        )}
                    </button>
                </form>
            </div>
        </div >
    )
}

export default page