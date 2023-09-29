const express = require("express");
const multer = require("multer");

const { sequelize } = require("./models");
const router = require("./routes/index");

const app = express();
const port = process.env.PORT ?? 5000;

const storage = multer.memoryStorage();
const upload = multer({ storage });

app.use(upload.single("file"));

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.use("/api", router);

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
