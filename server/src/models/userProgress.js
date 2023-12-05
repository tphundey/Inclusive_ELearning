import mongoose from "mongoose";

const userProgressSchema = new mongoose.Schema({}, { collection: "UserProgress", timestamps: true, strict: false });

const UserProgress = mongoose.model('UserProgress', userProgressSchema);

export default UserProgress;
