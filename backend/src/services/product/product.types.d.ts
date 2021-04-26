import { Document, ObjectId } from "mongoose";

export interface IProduct extends Document {
	name: string;
	description: string;
	price: number;
	brand: string;
	quantity: number;
	seller: string | ObjectId;
	category: string;
	type: string;
	images: Image[];
	slug: string;
}

export interface ImageProperties {
	fieldname: string;
	originalname: string;
	encoding: string;
	mimetype: string;
	path: string;
	size: number;
	filename: string;
}

interface Image {
	url: string;
	id: string;
}
