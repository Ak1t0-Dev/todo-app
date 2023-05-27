import mongoose from "mongoose";
import { ObjectId } from "mongodb";

export const usersSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  posts: [
    {
      type: ObjectId,
      ref: "posts",
    },
  ],
});

export const usersModel = mongoose.model("users", usersSchema);
