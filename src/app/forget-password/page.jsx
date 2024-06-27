"use client"
import Header from '@/app/components/Header'
import { getToken } from '@/helper/jwtToken';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import Spinner from '../components/Spinner';

const Page = () => {
    const [userOtp, setUserOtp] = useState("");
    const [otp, setOtp] = useState("");
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
        setOtp(data.otp)
        document.getElementById('my_modal_1').showModal()
        // let userOtp = prompt("Enter your otp from your email address")

    }
    async function checkOtp() {
        if (userOtp != otp) {
            toast.error("Otp is not valid")
            setLoading(false)
            return
        }
        const token = await getToken(email)
        setLoading(false)
        document.getElementById('my_modal_1').close()
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
                <dialog id="my_modal_1" className="modal">
                    <div className="modal-box flex flex-col items-center justify-center">
                        <h3 className="font-bold text-lg m-4">Enter your otp from your email address</h3>
                        <div className='flex gap-4'>
                            <input
                                onChange={(e) => setUserOtp(e.target.value)}
                                type="text"
                                placeholder="Type here"
                                className="input input-bordered input-info w-full max-w-xs" />
                            <button onClick={checkOtp} className='btn btn-primary '>Check</button>
                        </div>
                    </div>
                </dialog>
            </div>
        </div >
    )
}

export default Page