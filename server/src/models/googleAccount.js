import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const googleAccountSchema = new mongoose.Schema(
  {
    email:{
        type:String,
    },
    name:{
        type:String,
    },
    img:{
        type:String,
    },
    registeredCourseID:[
        {type:mongoose.SchemaTypes.ObjectId}
    ]
  },
  { collection: "googleAccount", timestamps: true }
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
googleAccountSchema.plugin(mongoosePaginate);

const googleAccount = mongoose.model("googleAccount", googleAccountSchema);

export default googleAccount;
