import { createSlice } from "@reduxjs/toolkit";
import createAsyncSlice, { addBuilderCases } from "../../../utils/reduxSlice";

export const connectFioAction = createAsyncSlice(
  "connect/fio/create",
  "POST",
  "connect/fio",
  true,
  () => localStorage.setItem("fio", true)
);

export const disconnectFioAction = createAsyncSlice(
  "connect/fio/delete",
  "GET",
  "connect/fio/rm",
  true,
  () => localStorage.removeItem("fio")
);

export const fetchFioAction = createAsyncSlice(
  "connect/fio/fetch",
  "GET",
  "connect/fio/up",
  true
);

const connectSlice = createSlice({
  name: "connect",
  initialState: { connected: localStorage.getItem("fio") ? true : false },
  extraReducers: (builder) => {
    addBuilderCases(
      [
        [connectFioAction, "connected"],
        [disconnectFioAction, "disconnected"],
        [fetchFioAction, "updated"],
      ],
      builder
    );
  },
});
export default connectSlice.reducer;
