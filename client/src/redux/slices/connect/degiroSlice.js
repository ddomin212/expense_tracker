import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../../utils/baseUrl";

export const connectDegiroAction = createAsyncThunk(
  "connect/degiro/create",
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
        `${baseUrl}/api/connect/degiro`,
        payload,
        config
      );
      localStorage.setItem("degiro", true);
      return res.data;
    } catch (err) {
      if (!err?.response) throw err;
      return rejectWithValue(err?.response?.data);
    }
  }
);
export const disconnectDegiroAction = createAsyncThunk(
  "connect/degiro/delete",
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
      const res = await axios.get(`${baseUrl}/api/connect/degiro/rm`, config);
      localStorage.removeItem("degiro");
      return res.data;
    } catch (err) {
      if (!err?.response) throw err;
      return rejectWithValue(err?.response?.data);
    }
  }
);
export const fetchDegiroAction = createAsyncThunk(
  "connect/degiro/fetch",
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
      const res = await axios.get(`${baseUrl}/api/connect/degiro/up`, config);
      return res.data;
    } catch (err) {
      if (!err?.response) throw err;
      return rejectWithValue(err?.response?.data);
    }
  }
);

const degiroSlice = createSlice({
  name: "degiro",
  initialState: { connected: localStorage.getItem("degiro") ? true : false },
  extraReducers: (builder) => {
    builder.addCase(connectDegiroAction.pending, (state) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(connectDegiroAction.fulfilled, (state, action) => {
      state.loading = false;
      state.connected = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(connectDegiroAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action.payload?.msg;
      state.serverErr = action.payload?.error;
    });
    builder.addCase(disconnectDegiroAction.pending, (state) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(disconnectDegiroAction.fulfilled, (state, action) => {
      state.loading = false;
      state.disconnected = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(disconnectDegiroAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action.payload?.msg;
      state.serverErr = action.payload?.error;
    });
    builder.addCase(fetchDegiroAction.pending, (state) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchDegiroAction.fulfilled, (state, action) => {
      state.loading = false;
      state.updated = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchDegiroAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action.payload?.msg;
      state.serverErr = action.payload?.error;
    });
  },
});
export default degiroSlice.reducer;
