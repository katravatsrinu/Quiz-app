const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "database-1.c1sgyyk6emqx.ap-south-1.rds.amazonaws.com",
  user: "admin",
  password: "sreenu123",
  database: "newschema",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});




module.exports = pool;  
