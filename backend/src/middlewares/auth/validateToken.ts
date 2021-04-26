import { Request, Response, NextFunction } from "express";
import { UserModel } from "../../services/user";
import { verifyJWT } from "../../utils/auth/jwt";
import ApiError from "../../utils/errors/ApiError";
import { logger } from "../../utils/logger/winston";

export const validateToken = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		let token = req.cookies.token;
		const decoded = await verifyJWT(token);

		const user = await UserModel.findOne({
			//@ts-ignore
			_id: decoded._id,
		});

		if (!user) {
			throw new ApiError(401, "Unauthorized!");
		}

		//req.token = token;
		req.user = user;

		next();
	} catch (error) {
		//TODO this could be 500
		next(new ApiError(401, "Unauthorized"));
		logger.error(error);
		// next(error);
	}
};
