import mongoose from "mongoose";

const dataSchema = new mongoose.Schema({}, { collection: "Reviews", timestamps: true, strict: false });

dataSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
      ret.id = ret._id;
      delete ret._id;
    }
});

const Reviews = mongoose.model('Reviews', dataSchema);

export default Reviews;

