import mongoose from "mongoose";
const categorySchema = new mongoose.Schema({
    id: {
        type: String | Number
    },
    user_id: {
        type: Number
    },
    course_id: {
        type: Number
    },
    quantity: {
        type: Number
    },
    total_price: {
        type: Number
    },
    status : {
        type: String
    }
}, {
    timestamps: true,
    versionKey: false
})
export default mongoose.model('cart', categorySchema)