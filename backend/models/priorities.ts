import mongoose from "mongoose";

const prioritiesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const Priorities = mongoose.model("Priorities", prioritiesSchema);
export default Priorities;
