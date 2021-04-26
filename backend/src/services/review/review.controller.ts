import { Request, Response } from "express";
import User from "../user/user.schema";
import ApiError from "../../utils/errors/ApiError";
import Review from "./review.schema";
import Product from "../product/product.schema";

export const addProductReview = async (req: Request, res: Response) => {
	const user = req.user;
	const { productId } = req.params;
	const newReview = new Review({
		user: user._id,
		to: "product",
		...req.body,
	});
	newReview
		.save()
		.then(async (review) => {
			const foundUser = await User.findById(user._id);
			if (!foundUser) throw new ApiError(404, "User Not Found!");
			const foundProduct = await Product.findById(productId);
			foundUser.productReviews.push(review._id);
			foundProduct.reviews.push(review._id);

			Promise.all([foundUser.save(), foundProduct.save()]);

			res.status(201).send("Ok");
		})
		.catch((e) => {
			throw new ApiError(500, "Internal Server Error");
		});
};
export const addArticleReview = async (req: Request, res: Response) => {};
export const getProductReviews = async (req: Request, res: Response) => {
	const { productId } = req.params;
	const product = await Product.findById(productId).populate({
		path: "reviews",
		populate: { path: "user" },
	});

	if (!product) throw new ApiError(500, "Internal Server Error!");
	res.status(200).send(product.reviews);
};
export const getArticleReviews = async (req: Request, res: Response) => {};
