const { Router } = require("express");
const router = Router();

const { getmovies } = require("../controllers/moviesController");

router.get("/", getmovies);

module.exports = router;
