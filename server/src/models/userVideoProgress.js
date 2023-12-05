import mongoose from "mongoose";

const userVideoProgressSchema = new mongoose.Schema({}, { collection: "userVideoProgress", timestamps: true, strict: false });

const UserVideoProgress = mongoose.model('userVideoProgress', userVideoProgressSchema);

export default UserVideoProgress;
