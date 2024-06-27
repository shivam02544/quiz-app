"use client"
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import Spinner from './Spinner';


const HeaderAfterLogin = () => {
    const [loading, setLoading] = useState(false)
    const router = useRouter();
    async function logout() {
        setLoading(true)
        localStorage.removeItem("token");
        const res = await fetch(`/api/logout`, {
            method: "DELETE"
        })
        const data = await res.json();
        toast.success(data.message)
        setLoading(false)
        router.push('/login')

    }
    async function deleteAccount() {
        setLoading(true)
        const token = localStorage.getItem("token");
        const res = await fetch(`/api/deleteAccount?token=${token}`, {
            method: "DELETE"
        })
        if (!res.ok) {
            toast.dismiss()
            toast.error("Something went wrong")
            setLoading(false)
            return
        }
        const data = await res.json();
        toast.success(data.message)
        localStorage.removeItem("token");
        setLoading(false)
        router.push('/login')
    }
    return (
        <nav className='sticky top-0 z-50'>
            <div className="navbar bg-primary text-primary-content flex justify-between px-8">
                <Link href="/"><h1 className='font-extrabold text-3xl'>Quizee Quiz</h1></Link>
                <div className='space-x-2'>
                    <button onClick={() => { router.back() }} className='btn bg-green-600 text-white'>Go Back</button>
                    <div className="dropdown dropdown-end text-primary">
                        <div tabIndex={0} role="button" className="btn">Menu</div>
                        <ul tabIndex={0} className="dropdown-content z-[10] menu p-2 shadow bg-base-100 rounded-box w-52">
                            <button disabled={loading} onClick={logout} className='text-red-600 font-extrabold'><li><a>{loading ? <Spinner /> : 'Logout'}</a></li></button>
                            <button disabled={loading} onClick={deleteAccount} className='text-red-900 font-extrabold'><li><a>{loading ? <Spinner /> : 'Delete this account 🥺'}</a></li></button>
                            <li><a>Adding more so soon</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default HeaderAfterLogin