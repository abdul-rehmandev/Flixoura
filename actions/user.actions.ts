"use server"
import User from "@/lib/models/user.model";
import connectDB from "@/lib/mongodb/db"


export async function createUser(user: UserTypes) {
    try {
        await connectDB();
        const newUser = await User.create(user);
        return JSON.parse(JSON.stringify(newUser));
    } catch (e) {
        console.log("User creation falied", e)
    }
}