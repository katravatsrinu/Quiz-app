const express = require("express");
const { getQuizzes, getQuestionsByQuizId, getAnswersByQuestionId } = require("../models/quizModel");

const router = express.Router();

// Get all quizzes
router.get("/", async (req, res) => {
  try {
    const quizzes = await getQuizzes();
    if (!quizzes.length) {
      return res.status(404).json({ error: "No quizzes available" });
    }
    res.json(quizzes);
  } catch (error) {
    console.error("❌ Error fetching quizzes:", error);
    res.status(500).json({ error: "Failed to fetch quizzes" });
  }
});

// Get questions for a specific quiz by quizId, including answers
router.get("/:quizId/questions", async (req, res) => {
  try {
    const questions = await getQuestionsByQuizId(req.params.quizId);

    if (!questions.length) {
      return res.status(404).json({ error: "No questions found for this quiz" });
    }

    // Fetch answers for all questions in parallel
    const questionsWithAnswers = await Promise.all(
      questions.map(async (question) => {
        const answers = await getAnswersByQuestionId(question.id);
        return { ...question, answers };
      })
    );

    res.json(questionsWithAnswers);
  } catch (error) {
    console.error("Error fetching questions and answers:", error);
    res.status(500).json({ error: "Failed to fetch questions or answers" });
  }
});

module.exports = router;
