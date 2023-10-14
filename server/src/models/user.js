import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    courseId :{
        type : String,
        // required: true,
    },
    passWord: {
        type: String,
        required: true,
    },
    name :{
        type: String,
        required: true,
    },
    avata : {
        type : String
    },
    location : {
        type : String
    },
    courseSaved : {
        type : String,
        // required: true,
    },
    role: {
        type: String,
        enum: ['student','admin'],
        default: 'student',
        require: true,
    },
},
{ collection: "User", timestamps: true });
userSchema.plugin(mongoosePaginate)
const User =  mongoose.model("User", userSchema);
export default User
