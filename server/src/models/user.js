import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    id :  {
        type: String | Number,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    courseID :{
        type : String,
        required: true,
    },
    passWord: {
        type: String,
        required: true,
    },
    name :{
        type: String | Number,
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
        required: true,
    },
    role: {
        type: String,
        enum: ['student', 'instructor', 'admin'],
        default: 'student',
        require: true,
    },
},
{ collection: "User", timestamps: true });

export default mongoose.model("User", userSchema);