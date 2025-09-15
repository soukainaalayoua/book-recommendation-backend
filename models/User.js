// Import mongoose and bcrypt
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Define the schema for a User
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,

    required: true,
  },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  favoriteGenres: [String],
  likedBooks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
    },
  ],
  readingList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

// Pre-save hook to hash the password before saving it to the database
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
// Create the User model from the schema

const User = mongoose.model("User", userSchema);
module.exports = User;
