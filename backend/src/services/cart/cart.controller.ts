import { Request, Response } from "express";
import { Cart } from ".";
import ApiError from "../../utils/errors/ApiError";
import { IUser } from "../user";

//When user sign up  we generate a cart for him/her
export const addProductToCart = async (req: Request, res: Response) => {
	const user = req.user as IUser;
	const userId = user._id;
	const { productId, price } = req.body;

	const cart = await Cart.findOne({ user: userId });

	if (!cart) throw new ApiError(404, "Cart not found");

	const updatedCart = await cart.addProductToCart(productId, price);

	res.status(201).send(updatedCart);
};

export const addMultipleProducts = async (req: Request, res: Response) => {
	const user = req.user as IUser;
	const userId = user._id;
	const { productId, price, qty } = req.body;

	const cart = await Cart.findOne({ user: userId });

	if (!cart) throw new ApiError(404, "Cart not found");

	const updatedCart = await cart.addProductToCart(productId, price, qty);

	res.status(201).send(updatedCart);
};
export const removeProductFromCart = async (req: Request, res: Response) => {
	const user = req.user as IUser;
	const userId = user._id;
	const { productId, price, qty } = req.body;

	const cart = await Cart.findOne({ user: userId });

	if (!cart) throw new ApiError(404, "Cart not found");

	const updatedCart = await Cart.findOneAndUpdate(
		{
			_id: cart._id,
			products: { $elemMatch: { product: { $eq: productId } } },
		},
		{
			$inc: { total: -(price * qty) },
			$pull: { products: { product: productId } },
		},
		{ new: true }
	).populate("products.product");

	res.status(201).send(updatedCart);
};

export const decreaseProductQty = async (req: Request, res: Response) => {
	const user = req.user as IUser;
	const userId = user._id;
	const { productId, price } = req.body;

	const cart = await Cart.findOne({ user: userId });

	if (!cart) throw new ApiError(404, "Cart not found");

	const updatedCart = await cart.deleteProductFromCart(productId, price);

	if (!updatedCart) throw new ApiError(404, "Product not found");

	res.status(201).send(updatedCart);
};

export const getUserCart = async (req: Request, res: Response) => {
	const user = req.user as IUser;

	const userId = user._id;

	const userCart = await Cart.findOne({ user: userId }).populate(
		"products.product"
	);

	if (!userCart) throw new ApiError(404, "Cart not found");
	res.status(201).send(userCart);
};
