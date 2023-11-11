import { createSlice } from "@reduxjs/toolkit";
import createAsyncSlice, { addBuilderCases } from "../../../utils/reduxSlice";

export const forgotPassAction = createAsyncSlice(
  "auth/forgot",
  "POST",
  "auth/forgot-password"
);

export const resetPassAction = createAsyncSlice(
  "auth/reset",
  "POST",
  "auth/reset-password"
);

export const verifyPassAction = createAsyncSlice(
  "auth/verify",
  "POST",
  "auth/verify",
  true
);

const authSlices = createSlice({
  name: "auth",
  initialState: {},
  extraReducers: (builder) => {
    addBuilderCases(
      [
        [forgotPassAction, "forgot"],
        [resetPassAction, "reset"],
        [verifyPassAction, "verified"],
      ],
      builder
    );
  },
});
export default authSlices.reducer;
