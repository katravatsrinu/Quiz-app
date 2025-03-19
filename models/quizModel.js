const db = require("../config/db");

const getQuizzes = async () => {
  const [quizzes] = await db.execute("SELECT * FROM quizzes");
  return quizzes;
};

const getQuestionsByQuizId = async (quizId) => {
  const [questions] = await db.execute("SELECT * FROM questions WHERE quiz_id = ?", [quizId]);
  return questions;
};

const getAnswersByQuestionId = async (questionId) => {
  const [answers] = await db.execute("SELECT * FROM answers WHERE question_id = ?", [questionId]);
  return answers;
};

module.exports = { getQuizzes, getQuestionsByQuizId, getAnswersByQuestionId };
