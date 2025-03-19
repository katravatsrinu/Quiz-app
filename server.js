const express = require("express");
const cors = require("cors");
const pool = require("./config/db"); 

const userRoutes = require("./routes/userRoutes");
const quizRoutes = require("./routes/quizRoutes");
const scoresRoutes = require('./routes/scores');

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/quizzes", quizRoutes);
app.use("/api/scores", scoresRoutes );

const PORT = process.env.PORT || 5049;

const startServer = async () => {
  try {
    // Verifying database connection
    await pool.query('SELECT 1'); 
    console.log("Connected to MySQL database");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Database connection failed:", err.message);
    process.exit(1);
  }
};

startServer();
