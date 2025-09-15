// Importing necessary libraries
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// register
const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // check if the user exist
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Create a new user object
    const user = new User({
      name,
      email,
      password,
    });
    // Save the user to the database
    await user.save();
    // Respond with a success message
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// login up
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    //  Check if the email already exists in the database

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Verify the provided password with the stored hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Create a JWT token if the credentials are valid
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    // Send back the token and user info in the response
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
// logout function

const logout = async (req, res) => {
  res.redirect("/");
};

module.exports = { register, login, logout };
