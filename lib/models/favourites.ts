import mongoose from "mongoose";

const favouritesSchema = new mongoose.Schema({
    movieIDs: [{
        type: String,
        required: true
    }],
    userEmail: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Favourites = mongoose.models.Favourites || mongoose.model("Favourites", favouritesSchema);

export default Favourites;