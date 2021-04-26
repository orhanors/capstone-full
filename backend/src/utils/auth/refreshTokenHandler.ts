import { verifyRefreshToken, generateJWT, generateRefreshJWT } from "./jwt";
import ApiError from "../errors/ApiError";
import { UserModel } from "../../services/user";

const handleRefreshToken = async (oldRefreshToken: string) => {
	//check if the old token is valid
	const decoded = await verifyRefreshToken(oldRefreshToken);
	//@ts-ignore
	//jwt.verify returns payload. We can check the user existince with _id
	const user = await UserModel.findOne({ _id: decoded._id });

	if (!user) throw new ApiError(403, "Access is forbidden");

	const currentRefreshToken = user.refreshTokens.find(
		(t) => t.token === oldRefreshToken
	);

	if (!currentRefreshToken)
		throw new ApiError(403, "Refresh token is missing or invalid");

	const newAccessToken = await generateJWT({ _id: user._id });
	const newRefreshToken = await generateRefreshJWT({ _id: user._id });

	user.refreshTokens.push({ token: newRefreshToken });
	await user.save();

	return { token: newAccessToken, refreshToken: newRefreshToken };
};

export { handleRefreshToken };
