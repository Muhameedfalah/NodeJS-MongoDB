const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const User = require("../models/User");
const Task = require("../models/Task");
const mongoose = require("mongoose");

// Create a new task
router.post("/", verifyToken, async (req, res) => {
  const { title, description, status, dueDate, category } = req.body;

  const newTask = new Task({
    title,
    description,
    status,
    dueDate,
    category,
    user: req.userId,
  });
  
  newTask._id = new mongoose.Types.ObjectId();

  try {
    const savedTask = await newTask.save();
    res.json(savedTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all tasks
router.get("/", verifyToken, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.userId });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get one task
router.get("/:id", verifyToken, async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: "Task not found" });
  res.json(task);
});

// Update one task
router.put("/:id", verifyToken, async (req, res) => {
  const { title, description, status, dueDate, category } = req.body;
  const updatedTask = { title, description, status, dueDate, category, user: req.userId };

  try {
    await Task.findByIdAndUpdate(req.params.id, updatedTask);
    res.json({ message: "Task updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete one task
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;