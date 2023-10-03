import mongoose from "mongoose";
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    course : [
        {
            type : mongoose.Types.ObjectId,
            ref: "Course",
        },
    ],
}, { collection: "Category", timestamps: true })
export default mongoose.model('Category', categorySchema)