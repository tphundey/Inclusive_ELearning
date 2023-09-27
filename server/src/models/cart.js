import mongoose from "mongoose";
const cartSchema = new mongoose.Schema({
    id: {
        type: String | Number
    },
    user : {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true
    },
    course: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Course',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    total_price: {
        type: Number
    },
    status : {
        type: String
    }
}, { collection: "Cart", timestamps: true },
)
export default mongoose.model('Cart', cartSchema)