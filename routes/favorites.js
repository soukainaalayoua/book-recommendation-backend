const express = require("express");
const router = express.Router();
const Favorite = require("../models/Favorite");
const authMiddleware = require("../middleware/authMiddleware");

// GET route to retrieve user's favorites
router.get("/", authMiddleware, async (req, res) => {
  try {
    // Find all favorites for the current user
    const favorites = await Favorite.find({ userId: req.userId });
    res.status(200).json(favorites); // Send the list of favorites back
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// POST route to add a book to the user's favorites
router.post("/", authMiddleware, async (req, res) => {
  const { bookId, title, author, coverId } = req.body;
  const userId = req.userId; // Get userId from the decoded token

  try {
    // Check if the book is already in the favorites
    const existing = await Favorite.findOne({ userId, bookId });
    if (existing) {
      return res.status(400).json({ message: "Already in favorites" });
    }

    // Add the book to the user's favorites
    const newFavorite = new Favorite({
      userId,
      bookId,
      title,
      author,
      coverId,
    });
    await newFavorite.save();
    res.status(201).json({ message: "Book added to favorites" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});
// DELETE route to remove a book from the user's favorites
router.delete("/:bookId", authMiddleware, async (req, res) => {
  const { bookId } = req.params;
  const userId = req.userId; // Get userId from the decoded token

  try {
    // Find and remove the book from favorites
    const result = await Favorite.findOneAndDelete({ userId, bookId });

    if (!result) {
      return res.status(404).json({ message: "Book not found in favorites" });
    }

    res.status(200).json({ message: "Book removed from favorites" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
