import mongoose from "mongoose";
const noteSchema = new mongoose.Schema({
    videoID : {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Video',
        required: true
    },
    note : {
        type : String,
        required: true
    },
    date : {
        type : String,
        required: true
    },
}, { collection: "Note", timestamps: true })
export default mongoose.model('Note', noteSchema)