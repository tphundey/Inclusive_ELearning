import mongoose from "mongoose";
const courseSchema = new mongoose.Schema({
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
        type: String
    },
    time : {
        type: String
    },
    date: {
        type: String
    },
    title: {
        type: String
    },
    category: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Category'
    }
}, { collection: "Course", timestamps: true })
export default mongoose.model('Course', courseSchema)