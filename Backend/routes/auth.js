const express = require("express");
const bcryptjs = require("bcryptjs");
const User = require("../models/user"); // Ensure this points to the correct User model
const jwt = require("jsonwebtoken");
const authRouter = express.Router();

// Secret key for JWT (should ideally come from environment variables)
const JWT_SECRET = "yourSecretKey";

// Signup Route
authRouter.post("/api/signup", async (req, res) => {
  try {
    const { name, regNo, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ regNo });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists!" });
    }

    // Hash the password
    const hashedPassword = await bcryptjs.hash(password, 8);

    // Create a new user instance
    let user = new User({
      regNo,
      password: hashedPassword,
      name,
    });

    // Save the user to the database
    user = await user.save();
    res.json(user);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Signin Route
authRouter.post("/api/signin", async (req, res) => {
  try {
    const { regNo, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ regNo });
    if (!user) {
      return res.status(400).json({ msg: "User doesn't exist!" });
    }

    // Compare password
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Incorrect Password" });
    }

    // Generate JWT token (signing with user ID)
    const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: "1h" });

    res.json({ token, user });
  } catch (e) {
    console.error(e); // Log the error for debugging
    res.status(500).send({ msg: "Server Error" });
  }
});

module.exports = authRouter;
