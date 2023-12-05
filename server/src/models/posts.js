import mongoose from "mongoose";

const postSchema = new mongoose.Schema({}, { collection: "posts", timestamps: true, strict: false });

const Post = mongoose.model('posts', postSchema);

export default Post;
