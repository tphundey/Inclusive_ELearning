import mongoose from "mongoose";
const categorySchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
}, { collection: "Category", timestamps: true })
export default mongoose.model('Category', categorySchema)