import { Request, Response } from "express";
import User from "./user.schema";
import ApiError from "../../utils/errors/ApiError";

export const getCurrentUser = async (req: Request, res: Response) => {
	res.status(200).send(req.user);
};

export const editUserProfile = async (req: Request, res: Response) => {
	const user = req.user;

	const updatedUser = await User.findOneAndUpdate(
		{ _id: user._id },
		{ $set: { ...req.body } },
		{ new: true }
	);

	console.log("updatedUser: ", updatedUser);
	if (!updatedUser) throw new ApiError(404, "User Not Found!");
	res.status(201).send(updatedUser);
};
