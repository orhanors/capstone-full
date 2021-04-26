import { Request, Response } from "express";
import { IUser, UserModel } from "../user";
import ApiError from "../../utils/errors/ApiError";
import { generateTokens } from "../../utils/auth/jwt";
import { REFRESH_TOKEN_PATH } from "../../settings/constants";
import { handleRefreshToken } from "../../utils/auth/refreshTokenHandler";
import { Cart } from "../cart";

export const signup = async (req: Request, res: Response) => {
	const { email } = req.body;

	const foundUserWithEmail = await UserModel.findOne({ email });

	if (foundUserWithEmail) {
		throw new ApiError(400, "Email already exist!");
	}
	const newUser = new UserModel({ ...req.body });
	await Cart.generateNewCart(newUser._id);
	await newUser.save();

	res.status(201).send(newUser);
};

export const login = async (req: Request, res: Response) => {
	const { email, password } = req.body;

	const user = await UserModel.findByCredentials(email, password);

	if (!user) throw new ApiError(400, "Invalid email or password");

	const tokens = await generateTokens(user);

	res.cookie("token", tokens.token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "development" ? false : true,
		sameSite: process.env.NODE_ENV === "development" ? false : "none",
	});
	res.cookie("refreshToken", tokens.refreshToken, {
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
	res.status(201).send(user);
};

export const refreshTokenHandler = async (req: Request, res: Response) => {
	const oldRefreshToken = req.cookies.refreshToken;
	if (!oldRefreshToken) throw new ApiError(400, "Refresh token not found!");

	const newTokens = await handleRefreshToken(oldRefreshToken);

	res.cookie("token", newTokens.token);
	res.cookie("refreshToken", newTokens.refreshToken);
	res.status(200).send("Ok");
};

//NOTE Logout from all devices. It deletes all refresh token
export const logout = async (req: Request, res: Response) => {
	const user = req.user as IUser;
	user.refreshTokens = [];
	await user.save();
	res.clearCookie("token");
	res.clearCookie("refreshToken");
	res.cookie("isAuthUser", false);
	res.send("OK");
};
