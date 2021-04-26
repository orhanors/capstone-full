import winston, { format } from "winston";
import { MongoDB } from "winston-mongodb";
const { mongodbUri } = require("../../config/keys");
require("winston-mongodb");
const { combine, timestamp, printf } = format;

const logger = winston.createLogger({
	level: "error",
	format: combine(
		format.errors({ stack: true }), // log the full stack
		timestamp(), // get the time stamp part of the full log message
		printf(({ level, message, timestamp, stack }) => {
			// formating the log outcome to show/store
			return `${level === "error" ? "❌" : "✅"} ${level}: ${message} ${
				level === "error" ? "| 🕗 " + timestamp.substring(0, 19) : ""
			}   ${"\n"} ${level === "error" ? stack : ""}`;
		}),
		format.metadata() // >>>> ADD THIS LINE TO STORE the ERR OBJECT IN META field
	),
	transports: [
		new winston.transports.Console({ level: "info" }),
		// new winston.transports.File({ filename: "logs.log", level: "info" }),
	],
});

/**
 * this will just write errors to DB
 */
logger.add(
	new winston.transports.MongoDB({
		db: mongodbUri,
		collection: "logs",
		options: { useUnifiedTopology: true },
		level: "error",
	})
);

export { logger };
