// // Import required modules
const express = require("express");
require("dotenv").config();
const connectDB = require("./config/db");
const cors = require("cors");

// Import route files
const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");
const ratingRoutes = require("./routes/ratingRoutes");
const favoriteRoutes = require("./routes/favorites");
const genreRoutes = require("./routes/genreRoutes");

// Initialize the Express app
const app = express();
// app.use(
//   cors({
//     origin: "https://book-recommendation-frontend-e4u6-qtk6jlwsc.vercel.app",
//     methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
//     credentials: true,
//   })
// );
const allowedOrigins = [
  "https://book-recommendation-frontend-e4u6-qtk6jlwsc.vercel.app",
  "https://book-recommendation-frontend-e4u6-qj3yps0u5.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = "CORS policy: This origin is not allowed";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
  })
);
// Middleware to parse incoming JSON data
app.use(express.json());

// Define the base routes for the API
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/ratings", ratingRoutes);
app.use("/api/favorites", favoriteRoutes);
app.use("/api/genres", genreRoutes);
// Connect to MongoDB and start the server
const PORT = process.env.PORT || 3001;
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server is runin on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("failed to connect to db", error.message);
    process.exit(1);
  });
