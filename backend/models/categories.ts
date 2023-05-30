import mongoose from "mongoose";

const categoriesSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
});

export const categoriesModel = mongoose.model("categories", categoriesSchema);
