import React from 'react'
import { SignIn } from "@clerk/nextjs"

const page = () => {
    return (
        <div className='container w-full h-[90vh] flex justify-center items-center'>
            <SignIn />
        </div>
    )
}

export default page