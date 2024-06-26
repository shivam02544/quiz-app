"use client"
import Header from '@/app/components/Header'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
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
const page = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const login = async (e) => {
        setLoading(true)
        e.preventDefault()
        const formData = new FormData(e.target);
        const formObject = Object.fromEntries(formData.entries());
        const res = await fetch(`/api/users?email=${formObject.email}&password=${formObject.password}`)
        const data = await res.json();
        if (!res.ok) {
            toast.dismiss()
            toast.error(data.message)
            setLoading(false)
            return
        }
        localStorage.setItem("token", data.token)
        toast.dismiss()
        setLoading(false)
        toast.success(data.message)
        if (data.role == "student") {
            router.push("/student")
            setLoading(false)
        }
        else router.push("/teacher")
        setLoading(false)
        e.target.reset()

    }
    return (
        <div className='text-primary'>
            <Header />
            <div className='flex flex-col justify-center items-center h-[85vh]'>

                <form onSubmit={(e) => login(e)} className='flex flex-col justify-center items-center  gap-4'>
                    <input className="input input-bordered w-full max-w-xs" type="email" placeholder='Email address' name='email' required />
                    <input className="input input-bordered w-full max-w-xs" type="password" placeholder='Password' name='password' required />
                    <button disabled={loading} type='submit' className='text-lg btn btn-primary w-full max-w-xs'>
                        {loading ? (
                            <Spinner />
                        ) : (
                            'login'
                        )}
                    </button>
                    <Link href="/forget-password"><p className='text-primary'>Forget password?</p></Link>
                </form>

            </div>
        </div>
    )
}

export default page