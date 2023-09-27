import mongoose from "mongoose";
const categorySchema = new mongoose.Schema({
    name: {
        type: String
    },
}, { collection: "Category", timestamps: true })
export default mongoose.model('Category', categorySchema)