import { createSlice } from "@reduxjs/toolkit";
import createAsyncSlice, { addBuilderCases } from "../../../utils/reduxSlice";

export const fetchUserPayment = createAsyncSlice(
  "payment/fetch",
  "GET",
  "stripe/fetch",
  true
);

const paymentSlices = createSlice({
  name: "payment",
  initialState: {},
  extraReducers: (builder) => {
    addBuilderCases([[fetchUserPayment, "payment"]], builder, true);
  },
});

export default paymentSlices.reducer;
