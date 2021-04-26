import { IProduct } from "./product";

export interface IShoppingCart {
	_id: string;
	user: string;
	products: ICartItem[];
	total: number;
	createdAt: string;
	updatedAt: string;
}

export interface ICartItem {
	_id: string;
	product: IProduct;
	qty: number;
}
