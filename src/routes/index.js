const { Router } = require("express");

const moviesRoutes = require("./moviesRoutes");
const router = Router();

router.use("/movies", moviesRoutes);

module.exports = router;
