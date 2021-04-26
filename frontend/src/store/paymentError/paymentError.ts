import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPaymentError } from "../../types/paymentError.d";

const initialState: IPaymentError = {
	error: false,
	page: 1,
	message: "",
};

const slice = createSlice({
	name: "paymentError",
	initialState,
	reducers: {
		setPaymentError: (state, action: PayloadAction<IPaymentError>) => ({
			error: true,
			page: action.payload.page,
			message: action.payload.message,
		}),
		unsetPaymentError: (state) => ({
			error: false,
			page: 1,
			message: "",
		}),
	},
});

export const { setPaymentError, unsetPaymentError } = slice.actions;
export default slice.reducer;
