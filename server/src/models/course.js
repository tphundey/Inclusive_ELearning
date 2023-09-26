import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
    name: {
        type: String
    },
    price: {
        type: Number
    },
    description: {
        type: String
    },
    rate : {
        type: String
    },
    time : {
        type: String
    },
    date: {
        type: String
    },
    title: {
        type: String
    },
    category: {
        type: String
    }
}, {
    timestamps: true,
    versionKey: false
})
export default mongoose.model('course', productSchema)