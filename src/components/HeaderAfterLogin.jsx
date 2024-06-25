"use client"
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React from 'react'
import toast from 'react-hot-toast';

const HeaderAfterLogin = () => {
    const router = useRouter();
    async function logout() {
        localStorage.removeItem("token");
        const res = await fetch(`/api/logout`)
        const data = await res.json();
        toast.success(data.message)
        router.push('/login')
    }
    return (
        <nav>
            <div className="navbar bg-primary text-primary-content flex justify-between px-8">
                <Link href="/"><h1 className='font-extrabold text-3xl'>Quizee Quiz</h1></Link>
                <div className='space-x-2'>
                    <button onClick={() => { router.back() }} className='btn bg-green-600 text-white'>Go Back</button>
                    <div className="dropdown dropdown-end text-primary">
                        <div tabIndex={0} role="button" className="btn">Menu</div>
                        <ul tabIndex={0} className="dropdown-content z-[10] menu p-2 shadow bg-base-100 rounded-box w-52">
                            <button onClick={logout} className='text-red-600 font-extrabold'><li><a>Logout</a></li></button>
                            <li><a>Adding more so soon</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default HeaderAfterLogin