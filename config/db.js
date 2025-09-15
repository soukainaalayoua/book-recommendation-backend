const mongoose = require("mongoose");
require("dotenv").config();
// connect database
const connectDB = async () => {
  const MONGO_URI = process.env.MONGO_URI;
  try {
    await mongoose.connect(MONGO_URI);
    console.log("database conneted succfuly");
  } catch (error) {
    console.error("error in connecting to mongodb", error.message);
    process.exit(1);
  }
};
module.exports = connectDB;
