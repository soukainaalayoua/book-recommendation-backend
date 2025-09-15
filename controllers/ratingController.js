const Rating = require("../models/Rating");

const addRating = async (req, res) => {
  const { bookId } = req.params;
  const { rating, review } = req.body;
  const userId = req.userId;

  try {
    const existing = await Rating.findOne({ user: userId, book: bookId });
    if (existing) {
      return res.status(400).json({ message: "You already rated this book." });
    }

    const newRating = new Rating({
      user: userId,
      book: bookId,
      rating,
      review,
    });

    await newRating.save();

    res.status(201).json(newRating);
  } catch (error) {
    console.error("Error while saving rating:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getBookRatings = async (req, res) => {
  const { bookId } = req.params;
  try {
    const ratings = await Rating.find({ book: bookId });

    const average =
      ratings.reduce((acc, r) => acc + r.rating, 0) / ratings.length || 0;

    res.status(200).json({ average, count: ratings.length });
  } catch (err) {
    res.status(500).json({ message: "Failed to get ratings", error: err });
  }
};

module.exports = { getBookRatings, addRating };
