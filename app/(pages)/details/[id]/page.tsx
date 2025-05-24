import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

const Detail = async (props: PageProps) => {
    const params = await props.params;
    // Ensure params is properly awaited
    const detailId = await Promise.resolve(params?.id);

    const res = await fetch(`https://api.themoviedb.org/3/movie/${detailId}?api_key=${process.env.TMDB_API_KEY}`);

    const detail: detailTypes = await res.json();

    const backropImage = detail.backdrop_path
        ? `https://image.tmdb.org/t/p/original${detail.backdrop_path}`
        : `https://image.tmdb.org/t/p/original${detail.poster_path}`;

    return (
        <div className='relative w-full min-h-screen'>
            <div className='absolute inset-0 w-full h-full'>
                <Image
                    src={backropImage}
                    alt={detail.original_title}
                    fill
                    className='object-cover'
                    sizes="100vw"
                    quality={100}
                    priority
                />
                {/* Overlay gradient */}
                <div className='absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/40' />
            </div>

            {/* Content Container */}
            <div className='relative z-10 mx-auto px-4 py-8'>
                <div className='flex justify-between items-start'>
                    <div className='text-white w-[60%]'>
                        <Link href={`/`} className='border-2 p-3 rounded-full bg-white text-black font-semibold'>
                            Back to Homepage
                        </Link>
                        <h1 className='mt-5 text-9xl'>{detail.original_title}</h1>
                        <h2 className='mt-2'>{detail.status} - {detail.release_date}</h2>
                    </div>
                    <div className='w-[40%] text-white'>{detail.tagline}</div>
                </div>
            </div>
        </div>
    )
}

export default Detail