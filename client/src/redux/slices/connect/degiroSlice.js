import { createSlice } from "@reduxjs/toolkit";
import createAsyncSlice, { addBuilderCases } from "../../../utils/reduxSlice";

export const connectDegiroAction = createAsyncSlice(
  "connect/degiro/create",
  "POST",
  "connect/degiro",
  true,
  () => localStorage.setItem("degiro", true)
);

export const disconnectDegiroAction = createAsyncSlice(
  "connect/degiro/delete",
  "GET",
  "connect/degiro/rm",
  true,
  () => localStorage.removeItem("degiro")
);

export const fetchDegiroAction = createAsyncSlice(
  "connect/degiro/fetch",
  "GET",
  "connect/degiro/up",
  true
);

const degiroSlice = createSlice({
  name: "degiro",
  initialState: { connected: localStorage.getItem("degiro") ? true : false },
  extraReducers: (builder) => {
    addBuilderCases(
      [
        [connectDegiroAction, "connected"],
        [disconnectDegiroAction, "disconnected"],
        [fetchDegiroAction, "updated"],
      ],
      builder
    );
  },
});
export default degiroSlice.reducer;
