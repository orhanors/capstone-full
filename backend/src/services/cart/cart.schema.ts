import { Model, Schema, model } from "mongoose";
import { ICart, ICartModel } from "./cart.types.d";
import { ICartProduct } from "./cart.types.d";

const CartSchema: Schema = new Schema(
	{
		user: { type: Schema.Types.ObjectId, ref: "User" },
		products: [
			{
				product: { type: Schema.Types.ObjectId, ref: "Product" },
				qty: { type: Number },
			},
		],
		total: { type: Number, default: 0 },
	},
	{ timestamps: true }
);

CartSchema.statics.generateNewCart = async function (
	userId: string | Schema.Types.ObjectId
) {
	const newCart = new Cart({
		user: userId,
		products: [],
		total: 0,
	});

	await newCart.save();
};

CartSchema.methods.addProductToCart = async function (
	productId: Schema.Types.ObjectId | string,
	price: number,
	qty?: number
): Promise<ICart | null | undefined> {
	let cart = this as ICart;

	const calculateTotal = (price: number) => {
		if (qty) {
			return qty * price;
		} else {
			return price;
		}
	};
	const populateProduct = (): Promise<ICart> => {
		return new Promise((res, rej) => {
			cart.populate("products.product", (err, response) => {
				if (err) {
					rej(err);
				} else {
					res(response);
				}
			});
		});
	};
	const foundProduct = cart.products.find(
		(product) => product.product.toString() === productId.toString()
	);

	if (!foundProduct) {
		const newProduct: ICartProduct = { product: productId, qty: qty || 1 };
		cart.products.push(newProduct);

		cart.total += calculateTotal(price);
		await cart.save();
		cart = await populateProduct();
		return cart;
	} else {
		const updatedQty = await Cart.findOneAndUpdate(
			{
				_id: cart._id,
				products: { $elemMatch: { product: { $eq: productId } } },
			},
			{
				$inc: {
					"products.$.qty": qty || 1,
					total: calculateTotal(price),
				},
			},
			{ new: true }
		).populate("products.product");
		return updatedQty;
	}
};

CartSchema.methods.deleteProductFromCart = async function (
	productId: Schema.Types.ObjectId | string,
	price: number
): Promise<ICart | null | boolean> {
	const cart = this as ICart;

	const foundProduct = cart.products.find(
		(product) => product.product.toString() === productId?.toString()
	);

	if (!foundProduct) return false;
	if (foundProduct.qty === 1) {
		const updatedQty = await Cart.findOneAndUpdate(
			{
				_id: cart._id,
				products: { $elemMatch: { product: { $eq: productId } } },
			},
			{
				$inc: { total: -price },
				$pull: { products: { product: productId } },
			},
			{ new: true }
		).populate("products.product");
		return updatedQty;
	}
	const updatedQty = await Cart.findOneAndUpdate(
		{
			_id: cart._id,
			products: { $elemMatch: { product: { $eq: productId } } },
		},
		{ $inc: { "products.$.qty": -1, total: -price } },
		{ new: true }
	).populate("products.product");

	return updatedQty;
};
const Cart: ICartModel = model<ICart, ICartModel>("Cart", CartSchema);

export default Cart;
