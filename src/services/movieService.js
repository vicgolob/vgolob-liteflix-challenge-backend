const { Movie } = require("../models/index");

async function getMoviesAll(page, pageSize) {
	try {
		const offset = (page - 1) * pageSize;
		const movies = await Movie.findAll({
			limit: pageSize,
			offset,
		});

		const totalCount = await Movie.count();
		const totalPages = Math.ceil(totalCount / pageSize);

		return {
			page: page,
			results: movies,
			total_pages: totalPages,
			total_results: totalCount,
		};
	} catch (error) {
		console.error("Error al obtener películas:", error);
		throw new Error("Unable to get movies");
	}
}

module.exports = {
	getMoviesAll,
};
