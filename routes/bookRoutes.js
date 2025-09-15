// Import express and router
const express = require("express");
const router = express.Router();

// Import middleware and controllers
const authMiddleware = require("../middleware/authMiddleware");
const {
  addBook,
  getBookById,
  getBooks,
  getBooksByGenre,
} = require("../controllers/bookController");
const { addRating } = require("../controllers/ratingController");

// Route to add a new book (requires authentication)
router.post("/add", authMiddleware, addBook);

// Route to get all books
router.get("/", getBooks);

// Route to get books filtered by genre
router.get("/genre/:genreName", getBooksByGenre);

// Route to get a specific book by its ID
router.get("/:bookId", getBookById);

// Route to add a rating for a book (requires authentication)
router.post("/:bookId/rate", authMiddleware, addRating);

module.exports = router;
