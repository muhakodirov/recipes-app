import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    comment: { type: String, required: true },
    likes: {type: Number, default: 0, min: 0},
    likedBy: [String], // Array of user IDs who have liked this comment
    user: {
        id: String,
        firstname: String,
        lastname: String, 
    },
    recipeId: Number,
}, { timestamps: true });

const Comment = mongoose.models.Comment || mongoose.model('Comment', commentSchema);

export default Comment; 