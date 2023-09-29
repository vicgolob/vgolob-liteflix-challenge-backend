const express = require("express");

const { sequelize, Movie } = require("./models");

const app = express();
const port = process.env.PORT ?? 5000;

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.get("/movies", async (req, res) => {
	let { page, pageSize } = req.query;
	if (!page) {
		page = 1;
	}
	if (!pageSize) {
		pageSize = 5;
	}
	const offset = (page - 1) * pageSize;

	try {
		const movies = await Movie.findAll({
			limit: pageSize,
			offset,
		});

		const totalCount = await Movie.count();

		const totalPages = Math.ceil(totalCount / pageSize);

		const response = {
			page: page,
			results: movies,
			total_pages: totalPages,
			total_results: totalCount,
		};

		res.json(response);
	} catch (error) {
		console.error("DEBUG:: GET /movies - Error:", error);
		res.status(500).json({ error: "Unable to get movies" });
	}
});

app.listen(port, async () => {
	console.log(`Server is listening on port ${port}`);
	try {
		await sequelize.authenticate();
		await sequelize.sync({ force: false });
		console.log("Connection has been established successfully.");
	} catch (error) {
		console.error("Unable to connect to the database:", error);
	}
});
