import mongoose from "mongoose";
const reviewSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    courseId : {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Course',
        required: true
    },
    userID : {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true
    },
    review : {
        type: String,
        required: true
    },
    rate : {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Course',
        required: true
    },
    time : {
        type : String,
        required: true
    }
}, { collection: "Review", timestamps: true })
export default mongoose.model('Review', reviewSchema)