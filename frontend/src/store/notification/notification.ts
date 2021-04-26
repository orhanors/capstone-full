import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { INotification } from "../../types/notification.d";

const initialState: INotification = {
	message: "",
	show: false,
};

const slice = createSlice({
	name: "notification",
	initialState,
	reducers: {
		setNotification: (state, action: PayloadAction<INotification>) => ({
			...state,
			behavior: action.payload.behavior,
			message: action.payload.message,
			show: true,
			link: action.payload.link,
			undo: action.payload.undo,
			product: action.payload.product,
			time: action.payload.time,
		}),
		unsetNotification: (state) => ({
			...state,
			message: "",
			show: false,
			undo: false,
			time: 0,
		}),
	},
});

export const { setNotification, unsetNotification } = slice.actions;
export default slice.reducer;
