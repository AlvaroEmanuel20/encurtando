import mongoose from "mongoose";

export default class Database {
	async connect() {
		try {
			await mongoose.connect(`${process.env.DB_URL}${process.env.DB_PORT}`);
			console.log("Connected to database 👋");
		} catch (error) {
			throw new Error("Error connect to database");
		}
	}
}

mongoose.connection.on("error", () => {
	throw new Error("Error during connection with database");
});
