import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { apiCall } from "../api/api";
import { IUserStore, IUser } from "../../types/user";
import { IProduct } from "../../types/product";
import { IError } from "../../types/error";

interface InitialState {
	data: IProduct[] | [];
	loading: boolean;
	errorMessage: IError | null;
}
const initialState: InitialState = {
	data: [],
	errorMessage: null,
	loading: false,
};

const slice = createSlice({
	name: "seller",
	initialState,
	reducers: {
		requested: (state) => ({
			...state,
			loading: true,
		}),
		success: (state, action: PayloadAction<IProduct[]>) => ({
			...state,
			loading: false,
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
	success,

	failed,
} = slice.actions;

export default slice.reducer;

export const getSellerProducts = () =>
	apiCall({
		url: `${process.env.REACT_APP_BE_URL}/products/seller`,
		onStart: requested.type,
		onSuccess: success.type,
		onError: failed.type,
	});
