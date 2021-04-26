import express from "express";
import { validateToken } from "../../middlewares/auth/validateToken";
import tryCatchWrapper from "../../utils/errors/tryCatchWrapper";
import { editUserProfile, getCurrentUser } from "./user.controller";

const userRouter = express.Router();

userRouter.get("/me", validateToken, tryCatchWrapper(getCurrentUser));
userRouter.put("/me/edit", validateToken, tryCatchWrapper(editUserProfile));

export default userRouter;
