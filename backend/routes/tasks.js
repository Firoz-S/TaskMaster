const express = require("express");
const router = express.Router();
const db = require("../db");

// GET all tasks
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT id, text, completed FROM tasks");
    res.json(rows);
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

// ADD task
router.post("/", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({ error: "Task text is required" });
    }

    const [result] = await db.query(
      "INSERT INTO tasks (text, completed) VALUES (?, ?)",
      [text, false]
    );

    res.status(201).json({
      id: result.insertId,
      text,
      completed: false,
    });
  } catch (err) {
    console.error("Insert error:", err);
    res.status(500).json({ error: "Failed to add task" });
  }
});

// UPDATE task
router.patch("/:id", async (req, res) => {
  try {
    const { completed } = req.body;

    await db.query("UPDATE tasks SET completed = ? WHERE id = ?", [
      completed,
      req.params.id,
    ]);

    res.json({ id: req.params.id, completed });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ error: "Failed to update task" });
  }
});

// DELETE task
router.delete("/:id", async (req, res) => {
  try {
    await db.query("DELETE FROM tasks WHERE id = ?", [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ error: "Failed to delete task" });
  }
});

module.exports = router;
