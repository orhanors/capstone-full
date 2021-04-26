import { Request, Response, NextFunction } from "express";
import { USER_ROLES } from "../../settings/constants";
import ApiError from "../../utils/errors/ApiError";
import { IUser } from "../../services/user/user.types.d";

export const validateSeller = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const user = req.user as IUser;
		const userRole = user.role;
		if (userRole !== USER_ROLES.seller)
			throw new ApiError(400, "User must be seller");
		next();
	} catch (error) {
		next(error);
	}
};
