import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    userId: { type: String, required: true, unique: true },
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User; 