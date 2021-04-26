import { Document, ObjectId } from "mongoose";
import { ICartProduct } from "../cart/cart.types.d";

export interface IOrder extends Document {
	user: string | ObjectId;
	products: Array<ICartProduct>;
	total: number;
}
