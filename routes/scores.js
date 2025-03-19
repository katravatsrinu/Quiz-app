const express = require("express");
const db = require("../config/db");
const router = express.Router();


router.get('/api/scores', async (req, res) => {
  try {
    const query = `
      SELECT scores.id as score_id, scores.score, users.id as user_id, users.name as user_name, quizzes.id as quiz_id, quizzes.quiz_name
      FROM scores
      JOIN users ON scores.user_id = users.id
      JOIN quizzes ON scores.quiz_id = quizzes.id
    `;

    const [results] = await db.query(query); 

    if (results.length === 0) {
      return res.status(404).json({ message: 'No scores found.' });
    }

    res.status(200).json(results);
  } catch (error) {
    console.error('Error fetching scores:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post("/", async (req, res) => {
  try {
    const { userId, quizId, score } = req.body;

    console.log("Incoming data:", req.body);

    if (!userId || !quizId || score === undefined) {
      console.error("Missing fields:", { userId, quizId, score });
      return res.status(400).json({ error: "userId, quizId, and score are required" });
    }

    const [userExists] = await db.execute("SELECT id FROM users WHERE id = ?", [userId]);
    const [quizExists] = await db.execute("SELECT id FROM quizzes WHERE id = ?", [quizId]);

    if (userExists.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    if (quizExists.length === 0) {
      return res.status(404).json({ error: "Quiz not found" });
    }

    const [result] = await db.execute(
      "INSERT INTO scores (userId, quizId, score) VALUES (?, ?, ?)",
      [userId, quizId, score]
    );

    console.log("Query executed. Result:", result);
    res.status(201).json({ message: "Score saved successfully", scoreId: result.insertId });

  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Failed to save score", details: error.message });
  }
});

module.exports = router;