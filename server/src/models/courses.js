import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({}, { collection: "Courses", timestamps: true, strict: false });

const Courses = mongoose.model('Courses', categorySchema);

export default Courses;
