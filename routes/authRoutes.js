// Import express and router
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

// Import controller functions for register and login
const { register, login, logout } = require("../controllers/authController");

// Route to register a new user
router.post("/register", register);

// Route to login an existing user
router.post("/login", login);
router.post("/logout", logout);

router.get("/user", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ userName: user.name });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
