import mongoose from"mongoose";

const paymentMethodSchema = new mongoose.Schema(
  {
    paymentname: {
      type: String,
      required: true,
      unique: true,
    },
    image:{
      type: String,
      required:false
    },
    status: {
      type: Boolean,
      default: true,
      required: true,
    },
    meta_data: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("PaymentMethod", paymentMethodSchema);