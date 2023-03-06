import mongoose from "mongoose";

export default class Database {
	async connect() {
		try {
			await mongoose.connect(
                `mongodb+srv://${process.env.MONGODB_ATLAS_USER}:${process.env.MONGODB_ATLAS_PASS}@cluster0.yfgkpdj.mongodb.net/?retryWrites=true&w=majority`
            );
			console.log("Connected to database 👋");
		} catch (error) {
			throw new Error("Error connect to database");
		}
	}
}

mongoose.connection.on("error", () => {
	throw new Error("Error during connection with database");
});
