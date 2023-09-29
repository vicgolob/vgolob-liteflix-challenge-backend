const { getMoviesAll, createMovie } = require("../services/moviesService");
const upload = require("../services/uploadService");

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
		console.error("ERROR:: MOVIES_CONTROLLER @ getMovies - Error:", error);
		res.status(500).json({ error: "Unable to get movies" });
	}
}

async function addMovie(req, res) {
	try {
		const { file, body } = req;
		let { title } = body;

		const uploadedFile = await upload(file, title);
		await createMovie(title, uploadedFile.url);
		res.json({
			message: "Movie created",
			imageUrl: uploadedFile.url,
		});
	} catch (error) {
		console.error("ERROR:: MOVIES_CONTROLLER @ addMovie - Error:", error);
		res.status(500).json({ error: "Unable to create the movie" });
	}
}

module.exports = { getmovies, addMovie };
