"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { usePathname } from 'next/navigation'
import { SignedIn, UserButton, SignedOut } from '@clerk/nextjs'
import { Menu, X } from 'lucide-react'

const Navbar = () => {
    const pathname = usePathname()
    const isDetailsPage = pathname?.startsWith('/details');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <>
            {!isDetailsPage &&
                <div className='container mx-auto px-4 py-4'>
                    <div className='flex justify-between items-center'>
                        <Link href="/" className="flex gap-1 justify-center items-center">
                            <Image src="/Images/Flixoura_logo.png" alt="logo" width={40} height={40} />
                            <p className='text-2xl font-bold'>Flixoura</p>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex gap-4 justify-center items-center text-muted-foreground border-2 border-black p-3 rounded-full">
                            <Link
                                href="/"
                                className={`transition-colors duration-300 hover:text-black ${pathname === '/' ? 'text-black' : ''}`}
                            >
                                Home
                            </Link>
                            <Link
                                href="/explore/All-Categories"
                                className={`transition-colors duration-300 hover:text-black ${pathname?.startsWith('/explore') ? 'text-black' : ''}`}
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
                                <Link
                                    href="/my-favourites"
                                    className={`transition-colors duration-300 hover:text-black ${pathname === '/my-favourites' ? 'text-black' : ''}`}
                                >
                                    My Favourites
                                </Link>
                                <UserButton />
                            </SignedIn>
                            <SignedOut>
                                <Link href="/sign-in">
                                    <Button className='cursor-pointer'>Sign In</Button>
                                </Link>
                            </SignedOut>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden p-2"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>

                    {/* Mobile Navigation */}
                    {isMobileMenuOpen && (
                        <div className="md:hidden mt-4 p-4 border-2 border-black rounded-lg bg-white">
                            <div className="flex flex-col gap-4">
                                <Link
                                    href="/"
                                    className={`transition-colors duration-300 hover:text-black ${pathname === '/' ? 'text-black' : ''}`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Home
                                </Link>
                                <Link
                                    href="/explore"
                                    className={`transition-colors duration-300 hover:text-black ${pathname?.startsWith('/explore') ? 'text-black' : ''}`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Explore
                                </Link>
                                <Link
                                    href="/contact"
                                    className={`transition-colors duration-300 hover:text-black ${pathname === '/contact' ? 'text-black' : ''}`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Contact
                                </Link>
                                <div className="flex items-center gap-2">
                                    <SignedIn>
                                        <Link
                                            href="/my-favourites"
                                            className={`transition-colors duration-300 hover:text-black ${pathname === '/my-favourites' ? 'text-black' : ''}`}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            My Favourites
                                        </Link>
                                        <UserButton />
                                    </SignedIn>
                                    <SignedOut>
                                        <Link href="/sign-in">
                                            <Button className='cursor-pointer'>Sign In</Button>
                                        </Link>
                                    </SignedOut>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            }
        </>
    )
}

export default Navbar