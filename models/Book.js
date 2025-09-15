// Import mongoose to create the schema
const mongoose = require("mongoose");

// Define the schema for a Book
const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    text: true,
  },
  author: {
    type: String,
    required: true,
  },
  genre: [String],
  description: { type: String },
  coverImage: {
    type: String,
  },
  publishedYear: Number,
  price: Number,
  ratings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Rating",
    },
  ],
  averageRating: {
    type: Number,
    default: 0,
  },
  reviewsCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create a text index for search functionality
bookSchema.index({ title: "text", author: "text", genre: "text" });
// Create the Book model from the schema
const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
