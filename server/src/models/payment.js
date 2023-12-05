import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({}, { collection: "Payment", timestamps: true, strict: false });

export default mongoose.model("Payment", paymentSchema);
