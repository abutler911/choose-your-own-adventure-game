const express = require("express");
const router = express.Router();
const User = require("../models/user");

// Register route
router.post("/register", async (req, res) => {
  try {
    // Create a new user
    const { email, password } = req.body;
    const user = new User({ email, password });

    // Save the user to the database
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to register user" });
  }
});

// Login route
router.post("/login", async (req, res) => {
  // Authenticate user and generate JWT
  // ...
});

module.exports = router;
