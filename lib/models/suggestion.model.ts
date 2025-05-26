import mongoose from "mongoose";

const suggestionSchema = new mongoose.Schema({
    suggestionMessage: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Suggestion = mongoose.models.Suggestion || mongoose.model("Suggestion", suggestionSchema);

export default Suggestion;