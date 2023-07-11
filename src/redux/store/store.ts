import { configureStore } from "@reduxjs/toolkit";
import LogoCoordinates from "../features/LogoCoordinatesSlice";

export const store = configureStore({
	reducer: {
		LogoCoordinates,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
