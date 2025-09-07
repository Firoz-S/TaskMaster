const express = require("express");
const cors = require("cors");
const path = require("path");
const db = require("./db");

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

// Serve frontend (static files)
app.use(express.static(path.join(__dirname, "../frontend")));

// Get all tasks
app.get("/tasks", (req, res) => {
  db.query("SELECT * FROM tasks", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Add a new task
app.post("/tasks", (req, res) => {
  const { text } = req.body;
  db.query(
    "INSERT INTO tasks (text, completed) VALUES (?, ?)",
    [text, false],
    (err, result) => {
      if (err) throw err;
      res.json({ id: result.insertId, text, completed: false });
    }
  );
});

// Update task (completed true/false)
app.patch("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  db.query(
    "UPDATE tasks SET completed = ? WHERE id = ?",
    [completed, id],
    (err) => {
      if (err) throw err;
      res.json({ id, completed });
    }
  );
});

// Delete a task
app.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM tasks WHERE id = ?", [id], (err) => {
    if (err) throw err;
    res.json({ success: true });
  });
});

// Default route → serve index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend", "index.html"));
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
