import express from "express";
import passport from "passport";
import { signup, login, refreshTokenHandler, logout } from "./auth.controllers";
import tryCatchWrapper from "../../utils/errors/tryCatchWrapper";
import handleTokens from "../../middlewares/auth/tokenHandling";
import { validateToken } from "../../middlewares/auth/validateToken";
const authRouter = express.Router();

authRouter.post("/login", tryCatchWrapper(login));
authRouter.post("/signup", tryCatchWrapper(signup));

authRouter.get("/logout", validateToken, tryCatchWrapper(logout));

authRouter.post("/refreshToken", tryCatchWrapper(refreshTokenHandler));

// 😇 OAUTH

authRouter.get(
	"/facebookLogin",
	passport.authenticate("facebook", { scope: ["email"] })
);
authRouter.get(
	"/facebookRedirect",
	passport.authenticate("facebook"),
	handleTokens
);

authRouter.get(
	"/googleLogin",
	passport.authenticate("google", { scope: ["profile", "email"] })
);

authRouter.get(
	"/googleRedirect",
	passport.authenticate("google"),
	handleTokens
);
export default authRouter;
