const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

// Get tasks by query parameters
router.get("/", async (req, res) => {
    try {
        const query = {};

        if (req.query.categoryId) {
            query.category = req.query.categoryId;
        }

        if (req.query.status) {
            query.status = req.query.status;
        }

        if (req.query.dueDate) {
            query.dueDate = new Date(req.query.dueDate);
        }

        const tasks = await Task.find(query);
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;