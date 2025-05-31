import React from 'react'
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from 'next/navigation'
import Favourites from '@/lib/models/favourites'
import connectDB from '@/lib/mongodb/db'
import Card from '@/components/Card'
import RemoveAllFavourites from '@/components/RemoveAllFavourites'

const MyFavourites = async () => {
    const user = await currentUser();

    if (!user) {
        redirect('/sign-in')
    }

    await connectDB()
    const userFavorites = await Favourites.findOne({ userEmail: user.emailAddresses[0].emailAddress })

    // If no favorites exist, return early
    if (!userFavorites || !userFavorites.movieIDs || userFavorites.movieIDs.length === 0) {
        return (
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold mb-4">My Favorites</h1>
                <p>You haven't added any movies to your favorites yet.</p>
            </div>
        )
    }

    // Fetch movie details for each favorite movie ID
    const favoriteMovies = await Promise.all(
        userFavorites.movieIDs.map(async (movieId: string) => {
            const res = await fetch(
                `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.TMDB_API_KEY}`
            )
            return res.json()
        })
    )

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-4 flex justify-between">
                My Favorites
                <RemoveAllFavourites userEmail={user.emailAddresses[0].emailAddress} />
            </h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {favoriteMovies.map((movie) => (
                    <Card key={movie.id} result={movie} />
                ))}
            </div>
        </div>
    )
}

export default MyFavourites