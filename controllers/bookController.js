const Book = require("../models/Book");

// Add a new book to the database
const addBook = async (req, res) => {
  const {
    title,
    author,
    genre,
    description,
    coverImage,
    publishedYear,
    price,
  } = req.body;

  try {
    // Create a new book object with the provided data
    const newBook = new Book({
      title,
      author,
      genre,
      description,
      coverImage,
      publishedYear,
      price,
    });
    // Save the new book to the database
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
// Get all books from the database
const getBooks = async (req, res) => {
  try {
    // Fetch all books from the database
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get a book by its ID from the database
const getBookById = async (req, res) => {
  const { bookId } = req.params;
  try {
    // Find the book by ID and populate the ratings data
    const book = await Book.findById(bookId).populate("ratings");
    // If the book is not found, return a 404 error
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    } // Respond with the found book data
    res.status(200).json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
// Get books by a specific genre
const getBooksByGenre = async (req, res) => {
  const { genreName } = req.params;
  try {
    // Fetch books with the specified genre and limit to 5 books
    const books = await Book.find({ genre: genreName }).limit(8);
    res.status(200).json(books);
  } catch (error) {
    console.error("Error getting books by genre:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { addBook, getBookById, getBooksByGenre, getBooks };
