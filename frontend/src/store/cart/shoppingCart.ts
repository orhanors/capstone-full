import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { apiCall } from "../api/api";
import { IProduct } from "../../types/product";
import { IError } from "../../types/error.d";
import { IShoppingCart } from "../../types/cart.d";
import { StateWithHistory } from "redux-undo";

interface CartInitialState {
	data: IShoppingCart | null;
	errorMessage: IError | null;
	loading: boolean;
}

const initialState: CartInitialState = {
	data: null,
	errorMessage: null,
	loading: false,
};

const productsSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		requested: (state) => ({
			...state,
			loading: true,
		}),

		addToCart: (state, action: PayloadAction<IShoppingCart>) => ({
			...state,
			loading: false,
			isLoggedIn: true,
			data: action.payload,
		}),
		getUserCart: (state, action: PayloadAction<IShoppingCart>) => ({
			...state,
			loading: false,
			isLoggedIn: true,
			data: action.payload,
		}),
		decreaseItem: (state, action: PayloadAction<IShoppingCart>) => ({
			...state,
			loading: false,
			isLoggedIn: true,
			data: action.payload,
		}),
		removeItem: (state, action: PayloadAction<IShoppingCart>) => ({
			...state,
			loading: false,
			isLoggedIn: true,
			data: action.payload,
		}),

		failed: (state, action: PayloadAction<IError>) => ({
			...state,
			loading: false,
			errorMessage: action.payload,
		}),
	},
});

export const {
	requested,
	addToCart,
	decreaseItem,
	removeItem,
	failed,
	getUserCart,
} = productsSlice.actions;

export default productsSlice.reducer;

export const addProductToCart = (productId: string, price: number) =>
	apiCall({
		url: `${process.env.REACT_APP_BE_URL}/cart/add`,
		method: "post",
		data: { productId, price },
		onStart: requested.type,
		onSuccess: addToCart.type,
		onError: failed.type,
	});

export const addMultipleProductToCart = (
	productId: string | undefined,
	price: number | undefined,
	qty: number
) =>
	apiCall({
		url: `${process.env.REACT_APP_BE_URL}/cart/addMultiple`,
		method: "post",
		data: { productId, price, qty },
		onStart: requested.type,
		onSuccess: addToCart.type,
		onError: failed.type,
	});
export const decreaseItemFromCart = (productId: string, price: number) =>
	apiCall({
		url: `${process.env.REACT_APP_BE_URL}/cart/decrease`,
		method: "post",
		data: { productId, price },
		onStart: requested.type,
		onSuccess: decreaseItem.type,
		onError: failed.type,
	});

export const removeItemFromCart = (
	productId: string,
	price: number,
	qty: number
) =>
	apiCall({
		url: `${process.env.REACT_APP_BE_URL}/cart/remove`,
		method: "post",
		data: { productId, price, qty },
		onStart: requested.type,
		onSuccess: removeItem.type,
		onError: failed.type,
	});

export const getShoppingCart = () =>
	apiCall({
		url: `${process.env.REACT_APP_BE_URL}/cart/user`,
		onStart: requested.type,
		onSuccess: getUserCart.type,
		onError: failed.type,
	});
