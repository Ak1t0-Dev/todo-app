import mongoose from "mongoose";

const tagsSchema = new mongoose.Schema({
  tag: {
    type: String,
    required: true,
  },
});

const Tags = mongoose.model("Tags", tagsSchema);
export default Tags;
