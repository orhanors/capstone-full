import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { apiCall } from "../api/api";
import { IProduct } from "../../types/product";
import { IError } from "../../types/error.d";
import { IProductMetadata, IProductResponse } from "../../types/product.d";

interface InitialState {
	data: IProduct[];
	metadata?: IProductMetadata;
	errorMessage: IError | null;
	loading: boolean;
}

const initialState: InitialState = {
	data: [],
	errorMessage: null,
	loading: false,
};

const productsSlice = createSlice({
	name: "products",
	initialState,
	reducers: {
		requested: (state) => ({
			...state,
			loading: true,
		}),
		success: (state, action: PayloadAction<IProductResponse>) => ({
			...state,
			loading: false,
			isLoggedIn: true,
			data: [...action.payload.data],
			metadata: action.payload.metadata,
		}),

		failed: (state, action: PayloadAction<IError>) => ({
			...state,
			loading: false,
			errorMessage: action.payload,
		}),
	},
});

export const { requested, success, failed } = productsSlice.actions;

export default productsSlice.reducer;

export const getMainProducts = (currentPage: number = 1, limit: number = 8) =>
	apiCall({
		url: `${process.env.REACT_APP_BE_URL}/products?page=${currentPage}&limit=${limit}`,
		onStart: requested.type,
		onSuccess: success.type,
		onError: failed.type,
	});
