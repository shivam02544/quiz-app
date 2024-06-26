"use client"
import Header from '@/app/components/Header'
import { verifyToken } from '@/helper/jwtToken';
import { useRouter } from 'next/navigation';
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

const page = ({ params }) => {
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const [email, setEmail] = useState("")
    useEffect(() => {
        async function get() {
            const result = await verifyToken(params.resetPassword)
            if (!result.isValid) {
                router.push('/login')
            } else
                setEmail(result.data.data)
        }
        get()

    })
    async function resetPassword(e) {
        setLoading(true)
        e.preventDefault()
        const formData = new FormData(e.target);
        const formObject = Object.fromEntries(formData.entries());
        if (formObject.pass != formObject.cPass) {
            toast.error("Password is not matching");
            setLoading(false)
            return
        }
        const res = await fetch(`/api/resetPassword`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: formObject.pass
            })
        })
        const data = await res.json()
        toast.success(data.message)
        setLoading(false)
        router.push('/login')

    }
    return (
        <div>
            <Header />
            <div className='flex flex-col justify-center items-center h-[85vh]'>
                <h1 className=' m-6 py-1 px-4 rounded-lg font-extrabold text-2xl bg-gradient-to-r from-blue-600 to-blue-300 text-white'>Forget password</h1>
                <form onSubmit={resetPassword} className='flex flex-col gap-4 '>
                    <input className="input input-bordered w-full max-w-xs" type="text" placeholder='New password' name='pass' required />
                    <input className="input input-bordered w-full max-w-xs" type="text" placeholder='Confirm password' name='cPass' required />
                    <button type='submit' className='text-lg btn btn-primary w-full max-w-xs'>
                        {loading ? (
                            <Spinner />
                        ) : (
                            'Reset Password'
                        )}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default page