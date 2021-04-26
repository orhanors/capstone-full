import { Router } from "express";
import { validateToken } from "../../middlewares/auth/validateToken";
import tryCatchWrapper from "../../utils/errors/tryCatchWrapper";
import {
	addArticleReview,
	addProductReview,
	getArticleReviews,
	getProductReviews,
} from "./review.controller";

const reviewRouter = Router();

reviewRouter.post(
	"/product/:productId",
	validateToken,
	tryCatchWrapper(addProductReview)
);
reviewRouter.get("/product/:productId", tryCatchWrapper(getProductReviews));
reviewRouter.post(
	"/article/:articleId",
	validateToken,
	tryCatchWrapper(addArticleReview)
);
reviewRouter.get("/product/:articleId", tryCatchWrapper(getArticleReviews));

export default reviewRouter;
