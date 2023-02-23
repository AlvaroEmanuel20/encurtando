import express from "express";
import "dotenv/config";
import Database from "./lib/Database";
import { router } from "./routes/routes";
import cors from "cors";

const app = express();
const database = new Database();
const PORT = process.env.PORT || 8000;

database.connect();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
	try {
		res.json({
            app: "Encurtando 👋",
            msg: "Welcome to URL Shortener Encurtando.",
        });
	} catch (error) {
		res.status(500).json({
			msg: "Internal server error",
			error,
		});
	}
});

app.use("/", router);

app.listen(PORT, () => {
	console.log(`Server running in ${process.env.APP_URL} 👋`);
});
