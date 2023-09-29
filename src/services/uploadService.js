const path = require("path");
const { put } = require("@vercel/blob");

async function upload(file, title) {
	try {
		const fileExtension = path.extname(file.originalname);

		if (!path.extname(title)) {
			title += fileExtension;
		}

		const uploadedFile = await put(title, file.buffer, {
			access: "public",
			addRandomSuffix: true,
		});

		return uploadedFile;
	} catch (error) {
		throw new Error("Error en la carga del archivo o creación de película");
	}
}

module.exports = upload;
