import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({}, { collection: "Categories", timestamps: true, strict: false });

const Categories = mongoose.model('Categories', categorySchema);

export default Categories;
