import { model, Model, Schema } from "mongoose";
import { IReview } from "./review.types.d";

const ReviewSchema = new Schema(
	{
		rate: {
			type: Number,
			min: [1, "Rate must be minimun 1"],
			max: [10, "Rate must be maximum 10"],
			default: 1,
		},
		comment: { type: String },
		user: { type: Schema.Types.ObjectId, ref: "User" },
		title: { type: String },
		to: { type: String, default: "product" },
	},
	{ timestamps: true }
);

const Review: Model<IReview> = model<IReview>("Review", ReviewSchema);

export default Review;
