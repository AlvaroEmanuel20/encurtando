import mongoose from "mongoose";

export default class Database {
	async connect() {
		try {
			await mongoose.connect("mongodb://localhost:27017");
			console.log("Connected to database 👋");
		} catch (error) {
			throw new Error("Error connect to database");
		}
	}
}

mongoose.connection.on("error", () => {
	throw new Error("Error during connection with database");
});
