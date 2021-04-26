import passport from "passport";
import { Cart } from "../../services/cart";
import { UserModel } from "../../services/user";
import { generateTokens } from "../../utils/auth/jwt";
import {
	generateUserFromFacebook,
	generateUserFromGoogle,
} from "../../utils/auth/oauthUsers";
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStregy = require("passport-facebook").Strategy;

const {
	googleApiSecret,
	googleApiKey,
	facebookApiSecret,
	facebookApiKey,
	oauthGoogleRedirectUrl,
	oauthFacebookRedirectUrl,
} = require("../../config/keys");

passport.use(
	"google",
	new GoogleStrategy(
		{
			clientID: googleApiKey,
			clientSecret: googleApiSecret,
			callbackURL: oauthGoogleRedirectUrl,
		},
		async (
			accessToken: any,
			refreshToken: any,
			profile: any,
			done: any
		) => {
			try {
				const user = await UserModel.findOne({ googleId: profile.id });

				if (user) {
					const tokens = await generateTokens(user);
					return done(null, { user, tokens });
				}

				const newUser = new UserModel(generateUserFromGoogle(profile));
				await Cart.generateNewCart(newUser._id);
				await newUser.save();
				const tokens = await generateTokens(newUser);
				done(null, { user: newUser, tokens });
			} catch (error) {
				console.log("Google passportjs error: ", error);
				done(error, false);
			}
		}
	)
);

passport.use(
	"facebook",
	new FacebookStregy(
		{
			clientID: facebookApiKey,
			clientSecret: facebookApiSecret,
			callbackURL: oauthFacebookRedirectUrl,
			profileFields: ["id", "displayName", "photos", "emails", "name"],
		},
		async (
			accessToken: any,
			refreshToken: any,
			profile: any,
			done: any
		) => {
			try {
				const user = await UserModel.findOne({
					facebookId: profile.id,
				});

				if (user) {
					const tokens = await generateTokens(user);
					return done(null, { user, tokens });
				}

				const newUser = new UserModel(
					generateUserFromFacebook(profile)
				);
				await Cart.generateNewCart(newUser._id);
				await newUser.save();
				const tokens = await generateTokens(newUser);
				done(null, { user: newUser, tokens });
			} catch (error) {
				console.log("Facebook passportjs error: ", error);
				done(error, false);
			}
		}
	)
);

passport.serializeUser(function (user, next) {
	next(null, user);
});
