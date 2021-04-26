import express, { Application } from "express";
import passport from "passport";
import services from "../services/index";
import { corsOptions } from "../utils/server/corsOptions";
const cors = require("cors");
const cookieParser = require("cookie-parser");

const initialSetup = (server: Application) => {
	server.set("trust proxy", 1);
	server.use(express.json());
	server.use(cors(corsOptions));
	server.use(passport.initialize());
	server.use(cookieParser());
	server.use("/api", services);
};

export default initialSetup;
