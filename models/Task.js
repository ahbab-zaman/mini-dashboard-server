import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
  userId: String,
  title: String,
  completed: Boolean,
});

export default mongoose.model('Task', TaskSchema);