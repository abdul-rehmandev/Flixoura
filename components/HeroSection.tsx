import React from 'react'
import { ThreeDMarquee } from "@/components/ui/3d-marquee";
import { Button } from "@/components/ui/button"
import Link from 'next/link';

const HeroSection = async () => {
    const res = await fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.TMDB_API_KEY}&language=en-US`);
    const data = await res.json();

    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }

    const results = data.results;
    const images = [...results.map((result: ResultTypes) =>
        result.poster_path ? `https://image.tmdb.org/t/p/w500${result.poster_path}` : '/placeholder-image.jpg'
    ), ...results.map((result: ResultTypes) =>
        result.backdrop_path ? `https://image.tmdb.org/t/p/w500${result.backdrop_path}` : '/placeholder-image.jpg'
    )];

    return (
        <>
            <div className="mx-auto my-2 max-w-8xl rounded-3xl bg-gray-950/5 p-2 ring-1 ring-neutral-700/10 dark:bg-neutral-800">
                <ThreeDMarquee images={images} />
            </div>
            <div className='flex justify-center flex-col items-center mt-2 gap-2 px-4 sm:px-6 md:px-8'>
                <p className='text-justify w-full max-w-[900px] text-sm sm:text-base md:text-lg'><strong>Flixoura</strong> is your ultimate destination to explore detailed information about movies, TV shows, web series, and streaming content. Whether you&apos;re a casual viewer or a binge-watching fanatic, Flixoura helps you find, track, and dive deeper into your favorite entertainment. Browse through cast & crew details, ratings, reviews, trailers, genres, release dates, and more all in one sleek and fast platform.Stay updated with the latest releases, trending titles, and must-watch recommendations curated just for you.</p>
                <div className='flex flex-col sm:flex-row gap-2 w-full sm:w-auto'>
                    <Link href="/explore/All-Categories">
                        <Button className='w-full sm:w-auto cursor-pointer'>Explore Flixoura</Button>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default HeroSection