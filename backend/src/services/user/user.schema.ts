import { model, Schema } from "mongoose";
import { USER_ROLES, USER_DEFAULT_AVATAR } from "../../settings/constants";
import { logger } from "../../utils/logger/winston";
import { IUser, IUserModel } from "./user.types";
import Review from "../review/review.schema";
const bcrypt = require("bcrypt");

const UserSchema: Schema = new Schema(
	{
		name: { type: String },
		surname: { type: String },
		email: { type: String },
		password: { type: String },
		role: {
			type: String,
			enum: [USER_ROLES.admin, USER_ROLES.seller, USER_ROLES.user],
			default: USER_ROLES.user,
		},
		facebookId: { type: String },
		googleId: { type: String },
		refreshTokens: [{ token: String }],
		image: {
			type: String,
			default: USER_DEFAULT_AVATAR,
		},

		cart: { type: Schema.Types.ObjectId, ref: "Cart" },
		productReviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
		articleReviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
		phone: {
			type: String,
		},
		address: {
			country: String,
			city: String,
			line1: String,
			line2: String,
			postalCode: Number,
		},
	},
	{ timestamps: true }
);

UserSchema.pre<IUser>("save", async function (next) {
	try {
		if (this.isModified("password")) {
			const salt = await bcrypt.genSalt(10);
			this.password = await bcrypt.hash(this.password, salt);
		}
	} catch (error) {
		logger.error(error);
		next(error);
	}
});

UserSchema.statics.findByCredentials = async function (
	email: String,
	password: string
): Promise<null | any> {
	const user: any = await this.findOne({ email });

	if (user) {
		if (!user.password) return null; //if user logs in with oauth
		const isMatch = await bcrypt.compare(password, user.password);
		if (isMatch) return user;
		else return null;
	} else return null;
};

UserSchema.methods.toJSON = function () {
	const user = this;
	const userObject: any = user.toObject();

	delete userObject.password;
	delete userObject.__v;
	delete userObject.googleId;
	delete userObject.facebookId;
	delete userObject.refreshTokens;
	return userObject;
};
const User: IUserModel = model<IUser, IUserModel>("User", UserSchema);

export default User;
