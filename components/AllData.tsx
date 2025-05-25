import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Card from './Card'

async function getMoviesByGenre(genreId: number) {
    const res = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&language=en-US&with_genres=${genreId}&sort_by=popularity.desc`);
    const data = await res.json();
    if (!res.ok) {
        throw new Error(`Failed to fetch movies for genre ${genreId}`);
    }
    return data.results;
}

const AllData = async () => {
    const trendingRes = await fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.TMDB_API_KEY}&language=en-US`);
    const trendingData = await trendingRes.json();
    if (!trendingRes.ok) {
        throw new Error("Failed to fetch trending data");
    }

    const [actionMovies, comedyMovies, crimeMovies, dramaMovies, horrorMovies, sciFiMovies, warMovies] = await Promise.all([
        getMoviesByGenre(28), // Action
        getMoviesByGenre(35), // Comedy
        getMoviesByGenre(80), // Crime
        getMoviesByGenre(18), // Drama
        getMoviesByGenre(27), // Horror
        getMoviesByGenre(878), // Science Fiction
        getMoviesByGenre(10752), // War
    ]);

    const trendingResults: ResultTypes[] = trendingData.results;

    const renderGenreSection = (title: string, movies: ResultTypes[]) => (
        <div className="mt-10">
            <h2 className='text-3xl font-extrabold'>{title}</h2>
            <Carousel
                opts={{
                    align: "start",
                }}
                className="w-full"
            >
                <CarouselContent>
                    {movies.slice(0, 10).map((result, index) => (
                        <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/6">
                            <div className="p-1">
                                <Card result={result} />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    );

    return (
        <div>
            <div className="trending mt-5">
                <h2 className='text-3xl font-extrabold'>Trending</h2>
                <Carousel
                    opts={{
                        align: "start",
                    }}
                    className="w-full"
                >
                    <CarouselContent>
                        {trendingResults.slice(0, 10).map((result, index) => (
                            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/6">
                                <div className="p-1">
                                    <Card result={result} />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>

            {renderGenreSection('Action Movies', actionMovies)}
            {renderGenreSection('Comedy Movies', comedyMovies)}
            {renderGenreSection('Crime Movies', crimeMovies)}
            {renderGenreSection('Drama Movies', dramaMovies)}
            {renderGenreSection('Horror Movies', horrorMovies)}
            {renderGenreSection('Science Fiction Movies', sciFiMovies)}
            {renderGenreSection('War Movies', warMovies)}
        </div>
    )
}

export default AllData