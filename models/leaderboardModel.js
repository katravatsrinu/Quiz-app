// const db = require("../config/db");

// // Function to add a score
// const addScore = async (userId, quizId, score) => {
//   try {
//     const sql = "INSERT INTO scores (userId, quizId, score) VALUES (?, ?, ?)";
//     await db.execute(sql, [userId, quizId, score]);
//     console.log(`Score added: UserID=${userId}, QuizID=${quizId}, Score=${score}`);
//   } catch (error) {
//     console.error("Error inserting score:", error);
//     throw error;
//   }
// };

// // Function to get leaderboard
// const getLeaderboard = async () => {
//   try {
//     console.log("Fetching leaderboard data...");
//     const [results] = await db.execute(
//       `SELECT users.name, quizzes.title, scores.score 
//        FROM scores 
//        JOIN users ON scores.userId = users.id 
//        JOIN quizzes ON scores.quizId = quizzes.id 
//        ORDER BY scores.score DESC`
//     );
//     console.log("Leaderboard Results:", results);
//     return results;
//   } catch (error) {
//     console.error("Database Error:", error);
//     return [];
//   }
// };

// module.exports = { addScore, getLeaderboard };
