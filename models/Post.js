import mongoose from "mongoose";
const { Schema, model } = mongoose;

const PostSchema = new Schema({
  name: { type: String },
  username: { type: String },
  message: { type: String },
  postpic: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Post = mongoose.models.Post || model("Post", PostSchema);
export default Post;
