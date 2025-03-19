const pool = require("../config/db");

const createUser = async (name, email, password, role) => {
  const query = "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";
  const [result] = await pool.execute(query, [name, email, password, role]);
  return result;
};

const getUserByEmail = async (email) => {
  const query = "SELECT * FROM users WHERE email = ?";
  const [rows] = await pool.execute(query, [email]);
  return rows[0];
};

const getAllUsers = async () => {
  const query = "SELECT id, name, email, role FROM users"; 
  const [rows] = await pool.execute(query);
  return rows;
};

module.exports = { createUser, getUserByEmail, getAllUsers };
