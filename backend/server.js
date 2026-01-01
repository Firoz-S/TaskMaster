console.log("inside server.js");

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const taskRoutes = require("./routes/tasks");

const app = express();

app.use(cors());
app.use(express.json());

// Serve frontend static files
app.use(express.static(path.join(__dirname, "../frontend")));

// Task API routes
app.use("/tasks", taskRoutes);

// Default route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
