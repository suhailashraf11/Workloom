require("dotenv").config();

const express = require("express");
const cors = require("cors");
const db = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.get("/", (req, res) => {
  res.send("CollabFlow backend is running");
});

app.get("/api/health", (req, res) => {
  res.json({
    message: "Frontend connected to CollabFlow backend successfully",
  });
});

const PORT = process.env.PORT || 5000;

app.get("/api/db-test", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT DATABASE() AS database_name");

    res.json({
      message: "MySQL connected successfully",
      database: rows[0].database_name,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "MySQL connection failed",
    });
  }
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
