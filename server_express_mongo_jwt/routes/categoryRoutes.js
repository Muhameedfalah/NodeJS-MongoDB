const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const User = require("../models/User");
const Category = require("../models/Category");
const mongoose = require("mongoose");

// Create a new category
router.post("/", verifyToken, async (req, res) => {
    const { name } = req.body;

    const newCategory = new Category({
        name,
        user: req.userId,
    });
    
    newCategory._id = new mongoose.Types.ObjectId();

    try {
        const savedCategory = await newCategory.save();
        res.json(savedCategory);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all categories
router.get("/", verifyToken, async (req, res) => {
    try {
        const categories = await Category.find({ user: req.userId });
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get one category
router.get("/:id", verifyToken, async (req, res) => {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: "Category not found" });
    res.json(category);
});

// Update one category
router.put("/:id", verifyToken, async (req, res) => {
    const { name } = req.body;
    const updatedCategory = { name, user: req.userId };

    try {
        await Category.findByIdAndUpdate(req.params.id, updatedCategory);
        res.json({ message: "Category updated" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete one category
router.delete("/:id", verifyToken, async (req, res) => {
    try {
        await Category.findByIdAndDelete(req.params.id);
        res.json({ message: "Category deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;