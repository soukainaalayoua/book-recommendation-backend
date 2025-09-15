const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  bookId: {
    type: String,

    required: true,
  },
  title: {
    type: String,

    required: true,
  },
  author: {
    type: String,
    default: "Unknown",
  },
  coverId: {
    type: String,
    default: null,
  },
});

const Favorite = mongoose.model("Favorite", favoriteSchema);
module.exports = Favorite;
