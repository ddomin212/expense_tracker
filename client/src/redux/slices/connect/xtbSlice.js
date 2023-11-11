import { createSlice } from "@reduxjs/toolkit";
import createAsyncSlice, { addBuilderCases } from "../../../utils/reduxSlice";

export const connectXtbAction = createAsyncSlice(
  "connect/xtb/create",
  "POST",
  "connect/xtb",
  true,
  () => localStorage.setItem("xtb", true)
);

export const disconnectXtbAction = createAsyncSlice(
  "connect/xtb/delete",
  "GET",
  "connect/xtb/rm",
  true,
  () => localStorage.removeItem("xtb")
);

export const fetchXtbAction = createAsyncSlice(
  "connect/xtb/fetch",
  "GET",
  "connect/xtb/up",
  true
);

const xtbSlice = createSlice({
  name: "xtb",
  initialState: { connected: localStorage.getItem("xtb") ? true : false },
  extraReducers: (builder) => {
    addBuilderCases(
      [
        [connectXtbAction, "connected"],
        [disconnectXtbAction, "disconnected"],
        [fetchXtbAction, "updated"],
      ],
      builder
    );
  },
});
export default xtbSlice.reducer;
