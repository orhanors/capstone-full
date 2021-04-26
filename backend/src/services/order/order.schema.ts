import { model, Model, Schema } from "mongoose";
import { IOrder } from "./order.types";

const OrderSchema = new Schema(
	{
		user: { type: Schema.Types.ObjectId },
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

const Order: Model<IOrder> = model<IOrder>("Order", OrderSchema);

export default Order;
