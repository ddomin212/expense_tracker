import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../../utils/baseUrl";
export const forgotPassAction = createAsyncThunk(
  "auth/forgot",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    console.log(payload);
    const config = {
      //lepší je specifikovat co se má poslat
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post(
        `${baseUrl}/api/auth/forgot-password`,
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
export const resetPassAction = createAsyncThunk(
  "auth/reset",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    console.log(payload);
    const config = {
      //lepší je specifikovat co se má poslat
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post(
        `${baseUrl}/api/auth/reset-password`,
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
export const verifyPassAction = createAsyncThunk(
  "auth/verify",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const token =
      getState().users?.userAuth?.token || localStorage.getItem("user")?.token;
    const config = {
      //lepší je specifikovat co se má poslat
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const res = await axios.post(
        `${baseUrl}/api/auth/verify`,
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
const authSlices = createSlice({
  name: "auth",
  initialState: {},
  extraReducers: (builder) => {
    builder.addCase(verifyPassAction.pending, (state) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(verifyPassAction.fulfilled, (state, action) => {
      state.loading = false;
      state.verified = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(verifyPassAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action.payload?.msg;
      state.serverErr = action.payload?.error;
    });
    builder.addCase(resetPassAction.pending, (state) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(resetPassAction.fulfilled, (state, action) => {
      state.loading = false;
      state.reset = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(resetPassAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action.payload?.msg;
      state.serverErr = action.payload?.error;
    });
    builder.addCase(forgotPassAction.pending, (state) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(forgotPassAction.fulfilled, (state, action) => {
      state.loading = false;
      state.forgot = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(forgotPassAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action.payload?.msg;
      state.serverErr = action.payload?.error;
    });
  },
});
export default authSlices.reducer;
