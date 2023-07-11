import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { userType } from "../../utils/types";

interface InitialState {
    user: null | userType;
    status: "idle" | "loading" | "loaded" | "error";
    error: null | string;
}
const initialState: InitialState = {
    user: null,
    status: "idle",
    error: null,
};
const usersSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<userType>) => {
            state.user = action.payload;
            state.status = "loaded";
        },
        startLoading: (state) => {
            state.status = "loading";
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.status = "error";
        },
    },
});

export const { setUser, startLoading, setError } = usersSlice.actions;
export default usersSlice.reducer;
