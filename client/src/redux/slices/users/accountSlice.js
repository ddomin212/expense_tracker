import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../../utils/baseUrl";
export const fetchAccount = createAsyncThunk(
  "account/fetch",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const token =
      getState().users?.userAuth?.token || localStorage.getItem("user")?.token;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const res = await axios.get(`${baseUrl}/api/users/stats`, config);
      return res.data;
    } catch (err) {
      if (!err?.response) throw err;
      return rejectWithValue(err?.response?.data);
    }
  }
);
export const fetchAccountBasic = createAsyncThunk(
  "account/basic",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const token =
      getState().users?.userAuth?.token || localStorage.getItem("user")?.token;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const res = await axios.get(`${baseUrl}/api/users/stats/basic`, config);
      return res.data;
    } catch (err) {
      if (!err?.response) throw err;
      return rejectWithValue(err?.response?.data);
    }
  }
);
export const fetchMonthly = createAsyncThunk(
  "account/monthly",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const token =
      getState().users?.userAuth?.token || localStorage.getItem("user")?.token;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const res = await axios.get(
        `${baseUrl}/api/users/stats/${payload}`,
        config
      );
      return res.data;
    } catch (err) {
      if (!err?.response) throw err;
      return rejectWithValue(err?.response?.data);
    }
  }
);
const accountSlices = createSlice({
  name: "accounts",
  initialState: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAccount.pending, (state) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchAccount.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchAccount.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action.payload?.msg;
      state.serverErr = action.payload?.error;
    });
    builder.addCase(fetchAccountBasic.pending, (state) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchAccountBasic.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchAccountBasic.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action.payload?.msg;
      state.serverErr = action.payload?.error;
    });
    builder.addCase(fetchMonthly.pending, (state) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchMonthly.fulfilled, (state, action) => {
      state.loading = false;
      state.monthlyData = action.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchMonthly.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action.payload?.msg;
      state.serverErr = action.payload?.error;
    });
  },
});
export default accountSlices.reducer;
