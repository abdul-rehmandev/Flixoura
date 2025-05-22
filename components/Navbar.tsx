"use client"

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from "@/components/ui/button"
import { usePathname } from 'next/navigation'

const Navbar = () => {
    const pathname = usePathname()

    return (
        <div className='container flex justify-between items-center border-2 border-black rounded-full'>
            <Link href="/" className="left flex gap-1 justify-center items-center">
                <Image src="/Images/flixoura_logo.png" alt="logo" width={40} height={40} />
                <p className='text-2xl font-bold'>Flixoura</p>
            </Link>
            <div className="right flex gap-4 justify-center items-center text-muted-foreground">
                <Link
                    href="/"
                    className={`transition-colors duration-300 hover:text-black ${pathname === '/' ? 'text-black' : ''}`}
                >
                    Home
                </Link>
                <Link
                    href="/about"
                    className={`transition-colors duration-300 hover:text-black ${pathname === '/about' ? 'text-black' : ''}`}
                >
                    Explore
                </Link>
                <Link
                    href="/contact"
                    className={`transition-colors duration-300 hover:text-black ${pathname === '/contact' ? 'text-black' : ''}`}
                >
                    Contact
                </Link>
                <Button className='cursor-pointer'>Sign In</Button>
            </div>
        </div>
    )
}

export default Navbar