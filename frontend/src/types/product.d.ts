import { IUser } from "./user";
import { IReview } from "./review.d";

export interface IProductResponse {
	metadata: IProductMetadata;
	data: IProduct[];
}

export interface IProductMetadata {
	count: number;
}
export interface IProduct extends IProductDetails {
	_id: string;
	images: Image[];
	reviews: IReview[];
	seller: IUser;
	createdAt: string;
	updatedAt: string;
}

export interface IProductDetails {
	name: string;
	brand: string;
	description: string;
	price: number;
	quantity: number;
	category: string;
	slug: string;
	type: string;
}

interface Image {
	_id: string;
	url: string;
	id: string;
}
