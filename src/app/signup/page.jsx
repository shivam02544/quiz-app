"use client"
import Header from '@/app/components/Header'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { spiral } from 'ldrs';


spiral.register();


const Spinner = () => (
    <l-spiral
        size="20" // Adjust size as needed
        speed="0.9"
        color="#4a00ff" // Set the color to white for better visibility on the button
    />
);

const Page = () => {
    const [loading, setLoading] = useState(false)
    const signup = async (e) => {
        e.preventDefault()
        setLoading(true)
        const formData = new FormData(e.target);
        const formObject = Object.fromEntries(formData.entries());
        let res = await fetch(`/api/sendOtp/${formObject.email}?role=signup`)
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
        res = await fetch(`/api/users/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formObject)
        })
        data = await res.json();
        if (!res.ok) {
            toast.error(data.message)
            setLoading(false)
            return
        }
        toast.success(data.message)
        setLoading(false)
        e.target.reset()
    }
    return (
        <div className='text-primary text-lg'>
            <Header />
            <form onSubmit={(e) => signup(e)} className='flex flex-col justify-center items-center h-[80vh] gap-4'>
                <input className="input input-bordered w-full max-w-xs" type="text" placeholder='Full Name' name='name' required />
                <input className="input input-bordered w-full max-w-xs" type="email" placeholder='Email address' name='email' required />
                <input className="input input-bordered w-full max-w-xs" type="password" placeholder='Password' name='password' required />
                <select className="select select-bordered w-full max-w-xs" name='role' >
                    <option value="student">I am a student</option>
                    <option value="teacher">I am a teacher</option>
                </select>
                <button disabled={loading} type='submit' className='text-lg btn btn-primary w-full max-w-xs'>
                    {loading ? (
                        <Spinner />
                    ) : (
                        `Register`
                    )}
                </button>
            </form>
        </div>
    )
}

export default Page