import { Model, model, Schema } from "mongoose";
import { IProduct } from "./product.types.d";
import { PRODUCT_CATEGORIES, PRODUCT_TYPES } from "../../settings/constants";

const ProductSchema: Schema = new Schema(
	{
		name: { type: String },
		description: { type: String },
		price: { type: Number },
		brand: { type: String },
		quantity: { type: Number },
		category: {
			type: String,
			enum: [...PRODUCT_CATEGORIES],
			default: PRODUCT_CATEGORIES[0],
		},
		type: {
			type: String,
			enum: [...PRODUCT_TYPES],
			default: PRODUCT_TYPES[0],
		},
		images: [{ url: String, id: String }],
		seller: { type: Schema.Types.ObjectId, ref: "User" },
		slug: { type: String, lowercase: true, unique: true },
		reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
		reviewAverage: { type: Number, default: 5 },
	},
	{ timestamps: true }
);

const Product: Model<IProduct> = model<IProduct>("Product", ProductSchema);

export default Product;
