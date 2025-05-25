import { CastDetails } from '@/components/CastDetails';
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
    const detailId = await Promise.resolve(params?.id);

    const [movieRes, similarRes] = await Promise.all([
        fetch(`https://api.themoviedb.org/3/movie/${detailId}?api_key=${process.env.TMDB_API_KEY}`),
        fetch(`https://api.themoviedb.org/3/movie/${detailId}/similar?api_key=${process.env.TMDB_API_KEY}`)
    ]);

    const detail: detailTypes = await movieRes.json();
    const similarMovies = await similarRes.json();

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
                    <div className='text-white w-[55%]'>
                        <Link href={`/`} className='border-2 p-3 rounded-full bg-white text-black font-semibold'>
                            Back to Homepage
                        </Link>
                        <h1 className='mt-5 text-9xl'>{detail.original_title}</h1>
                        <small>{detail.overview}</small>
                        <h2 className='mt-2'>{detail.status} - {detail.release_date}</h2>
                        <div className='flex items-center gap-3 mt-5'>
                            {detail.genres.map((genre, index) => (
                                <p className='genre-tag' key={index}>{genre.name}</p>
                            ))}
                        </div>

                        {/* Movie Statistics */}
                        <div className='mt-8 grid grid-cols-2 gap-4'>
                            <div className='bg-white/10 p-4 rounded-lg'>
                                <h3 className='text-xl font-semibold mb-2'>Movie Statistics</h3>
                                <p>Runtime: {detail.runtime} minutes</p>
                                <p>Rating: {detail.vote_average.toFixed(1)}/10</p>
                                {detail.budget > 0 && <p>Budget: ${detail.budget.toLocaleString()}</p>}
                                {detail.revenue > 0 && <p>Revenue: ${detail.revenue.toLocaleString()}</p>}
                            </div>

                            {/* Production Info */}
                            <div className='bg-white/10 p-4 rounded-lg'>
                                <h3 className='text-xl font-semibold mb-2'>Production Info</h3>
                                <p>Original Language: {detail.original_language}</p>
                                {detail.production_companies?.length > 0 && (
                                    <div>
                                        <p>Production Companies:</p>
                                        <ul className='list-disc list-inside'>
                                            {detail.production_companies.map((company, index) => (
                                                <li key={index}>{company.name}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className='w-[40%] text-white'>
                        {detail.tagline}
                        <h2 className='text-3xl'>Cast</h2>
                        <CastDetails movieId={detailId} />
                    </div>
                </div>

                {/* Similar Movies Section */}
                <div className='mt-12 text-white'>
                    <h2 className='text-3xl mb-6'>Similar Movies</h2>
                    <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4'>
                        {similarMovies.results?.slice(0, 6).map((movie: any) => (
                            <Link href={`/details/${movie.id}`} key={movie.id} className='group'>
                                <div className='relative aspect-[2/3] rounded-lg overflow-hidden bg-gray-800'>
                                    <Image
                                        src={movie.poster_path
                                            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                                            : 'https://placehold.co/500x750/242424/666666?text=No+Image'
                                        }
                                        alt={movie.title || 'Movie poster'}
                                        fill
                                        className='object-cover group-hover:scale-105 transition-transform duration-300'
                                    />
                                </div>
                                <h3 className='mt-2 text-sm font-medium'>{movie.title}</h3>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Detail