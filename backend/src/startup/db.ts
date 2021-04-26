import mongoose from "mongoose";
import { logger } from "../utils/logger/winston";
const { mongodbUri } = require("../config/keys");
const dbConnection = () => {
	mongoose
		.connect(mongodbUri, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then(() => logger.info("🚀 Connected to DB..."))
		.catch((ex) => logger.error("❌ DB connection err: ", ex));
};

export default dbConnection;
