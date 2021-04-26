import { IUser } from "./user.d";

export interface IAddReview {
	rate: number;
	comment: string;
	to: "product" | "article";
	title?: string;
}
export interface IReview extends IAddReview {
	_id: string;
	user?: IUser;
}
