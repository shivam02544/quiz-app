"use client"
import HeaderAfterLogin from '@/app/components/HeaderAfterLogin'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const Page = () => {
    const router = useRouter();
    const [roomId, setRoomId] = useState("");
    function sendToRoom() {
        router.push(`/student/${roomId}`)
    }
    return (
        <div>
            <HeaderAfterLogin />
            <div className='flex flex-col h-[85vh] gap-4 justify-center items-center'>
                <div className=' flex gap-4'>
                    <input onChange={(e) => setRoomId(e.target.value)} type="text" placeholder="Room Code" className="input w-full max-w-xs shadow-md" />
                    <button onClick={sendToRoom} className='btn btn-primary'>Join Room</button>
                </div>
                <Link href="/quizeeResultDashboard">
                    <button className='btn btn-primary text-lg '>Quiz results dashboard</button>
                </Link>
            </div>
        </div>
    )
}

export default Page