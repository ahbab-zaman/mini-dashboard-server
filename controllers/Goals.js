import express from "express";
import Goal from "../models/Goal.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(verifyToken);

router.get("/", async (req, res) => {
  const goals = await Goal.find({ userId: req.user.id });
  res.json(goals);
});

router.post("/", async (req, res) => {
  const newGoal = new Goal({ ...req.body, userId: req.user.id });
  await newGoal.save();
  res.status(201).json(newGoal);
});

router.put("/:id", async (req, res) => {
  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updatedGoal);
});

router.delete("/:id", async (req, res) => {
  await Goal.findByIdAndDelete(req.params.id);
  res.json({ message: "Goal deleted" });
});

export default router;
