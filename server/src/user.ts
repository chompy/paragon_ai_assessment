import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
}, { collection: "User", timestamps: true });

const User = mongoose.model("User", userSchema);
export { User };