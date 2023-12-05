import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({}, { collection: "Reviews", timestamps: true, strict: false });

export default mongoose.model('Reviews', reviewSchema);
