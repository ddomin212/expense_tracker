import { createSlice } from "@reduxjs/toolkit";
import createAsyncSlice, { addBuilderCases } from "../../../utils/reduxSlice";

export const contactCreateAction = createAsyncSlice(
  "contact/create",
  "POST",
  "contact"
);

const contactSlice = createSlice({
  name: "contact",
  initialState: {},
  extraReducers: (builder) => {
    addBuilderCases([[contactCreateAction, "sent"]], builder);
  },
});
export default contactSlice.reducer;
