"use server"
import Contact from "@/lib/models/contact.model"
import Suggestion from "@/lib/models/suggestion.model";
import connectDB from "@/lib/mongodb/db"

export async function contactUs(contactDetails: contactDetails) {
    try {
        await connectDB();
        const newQuery = await Contact.create(contactDetails);
        return JSON.parse(JSON.stringify(newQuery));
    } catch (error) {
        console.log("User creation falied", error)
    }
}

export async function suggestion(suggestionMessage: suggestionMessage) {
    try {
        await connectDB();
        const newSuggestion = await Suggestion.create(suggestionMessage);
        return JSON.parse(JSON.stringify(newSuggestion));
    } catch (error) {
        console.log("User creation falied", error)
    }
}