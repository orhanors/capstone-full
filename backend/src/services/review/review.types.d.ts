import { Document } from "mongoose";

export interface IReview extends Document {
	rate: number;
	comment: string;
	to: "product" | "article";
	user: string;
	title: string;
}
