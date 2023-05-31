import mongoose from "mongoose";

const categoriesSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
});

const Categories = mongoose.model("Categories", categoriesSchema);
export default Categories;
