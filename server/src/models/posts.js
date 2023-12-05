import mongoose from "mongoose";

const dataSchema = new mongoose.Schema({}, { collection: "posts", timestamps: true, strict: false });

dataSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
      ret.id = ret._id;
      delete ret._id;
    }
});

const posts = mongoose.model('posts', dataSchema);

export default posts;

