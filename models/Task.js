import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  userId: String,
  title: String,
  description: String,
  category: String,
});

export default mongoose.model("Task", TaskSchema);
