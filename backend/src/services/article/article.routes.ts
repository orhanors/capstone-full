import { Router } from "express";
import cloudinaryMulter from "../../middlewares/cloudinary/cloudinaryMulter";
import { validateToken } from "../../middlewares/auth/validateToken";
import tryCatchWrapper from "../../utils/errors/tryCatchWrapper";
import { ARTICLE_IMAGE_KEY } from "../../settings/constants";
import {
	addNewArticle,
	deleteArticle,
	editArticle,
	getArticles,
	getLastArticles,
	uploadArticleImage,
	getArticleBySlug,
} from "./article.controller";

const articleRouter = Router();

articleRouter.post("/new", validateToken, tryCatchWrapper(addNewArticle));
articleRouter.post(
	"/upload/image",
	validateToken,
	cloudinaryMulter.single(ARTICLE_IMAGE_KEY),
	tryCatchWrapper(uploadArticleImage)
);
//page,limit
articleRouter.get("/", tryCatchWrapper(getArticles));
articleRouter.get("/article/:slug", tryCatchWrapper(getArticleBySlug));
articleRouter.get("/latestArticles/:limit", tryCatchWrapper(getLastArticles));
articleRouter.delete(
	"/:articleId",
	validateToken,
	tryCatchWrapper(deleteArticle)
);
articleRouter.put("/:articleId", tryCatchWrapper(editArticle));

export default articleRouter;
