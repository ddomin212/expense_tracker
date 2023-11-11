import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../../utils/baseUrl";
export const connectFioAction = createAsyncThunk(
  "connect/fio/create",
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
      const res = await axios.post(
        `${baseUrl}/api/connect/fio`,
        payload,
        config
      );
      localStorage.setItem("fio", true);
      return res.data;
    } catch (err) {
      if (!err?.response) throw err;
      return rejectWithValue(err?.response?.data);
    }
  }
);
export const disconnectFioAction = createAsyncThunk(
  "connect/fio/delete",
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
      const res = await axios.get(`${baseUrl}/api/connect/fio/rm`, config);
      localStorage.removeItem("fio");
      return res.data;
    } catch (err) {
      if (!err?.response) throw err;
      return rejectWithValue(err?.response?.data);
    }
  }
);
export const fetchFioAction = createAsyncThunk(
  "connect/fio/fetch",
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
      const res = await axios.get(`${baseUrl}/api/connect/fio/up`, config);
      return res.data;
    } catch (err) {
      if (!err?.response) throw err;
      return rejectWithValue(err?.response?.data);
    }
  }
);

const connectSlice = createSlice({
  name: "connect",
  initialState: { connected: localStorage.getItem("fio") ? true : false },
  extraReducers: (builder) => {
    builder.addCase(connectFioAction.pending, (state) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(connectFioAction.fulfilled, (state, action) => {
      state.loading = false;
      state.connected = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(connectFioAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action.payload?.msg;
      state.serverErr = action.payload?.error;
    });
    builder.addCase(disconnectFioAction.pending, (state) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(disconnectFioAction.fulfilled, (state, action) => {
      state.loading = false;
      state.disconnected = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(disconnectFioAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action.payload?.msg;
      state.serverErr = action.payload?.error;
    });
    builder.addCase(fetchFioAction.pending, (state) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchFioAction.fulfilled, (state, action) => {
      state.loading = false;
      state.updated = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchFioAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action.payload?.msg;
      state.serverErr = action.payload?.error;
    });
  },
});
export default connectSlice.reducer;
