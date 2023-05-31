import { Schema, model } from "mongoose";
import { ObjectId } from "mongodb";

const postsSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  tags: [
    {
      type: ObjectId,
      ref: "Tags",
    },
  ],
  categories: [
    {
      type: ObjectId,
      ref: "Categories",
    },
  ],
});

const Posts = model("Posts", postsSchema);

export default Posts;
