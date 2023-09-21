import mongoose from "mongoose";
const { Schema } = mongoose;
const categorySchema = new mongoose.Schema({
    name: {
        type: String
    },

}, {
    timestamps: true,
    versionKey: false
})

export default mongoose.model('category', categorySchema)