import { Schema, model } from "mongoose";
import { ObjectId } from "mongodb";

const usersSchema = new Schema({
  _id: {
    type: ObjectId,
    auto: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  posts: [
    {
      type: ObjectId,
      ref: "Posts",
    },
  ],
  categories: [
    {
      type: ObjectId,
      ref: "Categories",
    },
  ],
});

const Users = model("Users", usersSchema);
export default Users;
