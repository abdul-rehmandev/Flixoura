"use server"
import Favourites from "@/lib/models/favourites";
import connectDB from "@/lib/mongodb/db";

export async function AddToFavouritesList(movieId: string, userEmail: string) {
    try {
        await connectDB();
        const existingFavorites = await Favourites.findOne({ userEmail });

        if (existingFavorites) {
            if (!existingFavorites.movieIDs.includes(movieId)) {
                existingFavorites.movieIDs.push(movieId);
                await existingFavorites.save();
            }
        } else {
            await Favourites.create({
                userEmail,
                movieIDs: [movieId]
            });
        }

        return { success: true, message: "Movie added to favorites" };
    } catch (error) {
        console.log("Error", error);
        return { success: false, message: "Failed to add movie to favorites" };
    }
}

export async function CheckIfMovieInFavourites(movieId: string, userEmail: string) {
    try {
        await connectDB();
        const existingFavorites = await Favourites.findOne({ userEmail });
        return existingFavorites?.movieIDs.includes(movieId) || false;
    } catch (error) {
        console.log("Error checking favorites:", error);
        return false;
    }
}

export async function RemoveFromFavourites(movieId: string, userEmail: string) {
    try {
        await connectDB();
        const existingFavorites = await Favourites.findOne({ userEmail });

        if (existingFavorites) {
            existingFavorites.movieIDs = existingFavorites.movieIDs.filter((id: string) => id !== movieId);
            await existingFavorites.save();
            return { success: true, message: "Movie removed from favorites" };
        }

        return { success: false, message: "No favorites found" };
    } catch (error) {
        console.log("Error removing from favorites:", error);
        return { success: false, message: "Failed to remove movie from favorites" };
    }
}

export async function RemoveAllFromFavourites(userEmail: string) {
    try {
        await connectDB();
        const existingFavorites = await Favourites.findOne({ userEmail });

        if (existingFavorites) {
            existingFavorites.movieIDs = [];
            await existingFavorites.save();
            return { success: true, message: "All movies removed from favorites" };
        }

        return { success: false, message: "No favorites found" };
    } catch (error) {
        console.log("Error removing all from favorites:", error);
        return { success: false, message: "Failed to remove all movies from favorites" };
    }
}