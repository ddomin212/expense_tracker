import { createSlice } from "@reduxjs/toolkit";
import createAsyncSlice, { addBuilderCases } from "../../../utils/reduxSlice";

export const newsletterSubAction = createAsyncSlice(
  "newsletter/sub",
  "POST",
  "newsletter"
);

const newsletterSlice = createSlice({
  name: "newsletter",
  initialState: {},
  extraReducers: (builder) => {
    addBuilderCases([[newsletterSubAction, "subbed"]], builder);
  },
});
export default newsletterSlice.reducer;
