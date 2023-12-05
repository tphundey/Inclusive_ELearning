import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({}, { collection: "Videos", timestamps: true, strict: false });

const Video = mongoose.model('Videos', videoSchema);

export default Video;
