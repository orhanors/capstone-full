import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { apiCall } from "../api/api";
import { IUserStore, IUser } from "../../types/user";

const initialUser = {
	_id: "",
	role: "",
	name: "",
	surname: "",
	image: "",
	email: "",
	phone: "",
	createdAt: "2021-03-22T11:31:00.542Z",
	updatedAt: "2021-03-22T11:31:00.542Z",
};
const initialState: IUserStore = {
	data: initialUser,
	isLoggedIn: false,
	errorMessage: "",
	loading: false,
};

const slice = createSlice({
	name: "user",
	initialState,
	reducers: {
		requested: (state) => ({
			...state,
			loading: true,
		}),
		loginSuccess: (state, action: PayloadAction<IUser>) => ({
			...state,
			loading: false,
			isLoggedIn: true,
			data: action.payload,
		}),
		profileSuccess: (state, action: PayloadAction<IUser>) => ({
			...state,
			loading: false,
			isLoggedIn: true,
			data: action.payload,
		}),
		logoutSuccess: (state, action: PayloadAction<IUser>) => ({
			...state,
			loading: false,
			isLoggedIn: false,
			data: initialUser,
		}),
		failed: (state, action: PayloadAction<string>) => ({
			...state,
			loading: false,
			errorMessage: action.payload,
		}),
	},
});

export const {
	requested,
	loginSuccess,
	logoutSuccess,
	failed,
	profileSuccess,
} = slice.actions;

export default slice.reducer;

export const login = () =>
	apiCall({
		url: `/auth/login`,
		onStart: requested.type,
		onSuccess: loginSuccess.type,
		onError: failed.type,
	});

export const getUserProfile = () =>
	apiCall({
		url: `/users/me`,
		onStart: requested.type,
		onSuccess: profileSuccess.type,
		onError: failed.type,
	});

export const logout = () =>
	apiCall({
		url: `/auth/logout`,
		onStart: requested.type,
		onSuccess: logoutSuccess.type,
		onError: failed.type,
	});
