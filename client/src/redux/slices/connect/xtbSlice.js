import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../../utils/baseUrl";

export const connectXtbAction = createAsyncThunk(
  "connect/xtb/create",
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
        `${baseUrl}/api/connect/xtb`,
        payload,
        config
      );
      localStorage.setItem("xtb", true);
      return res.data;
    } catch (err) {
      if (!err?.response) throw err;
      return rejectWithValue(err?.response?.data);
    }
  }
);
export const disconnectXtbAction = createAsyncThunk(
  "connect/xtb/delete",
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
      const res = await axios.get(`${baseUrl}/api/connect/xtb/rm`, config);
      localStorage.removeItem("xtb");
      return res.data;
    } catch (err) {
      if (!err?.response) throw err;
      return rejectWithValue(err?.response?.data);
    }
  }
);
export const fetchXtbAction = createAsyncThunk(
  "connect/xtb/fetch",
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
      const res = await axios.get(`${baseUrl}/api/connect/xtb/up`, config);
      return res.data;
    } catch (err) {
      if (!err?.response) throw err;
      return rejectWithValue(err?.response?.data);
    }
  }
);

const xtbSlice = createSlice({
  name: "xtb",
  initialState: { connected: localStorage.getItem("xtb") ? true : false },
  extraReducers: (builder) => {
    builder.addCase(connectXtbAction.pending, (state) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(connectXtbAction.fulfilled, (state, action) => {
      state.loading = false;
      state.connected = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(connectXtbAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action.payload?.msg;
      state.serverErr = action.payload?.error;
    });
    builder.addCase(disconnectXtbAction.pending, (state) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(disconnectXtbAction.fulfilled, (state, action) => {
      state.loading = false;
      state.disconnected = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(disconnectXtbAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action.payload?.msg;
      state.serverErr = action.payload?.error;
    });
    builder.addCase(fetchXtbAction.pending, (state) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchXtbAction.fulfilled, (state, action) => {
      state.loading = false;
      state.updated = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchXtbAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action.payload?.msg;
      state.serverErr = action.payload?.error;
    });
  },
});
export default xtbSlice.reducer;
