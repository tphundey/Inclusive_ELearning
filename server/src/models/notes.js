import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({}, { collection: "Notes", timestamps: true, strict: false });

const Note = mongoose.model('Notes', noteSchema);

export default Note;
