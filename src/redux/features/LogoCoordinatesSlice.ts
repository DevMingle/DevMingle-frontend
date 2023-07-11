import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CounterState = {
	value: { x: number; y: number };
};

const initialState = {
	value: { x: 0, y: 0 },
} as CounterState;

export const LogoCoordinates = createSlice({
	name: "LogoCoordinates",
	initialState,
	reducers: {
		reset: () => initialState,
		changeCoordinates: (
			state,
			action: PayloadAction<{ x: number; y: number }>
		) => {
			state.value = action.payload;
		},
	},
});

export const { changeCoordinates, reset } = LogoCoordinates.actions;
export default LogoCoordinates.reducer;
