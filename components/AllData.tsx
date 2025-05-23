import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Card from './Card'


const AllData = async () => {

    const res = await fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.TMDB_API_KEY}&language=en-US`);

    const data = await res.json();
    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }

    const results: ResultTypes[] = data.results;

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
                        {results.slice(0, 10).map((result, index) => (
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
        </div>
    )
}

export default AllData