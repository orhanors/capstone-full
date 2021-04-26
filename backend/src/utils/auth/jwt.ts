import jwt from "jsonwebtoken";
import { IUser } from "../../services/user/user.types.d";
import { IPayload } from "./auth.types";
const { jwtSecret, jwtRefreshSecret } = require("../../config/keys");

const generateTokens = async (user: IUser) => {
	try {
		const newAccessToken = await generateJWT({ _id: user._id });
		const newRefreshToken: string | undefined = await generateRefreshJWT({
			_id: user._id,
		});

		user.refreshTokens = user.refreshTokens.concat({
			token: newRefreshToken,
		});

		await user.save();

		return { token: newAccessToken, refreshToken: newRefreshToken };
	} catch (error) {
		console.log("JWT authenticate error: ", error);
		throw new Error(error);
	}
};

const generateJWT = (payload: IPayload): Promise<string | undefined> =>
	new Promise((res, rej) => {
		jwt.sign(payload, jwtSecret, { expiresIn: "1h" }, (err, token) => {
			if (err) rej(err);
			res(token);
		});
	});

const generateRefreshJWT = (payload: IPayload): Promise<string | undefined> =>
	new Promise((res, rej) =>
		jwt.sign(
			payload,
			jwtRefreshSecret,
			{ expiresIn: "1 week" },
			(err, token) => {
				if (err) rej(err);
				res(token);
			}
		)
	);
const verifyJWT = (token: string) =>
	new Promise((res, rej) => {
		jwt.verify(token, jwtSecret, (err: any, decoded: any) => {
			if (err) rej(err);
			res(decoded);
		});
	});

const verifyRefreshToken = (token: string) =>
	new Promise((res, rej) =>
		jwt.verify(token, jwtRefreshSecret, (err: any, decoded: any) => {
			if (err) rej(err);
			res(decoded);
		})
	);

export {
	generateTokens,
	verifyJWT,
	verifyRefreshToken,
	generateJWT,
	generateRefreshJWT,
};
