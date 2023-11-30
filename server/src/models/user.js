import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      // required: true,
    },
    email: {
      type: String,
      unique: true,
      // required: true,
    },
    password: {
      type: String,
      // required: true,
    },
    avatarIMG: {
      type: String,
    },
    address: {
      type: String,
    },
    phone: {
      type: String,
    },
    roleID: {
      type: Number,
      // enum: ["student", "admin"],
      // default: "student",
      // require: true,
    },
    courseId: {
      type: String,
      // required: true,s
    },
    registeredCourseID: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Course",
      },
    ],
    courseSaved: [{ type: Number }],
    location: {
      type: String,
    },
    registeredCourseID: {
      type: Number,
    },
  },
  { collection: "User", timestamps: true }
);

function idPlugin(schema) {
  schema.set("toJSON", {
    virtuals: true,
    transform: function (doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    },
  });

  schema.set("toObject", {
    virtuals: true,
    transform: function (doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    },
  });
}
mongoose.plugin(idPlugin);
userSchema.plugin(mongoosePaginate);
const User = mongoose.model("User", userSchema);
export default User;
