import { Request, Response, NextFunction, Router, Application } from "express";
import { logger } from "../../utils/logger/winston";
//import logger from "../../utils/logger/winston";

interface IError extends Error {
	message: string;
	httpStatusCode: number;
	stack?: string;
}
const badRequestHandler = (
	err: IError,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (err.httpStatusCode === 400) {
		return res
			.status(400)
			.json({ errors: err.message || "Bad Request!", code: 400 });
	}
	next(err);
};

const notFoundHandler = (
	err: IError,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (err.httpStatusCode === 404) {
		logger.error(err);
		return res.status(404).json({
			errors: err.message ? err.message : "Not Found!",
			code: 404,
		});
	}
	next(err);
};

const unAuthorizedHandler = (
	err: IError,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (err.httpStatusCode === 401) {
		return res
			.status(401)
			.json({ errors: err.message || "Unauthorized!", code: 401 });
	}
	next(err);
};

const unSuppertedMediaType = (
	err: IError,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (err.httpStatusCode === 415) {
		return res.status(401).json({
			errors: err.message || "Unsupported Media Type!",
			code: 415,
		});
	}
	next(err);
};
const forbiddenHandler = (
	err: IError,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (err.httpStatusCode === 403) {
		return res
			.status(403)
			.json({ errors: err.message || "Forbidden!", code: 403 });
	}
	next(err);
};

const genericHandler = (
	err: IError,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (!res.headersSent) {
		logger.error(err);

		if (err.name === "CastError") {
			res.status(400).json({
				errors: "Not Found!",
				code: 400,
			});
		}
		return res.status(err.httpStatusCode || 500).json({
			errors: err.message || "Internal Server Error!",
			code: 500,
		});
	}
};

const handleErrors = function (server: Application) {
	server.use(badRequestHandler);
	server.use(notFoundHandler);
	server.use(forbiddenHandler);
	server.use(unSuppertedMediaType);
	server.use(unAuthorizedHandler);
	server.use(genericHandler);
};

export default handleErrors;
