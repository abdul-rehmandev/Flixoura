"use client";
import React from 'react'
import { ThreeDMarquee } from "@/components/ui/3d-marquee";
import { Button } from "@/components/ui/button"

const HeroSection = () => {

    const images = [
        "https://assets.aceternity.com/cloudinary_bkp/3d-card.png",
        "https://assets.aceternity.com/animated-modal.png",
        "https://assets.aceternity.com/animated-testimonials.webp",
        "https://assets.aceternity.com/cloudinary_bkp/Tooltip_luwy44.png",
        "https://assets.aceternity.com/github-globe.png",
        "https://assets.aceternity.com/glare-card.png",
        "https://assets.aceternity.com/layout-grid.png",
        "https://assets.aceternity.com/flip-text.png",
        "https://assets.aceternity.com/hero-highlight.png",
        "https://assets.aceternity.com/carousel.webp",
        "https://assets.aceternity.com/placeholders-and-vanish-input.png",
        "https://assets.aceternity.com/shooting-stars-and-stars-background.png",
        "https://assets.aceternity.com/signup-form.png",
        "https://assets.aceternity.com/cloudinary_bkp/stars_sxle3d.png",
        "https://assets.aceternity.com/spotlight-new.webp",
        "https://assets.aceternity.com/cloudinary_bkp/Spotlight_ar5jpr.png",
        "https://assets.aceternity.com/cloudinary_bkp/Parallax_Scroll_pzlatw_anfkh7.png",
        "https://assets.aceternity.com/tabs.png",
        "https://assets.aceternity.com/cloudinary_bkp/Tracing_Beam_npujte.png",
        "https://assets.aceternity.com/cloudinary_bkp/typewriter-effect.png",
        "https://assets.aceternity.com/glowing-effect.webp",
        "https://assets.aceternity.com/hover-border-gradient.png",
        "https://assets.aceternity.com/cloudinary_bkp/Infinite_Moving_Cards_evhzur.png",
        "https://assets.aceternity.com/cloudinary_bkp/Lamp_hlq3ln.png",
        "https://assets.aceternity.com/macbook-scroll.png",
        "https://assets.aceternity.com/cloudinary_bkp/Meteors_fye3ys.png",
        "https://assets.aceternity.com/cloudinary_bkp/Moving_Border_yn78lv.png",
        "https://assets.aceternity.com/multi-step-loader.png",
        "https://assets.aceternity.com/vortex.png",
        "https://assets.aceternity.com/wobble-card.png",
        "https://assets.aceternity.com/world-map.webp",
    ];

    return (
        <>
            <div className="mx-auto my-2 max-w-8xl rounded-3xl bg-gray-950/5 p-2 ring-1 ring-neutral-700/10 dark:bg-neutral-800">
                <ThreeDMarquee images={images} />
            </div>
            <div className='flex justify-center flex-col items-center mt-2 gap-2'>
                <p className='text-center w-[900px]'><strong>Flixoura</strong> is your ultimate destination to explore detailed information about movies, TV shows, web series, and streaming content. Whether you're a casual viewer or a binge-watching fanatic, Flixoura helps you find, track, and dive deeper into your favorite entertainment. Browse through cast & crew details, ratings, reviews, trailers, genres, release dates, and more all in one sleek and fast platform.Stay updated with the latest releases, trending titles, and must-watch recommendations curated just for you.</p>
                <div className='flex gap-2'>
                    <Button className='w-auto cursor-pointer' variant="outline">Search your favourite movie</Button>
                    <Button className='w-auto cursor-pointer'>Explore Flixoura</Button>
                </div>
            </div>
        </>
    )
}

export default HeroSection