const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { createUser, getUserByEmail, getAllUsers } = require("../models/userModel");

const router = express.Router();

router.post("/register", async (req, res) => {
    try {
      const { name, email, password, role } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields (name, email, password) are required." });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      await createUser(name, email, hashedPassword, role || "user");
      res.json({ message: "User registered successfully" });
  
    } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  


router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await getUserByEmail(email);
  
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Create JWT token with userId and role
  const token = jwt.sign({ userId: user.id, role: user.role }, "your_secret_key", { expiresIn: "1h" });

  // Send both token and role in response
  res.json({
    token: token,
    role: user.role,  // Include the user's role here
  });
});


module.exports = router;
