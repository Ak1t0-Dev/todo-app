import mongoose from "mongoose";

const tagsSchema = new mongoose.Schema({
  tag: {
    type: String,
    required: true,
  },
});

export const tagsModel = mongoose.model("tags", tagsSchema);
