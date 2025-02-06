import mongoose from "mongoose";

const tagSchema = new mongoose.Schema({
    tag: String,
});

const Tag = mongoose.models.Tag || mongoose.model("Tag", tagSchema);
export default Tag; 