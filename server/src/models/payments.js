import mongoose from "mongoose"
const paymentSchema = new mongoose.Schema(
  {
    recipient: {
      type: String,
      required: true,
      default: "Yoga HeartBeat",
    },
    paymentDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    paymentAmount: {
      type: Number,
      required: true,
    },
    paymentMethod_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PaymentMethod",
      required: true,
    },
    booking_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
      // unique: true,
    },
    description: {
      type: String,
      required: false,
    },
    premium_id:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Premium",
      required: false,
    },
    status: {
      type: Number,
      default: 5,
      required: true,
      //0 thất bại book, do lớp đầy, do đã tham gia vào lớp r
      //10 book thành công thanh toán nộp tiền đầy đủ
      //5 book thành công, chọn phương thức thanh toán thành công, nhưng chưa nộp tiền
      //4 dùng thử
    },
    meta_data: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Payment", paymentSchema);