import { ICartItem } from "./cart";

export interface IOrder {
	user: string;
	products: Array<ICartItem>;
	total: number;
}
