"use client"
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from "@/components/ui/button"
import { usePathname } from 'next/navigation'
import { SignedIn, UserButton, SignedOut } from '@clerk/nextjs'

const Navbar = () => {
    const pathname = usePathname()

    return (
        <div className='container flex justify-between items-center'>
            <Link href="/" className="left flex gap-1 justify-center items-center">
                <Image src="/Images/Flixoura_logo.png" alt="logo" width={40} height={40} />
                <p className='text-2xl font-bold'>Flixoura</p>
            </Link>
            <div className="right flex gap-4 justify-center items-center text-muted-foreground border-2 border-black p-3 rounded-full">
                <Link
                    href="/"
                    className={`transition-colors duration-300 hover:text-black ${pathname === '/' ? 'text-black' : ''}`}
                >
                    Home
                </Link>
                <Link
                    href="/explore"
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
                <SignedIn>
                    <UserButton />
                </SignedIn>
                <SignedOut>
                    <Link href="/sign-in">
                        <Button className='cursor-pointer'>Sign In</Button>
                    </Link>
                </SignedOut>
            </div>
        </div>
    )
}

export default Navbar