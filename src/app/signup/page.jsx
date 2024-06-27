"use client"
import Header from '@/app/components/Header'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import Spinner from '../components/Spinner'

const Page = () => {
    const [loading, setLoading] = useState(false)
    const [userOtp, setUserOtp] = useState("");
    const [otp, setOtp] = useState("");
    const signup = async (e) => {
        e.preventDefault()
        setLoading(true)
        const formData = new FormData(e.target);
        const formObject = Object.fromEntries(formData.entries());
        let res = await fetch(`/api/sendOtp/${formObject.email}?role=signup`, {
            method: "POST",
        })
        let data = await res.json();
        if (!res.ok) {
            toast.error(data.message)
            setLoading(false)
            return
        }
        // let userOtp = prompt("Enter your otp from your email address")
        setOtp(data.otp)
        document.getElementById('my_modal_1').showModal()
        e.target.reset()
        setLoading(false)
    }
    async function checkOtp() {
        setLoading(true)
        if (userOtp != otp) {
            toast.error("Otp is not valid")
            setLoading(false)
            setUserOtp("")
            document.getElementById('my_modal_1').close()
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
            setUserOtp("")
            document.getElementById('my_modal_1').close()
            return
        }
        document.getElementById('my_modal_1').close()
        setUserOtp("")
        toast.success(data.message)
        setLoading(false)
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
                <button disabled={loading} type='submit' className='text-lg btn btn-primary  w-full max-w-xs text-white'>
                    {
                        loading ? (
                            <Spinner />
                        ) : (
                            'Register'
                        )
                    }

                </button>
            </form>
            <dialog id="my_modal_1" className="modal">
                <div className="modal-box flex flex-col items-center justify-center">
                    <h3 className="font-bold text-lg m-4">Enter your otp from your email address</h3>
                    <div className='flex gap-4'>
                        <input
                            onChange={(e) => setUserOtp(e.target.value)}
                            type="text"
                            placeholder="Type here"
                            className="input input-bordered input-info w-full max-w-xs" />
                        <button disabled={loading} onClick={checkOtp} className='btn btn-primary '>{loading ? <Spinner /> : "Check"}</button>
                    </div>
                </div>
            </dialog>
        </div>
    )
}

export default Page