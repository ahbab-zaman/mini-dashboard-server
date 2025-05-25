import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/User.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 6);
  const user = new User({ username, email, password: hashedPassword });
  await user.save();
  res.status(201).json({ message: 'User registered' });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json('User not found');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json('Invalid credentials');

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({ token, user: { id: user._id, username: user.username } });
});

export default router;