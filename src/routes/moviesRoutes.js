const { Router } = require("express");
const router = Router();

const { getmovies, addMovie } = require("../controllers/moviesController");

router.get("/", getmovies);
router.post("/add", addMovie);

module.exports = router;
