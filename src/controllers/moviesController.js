const { getMoviesAll } = require("../services/movieService");

async function getmovies(req, res) {
	try {
		let { page, pageSize } = req.query;
		if (!page) {
			page = 1;
		}
		if (!pageSize) {
			pageSize = 5;
		}
		const response = await getMoviesAll(page, pageSize);
		res.json(response);
	} catch (error) {
		console.error("DEBUG:: GET /movies - Error:", error);
		res.status(500).json({ error: "Unable to get movies" });
	}
}

module.exports = { getmovies };
