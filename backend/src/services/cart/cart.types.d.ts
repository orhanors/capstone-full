import { Document, ObjectId, Model } from "mongoose";

type GenerateNewCart = (userId: string | ObjectId) => void;

export interface ICartProduct {
	product: ObjectId | string;
	qty: number;
}

export interface ICart extends Document {
	user: ObjectId | string;
	products: Array<ICartProduct>;
	total: number;
	addProductToCart(
		productId: string | ObjectId,
		price: number,
		qty?: number
	): Promise<ICart | null>;
	deleteProductFromCart(
		productId: string | ObjectId,
		price: number
	): Promise<ICart | null | boolean>;
}

export interface ICartModel extends Model<ICart> {
	generateNewCart: GenerateNewCart;
}
