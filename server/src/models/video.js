import mongoose from "mongoose";
const videoSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    progressID :{
        type: String,
        required: true,
    },
    time : {
        type: String,
        required: true,
    },
    courseId : {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Course',
        required: true,
    },
}, { collection: "Video", timestamps: true })
export default mongoose.model('Video', videoSchema)