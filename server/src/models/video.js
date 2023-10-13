import mongoose from "mongoose";
const videoSchema = new mongoose.Schema({
    videoTitle :{
        type: String,
        required: true,
    },
    videoUrl: {
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