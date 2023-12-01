import mongoose from "mongoose";
const reviewSchema = new mongoose.Schema({
    rating : {
        type: Number
    },
    comment : {
        type: String,
    },
    userID : {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        // required: true
    },
    courseID : {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Course',
        // required: true
    },
    time : {
        type : String,
        // required: true
    },
}, { collection: "Review", timestamps: true })
export default mongoose.model('Review', reviewSchema)