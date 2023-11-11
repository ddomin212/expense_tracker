import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../../utils/baseUrl";
import createAsyncSlice, { addBuilderCases } from "../../../utils/reduxSlice";
export const fetchAccount = createAsyncSlice(
  "account/fetch",
  "GET",
  "users/stats",
  true
);

export const fetchAccountBasic = createAsyncSlice(
  "account/basic",
  "GET",
  "users/stats/basic",
  true
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
    addBuilderCases(
      [
        [fetchAccount, "data"],
        [fetchAccountBasic, "data"],
        [fetchMonthly, "monthlyData"],
      ],
      builder,
      true
    );
  },
});
export default accountSlices.reducer;
