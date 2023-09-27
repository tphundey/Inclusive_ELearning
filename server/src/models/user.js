import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    id :  {
        type: String | Number
    },
    email: {
        type: String,
        unique: true,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    name :{
        type: String | Number
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