import express from "express";
import Goal from "../models/Goal.js";

const router = express.Router();

// Get all goals
router.get("/", async (req, res) => {
  try {
    const goals = await Goal.find();
    res.json(goals);
  } catch (error) {
    res.status(500).json({ message: "Error fetching goals", error });
  }
});

// Add new goal
router.post("/", async (req, res) => {
  try {
    const newGoal = new Goal(req.body);
    await newGoal.save();
    res.status(201).json(newGoal);
  } catch (error) {
    res.status(500).json({ message: "Error saving goal", error });
  }
});

// Update goal
router.put("/:id", async (req, res) => {
  try {
    const updated = await Goal.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error updating goal", error });
  }
});

// Delete goal
router.delete("/:id", async (req, res) => {
  try {
    await Goal.findByIdAndDelete(req.params.id);
    res.json({ message: "Goal deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting goal", error });
  }
});

export default router;
