import { ObjectId } from "mongodb";

const usersSchema = new mongoose.Schema({
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

module.exports = {
  usersSchema,
  usersModel: mongoose.model("users", usersSchema),
};
