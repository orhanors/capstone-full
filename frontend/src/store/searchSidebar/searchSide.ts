import { createSlice } from "@reduxjs/toolkit";

const initialState: boolean = false;

const slice = createSlice({
	name: "searchSidebar",
	initialState,
	reducers: {
		setSearchSidebar: (state) => true,
		unsetSearchSidebar: (state) => false,
	},
});

export const { setSearchSidebar, unsetSearchSidebar } = slice.actions;
export default slice.reducer;
