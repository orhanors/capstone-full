import { Request, Response, NextFunction } from "express";
import { clearHash } from "../../utils/cache";

export const cleanCache = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	next(); //After executing clean the cache
	clearHash(req.user?.id);
};
