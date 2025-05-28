import mongoose from "mongoose";

const GoalSchema = new mongoose.Schema({
  userId: String,
  title: String,
  category: String,
});

export default mongoose.model("Goal", GoalSchema);
