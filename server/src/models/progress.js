import mongoose from "mongoose";
const progressSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    progress : {
        type : String,
        required: true
    },
    courseId : {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Course',
        required: true
    },
}, { collection: "Progress", timestamps: true })
export default mongoose.model('Progress', progressSchema)