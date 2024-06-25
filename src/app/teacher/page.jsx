import HeaderAfterLogin from '@/components/HeaderAfterLogin'
import Link from 'next/link'
import React from 'react'

const page = () => {
    return (
        <div>
            <HeaderAfterLogin />
            <div className='flex justify-center items-center h-[85vh] gap-4'>
                <Link href="/teacher/createQuiz"><button className='btn btn-primary text-xl '>Create Quiz</button></Link>
                <Link href="/teacher/quizee"><button className='btn btn-primary text-xl '>All Quizzes</button></Link>

            </div>
        </div>
    )
}

export default page