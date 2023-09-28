import mongoose from "mongoose";
const noteSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    videoId : {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Video',
        required: true
    },
    time : {
        type : String,
        required: true
    },
    userId :{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true
    },
    note : {
        type : String,
        required: true
    },
}, { collection: "Note", timestamps: true })
export default mongoose.model('Note', noteSchema)