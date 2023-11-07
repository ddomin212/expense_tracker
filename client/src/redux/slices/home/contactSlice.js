import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../../utils/baseUrl";
export const contactCreateAction = createAsyncThunk(
  "contact/create",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const config = {
      //lepší je specifikovat co se má poslat
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post(`${baseUrl}/api/contact`, payload, config);
      return res.data;
    } catch (err) {
      if (!err?.response) throw err;
      return rejectWithValue(err?.response?.data);
    }
  }
);

const contactSlice = createSlice({
  name: "contact",
  initialState: {},
  extraReducers: (builder) => {
    builder.addCase(contactCreateAction.pending, (state) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(contactCreateAction.fulfilled, (state, action) => {
      state.loading = false;
      state.sent = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(contactCreateAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action.payload?.msg;
      state.serverErr = action.payload?.error;
    });
  },
});
export default contactSlice.reducer;
