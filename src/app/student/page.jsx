"use client"
import HeaderAfterLogin from '@/components/HeaderAfterLogin'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const page = () => {
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
                <button className='btn btn-primary text-lg '>Quiz results dashboard</button>
            </div>
        </div>
    )
}

export default page