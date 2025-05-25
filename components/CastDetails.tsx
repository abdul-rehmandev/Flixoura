import * as React from "react"
import Image from "next/image"
import { CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

interface CastMember {
    id: number;
    name: string;
    character: string;
    profile_path: string;
}

interface CastDetailsProps {
    movieId: string;
}

export async function CastDetails({ movieId }: CastDetailsProps) {
    const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${process.env.TMDB_API_KEY}`
    );
    const data = await res.json();
    const cast = data.cast.slice(0, 10);

    return (
        <Carousel
            opts={{
                align: "start",
            }}
            className="w-[90%]"
        >
            <CarouselContent>
                {cast.map((member: CastMember, index: number) => (
                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                        <div className="p-1">
                            <CardContent className="flex flex-col items-center p-4">
                                <div className="relative w-32 h-32 mb-2">
                                    <Image
                                        src={member.profile_path
                                            ? `https://image.tmdb.org/t/p/w185${member.profile_path}`
                                            : '/placeholder-image.jpg'
                                        }
                                        alt={member.name}
                                        fill
                                        className="rounded-full object-cover"
                                    />
                                </div>
                                <h3 className="font-semibold text-center">{member.name}</h3>
                                <small className='genre-tag'>{member.character}</small>
                            </CardContent>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}
