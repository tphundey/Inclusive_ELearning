import mongoose from "mongoose";
const cartSchema = new mongoose.Schema({
    id: {
        type: String | Number
    },
    userId : {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true
    },
    courseId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Course',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number
    },
    status : {
        type: String
    }
}, { collection: "Cart", timestamps: true },
)
export default mongoose.model('Cart', cartSchema)