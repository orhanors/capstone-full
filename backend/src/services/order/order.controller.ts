import { Request, Response } from "express";
import { Cart } from "../cart";
import { Order } from ".";
import ApiError from "../../utils/errors/ApiError";
import { populateInstance } from "../../utils/mongoose/populate";

export const addNewOrder = async (req: Request, res: Response) => {
	const user = req.user;

	const shoppingCart = await Cart.findOne({ user: user._id });
	if (!shoppingCart) throw new ApiError(404, "Shopping Cart Not Found!");

	const newOrder = new Order({
		user,
		products: shoppingCart.products,
		total: shoppingCart.total,
	});

	shoppingCart.products = [];
	shoppingCart.total = 0;
	Promise.all([await newOrder.save(), await shoppingCart.save()])
		.then(async (resp) => {
			//resp = array of results
			resp.map(async (result) => {
				if (result.total !== 0) {
					const order = await populateInstance(
						result,
						"products.product"
					);
					res.status(201).send(order);
				}
			});
		})
		.catch((e) => {
			throw new ApiError(500, "Internal Server Error");
		});
};

export const getUserOrders = async (req: Request, res: Response) => {
	const user = req.user;

	const allOrders = await Order.find({ user: user._id }).populate(
		"products.product"
	);

	if (!allOrders) throw new ApiError(404, "Not Found!");
	res.status(200).send(allOrders);
};

export const getSingleOrder = async (req: Request, res: Response) => {
	const { orderId } = req.params;

	const order = await Order.findById(orderId).populate("products.product");

	if (!order) throw new ApiError(404, "Order not found!");

	res.status(200).send(order);
};

export const hasProductBoughtBefore = async (req: Request, res: Response) => {
	const user = req.user;
	const { productId } = req.params;

	const userOrders = await Order.find({
		user: user._id,
		"products.product": productId,
	});

	if (userOrders && userOrders.length > 0) return res.status(200).send(true);
	else return res.status(200).send(false);
};
