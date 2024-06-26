import Link from 'next/link'
import React from 'react'

const Header = () => {
    return (
        <nav className='sticky top-0 z-50'>
            <div className="navbar bg-primary text-primary-content flex justify-between px-8">
                <Link href="/"><h1 className='font-extrabold text-3xl'>Quizee Quiz</h1></Link>
                <div className='space-x-4'>
                    <Link href="/login"><button className='btn font-extrabold '>Login</button></Link>
                    <Link href='/signup'><button className='btn'>Signup</button></Link>
                </div>
            </div>
        </nav>
    )
}

export default Header