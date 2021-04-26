import { Request, Response, NextFunction } from "express";
import { REFRESH_TOKEN_PATH } from "../../settings/constants";
import { logger } from "../../utils/logger/winston";
const { redirectUrl } = require("../../config/keys");
const handleTokens = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		console.log("process ENV:: ", process.env.NODE_ENV);
		console.log("url: ", redirectUrl);
		//@ts-ignore
		const { token, refreshToken } = req.user.tokens;
		res.cookie("token", token, {
			httpOnly: true,
			maxAge: 1500,
			secure: true,
			sameSite: "none",
		});
		res.cookie("refreshToken", refreshToken, {
			httpOnly: true,
			path: REFRESH_TOKEN_PATH,

			secure: process.env.NODE_ENV === "development" ? false : true,
			sameSite: process.env.NODE_ENV === "development" ? false : "none",
		});
		res.cookie("isAuthUser", true, {
			httpOnly: false,
			secure: process.env.NODE_ENV === "development" ? false : true,
			sameSite: process.env.NODE_ENV === "development" ? false : "none",
			maxAge: 900000,
		});
		res.redirect(redirectUrl);
	} catch (error) {
		logger.error(error);
		next(error);
	}
};

export default handleTokens;
