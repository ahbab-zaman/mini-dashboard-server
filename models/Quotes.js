import axios from "axios";
import express from "express";
const router = express.Router();


router.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://zenquotes.io/api/random");
    res.json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch quote" });
  }
});

export default router;
