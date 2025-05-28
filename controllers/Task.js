import express from "express";
import Task from "../models/Task.js";

const router = express.Router();

// GET all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    return res.json(tasks);
  } catch (err) {
    console.error("Error fetching tasks:", err);
    return res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

// POST a new task
router.post("/", async (req, res) => {
  try {
    const { title, description, category } = req.body;

    if (!title || !category) {
      return res.status(400).json({ error: "Title and category are required" });
    }

    const newTask = new Task({ title, description, category });
    await newTask.save();
    return res.status(201).json(newTask);
  } catch (err) {
    console.error("Error creating task:", err);
    return res.status(500).json({ error: "Failed to create task" });
  }
});

// PUT update task
router.put("/:id", async (req, res) => {
  try {
    const { title, description, category } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description, category },
      { new: true, runValidators: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }
    return res.json(updatedTask);
  } catch (err) {
    console.error("Error updating task:", err);
    return res.status(500).json({ error: "Failed to update task" });
  }
});

// DELETE task
router.delete("/:id", async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" });
    }
    return res.json({ message: "Task deleted" });
  } catch (err) {
    console.error("Error deleting task:", err);
    return res.status(500).json({ error: "Failed to delete task" });
  }
});

export default router;
