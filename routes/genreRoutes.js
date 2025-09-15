const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  const genres = [
    { id: 1, name: "Fantasy" },
    { id: 2, name: "Romance" },
    { id: 3, name: "Science Fiction" },
  ];
  res.json(genres);
});

module.exports = router;
