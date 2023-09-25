import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
    name: {
        type: String
    }
}, {
    timestamps: true,
    versionKey: false
})
export default mongoose.model('products', productSchema)