import mongoose from "mongoose";
const courseSchema = new mongoose.Schema({
    id: {
        type: String
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    rate : {
        type: Number,
        required: true
    },
    time : {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    videoId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Video',
        required: true
    },
    categoryId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Category',
        required: true
    }
}, { collection: "Course", timestamps: true })
export default mongoose.model('Course', courseSchema)