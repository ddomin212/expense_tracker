import { createSlice } from "@reduxjs/toolkit";
import createAsyncSlice, { addBuilderCases } from "../../../utils/reduxSlice";

export const fetchUserCurrency = createAsyncSlice(
  "currency/fetch",
  "GET",
  "users/currency",
  true
);

export const upUserCurrency = createAsyncSlice(
  "currency/update",
  "POST",
  "users/currency",
  true
);

const currencySlices = createSlice({
  name: "currency",
  initialState: {},
  extraReducers: (builder) => {
    addBuilderCases(
      [
        [fetchUserCurrency, "currency"],
        [upUserCurrency, "currency"],
      ],
      builder,
      true
    );
  },
});
export default currencySlices.reducer;
