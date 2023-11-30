import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const courseSchema = new mongoose.Schema(
  {
    courseName: {
      type: String,
      
    },
    description: {
      type: String,
      
    },
    price: {
      type: Number,
      
    },
    duration: {
      type: Number,
      
    },
    rateID: [{
      type: mongoose.SchemaTypes.ObjectId,
      ref:"Review"
    }],
    date: {
      type: String,
      
    },
    categoryID: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Category",
      
    },
    courseIMG: {
      type: String,
      
    },
    enrollment: {
      type: Number,
      
    },
    isHidden: {
      type: Boolean,
      
    },
    isDeleted: {
      type: Boolean,
      
    },
    time: {
      type: String,
      required: true,
    },
    videoId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Video",
      
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
mongoose.plugin(idPlugin);
courseSchema.plugin(mongoosePaginate);

const Course = mongoose.model("Course", courseSchema);

export default Course;
