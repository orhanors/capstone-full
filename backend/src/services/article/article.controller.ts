import { Request, Response } from "express";
import { Article } from ".";
import { ImageProperties } from "../product/product.types";
import ApiError from "../../utils/errors/ApiError";
export const addNewArticle = async (req: Request, res: Response) => {
	const user = req.user;
	const newArticle = new Article({
		author: user._id,
		...req.body,
	});

	await newArticle.save();
	res.status(201).send("Ok");
};

export const uploadArticleImage = async (req: Request, res: Response) => {
	const image = req.file as ImageProperties;

	res.status(201).send({ url: image.path });
};

export const getArticleBySlug = async (req: Request, res: Response) => {
	const { slug } = req.params;

	const foundArticle = await Article.findOne({ slug }, { __v: 0 }).populate(
		"author"
	);

	if (!foundArticle) throw new ApiError(404, "Article not found!");
	res.status(200).send(foundArticle);
};
export const getArticles = async (req: Request, res: Response) => {
	let { page = 1, limit = 10 } = req.query;

	page = Number(page);
	limit = Number(limit);
	const articles = await Article.find({}, { __v: 0 })
		.populate("author")
		.limit(limit)
		.skip((page - 1) * limit);

	if (!articles) throw new ApiError(404, "Articles not found!");
	res.status(200).send(articles);
};
export const getLastArticles = async (req: Request, res: Response) => {
	let { limit = 5 } = req.params;
	limit = Number(limit);

	const articles = await Article.find({}, { __v: 0 })
		.populate("author")
		.limit(limit)
		.sort([["createdAt", 1]]);

	if (!articles) throw new ApiError(404, "Articles not found!");
	res.status(200).send(articles);
};

export const deleteArticle = async (req: Request, res: Response) => {};

export const editArticle = async (req: Request, res: Response) => {};
