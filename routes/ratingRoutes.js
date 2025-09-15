// Import express and necessary controllers/middleware
const express = require("express");
const {
  addRating,
  getBookRatings,
} = require("../controllers/ratingController");
const authMiddleware = require("../middleware/authMiddleware");

// Initialize a new router

const router = express.Router();

// Route to add a rating for a specific book by its bookId
// The 'authMiddleware' ensures the user is authenticated before adding the rating
router.post("/:bookId", authMiddleware, addRating);
router.get("/:bookId", getBookRatings);
// Export the router to be used in the main server file
module.exports = router;
