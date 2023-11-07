import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../../utils/baseUrl";
export const newsletterSubAction = createAsyncThunk(
  "newsletter/sub",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const config = {
      //lepší je specifikovat co se má poslat
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post(
        `${baseUrl}/api/newsletter`,
        payload,
        config
      );
      return res.data;
    } catch (err) {
      if (!err?.response) throw err;
      return rejectWithValue(err?.response?.data);
    }
  }
);

const newsletterSlice = createSlice({
  name: "newsletter",
  initialState: {},
  extraReducers: (builder) => {
    builder.addCase(newsletterSubAction.pending, (state) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(newsletterSubAction.fulfilled, (state, action) => {
      state.loading = false;
      state.subbed = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(newsletterSubAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action.payload?.msg;
      state.serverErr = action.payload?.error;
    });
  },
});
export default newsletterSlice.reducer;
