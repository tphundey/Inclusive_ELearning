import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema({
    part :{
        type: number,
        required: true,
    },
    courseId : {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Course',
        required: true,
    },
}, { collection: "section", timestamps: true })
const section = mongoose.model('section', sectionSchema);
export default section