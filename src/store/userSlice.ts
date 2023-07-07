import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { userType } from "../utils/types";

interface InitialState {
  user: null | userType;
  loading: "idle" | "loading" | "loaded" | "error";
  error: null | string;
}
const initialState:InitialState = {
  user: null,
  loading: "idle",
  error: null,
};
const usersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action:PayloadAction<userType>) => {
      state.user = action.payload;
      state.loading = "loaded",
    }
  },
});
