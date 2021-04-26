import express from "express";
import initialSetup from "./startup/middlewares";
import dbConnection from "./startup/db";
import errorHandling from "./middlewares/error/errorHandling";
import { logger } from "./utils/logger/winston";
//import "./utils/cache";

const server = express();
require("./middlewares/auth/passport");
//require("./startup/optimization"); //optimize threads according to different machines
initialSetup(server); //Keeps initial middlewares
errorHandling(server);
dbConnection();
const port = process.env.PORT || 3001;
server.listen(port, () => {
	if (process.env.NODE_ENV === "production") {
		logger.info(`🚀 Server is running on CLOUD on PORT: , ${port}`);
	} else {
		logger.info(`🚀 Server is running LOCALLY on PORT: , ${port}`);
	}
});
