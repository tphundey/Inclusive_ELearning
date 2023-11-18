import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import slug from "mongoose-slug-generator";

const courseSchema = new mongoose.Schema(
  {
    courseName: {
      type: String,
      required: true,
    },
    courseIMG: {
      type: String,
      required: true,
    },
    enrollment: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    isHidden: {
      type: Boolean,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    rate: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    videoId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Video",
      required: true,
    },
    categoryId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  { collection: "Course", timestamps: true }
);

function idPlugin(schema) {
  schema.set('toJSON', {
    virtuals: true,
    transform: function(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    },
  });

  schema.set('toObject', {
    virtuals: true,
    transform: function(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    },
  });
}
mongoose.plugin(slug);
mongoose.plugin(idPlugin);
courseSchema.plugin(mongoosePaginate);

const Course = mongoose.model("Course", courseSchema);

export default Course;
