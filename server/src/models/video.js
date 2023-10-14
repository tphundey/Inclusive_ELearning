import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

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
videoSchema.plugin(mongoosePaginate)
const Video = mongoose.model('Video', videoSchema);
export default Video