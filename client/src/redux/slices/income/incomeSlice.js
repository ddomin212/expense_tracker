import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../../utils/baseUrl";
import createAsyncSlice, { addBuilderCases } from "../../../utils/reduxSlice";

export const recordIncome = createAsyncSlice(
  "incomes/add",
  "POST",
  "incomes",
  true
);

export const fetchIncomes = createAsyncThunk(
  "income/fetch",
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
        `${baseUrl}/api/incomes/user?page=${payload}`,
        config
      );
      return res.data;
    } catch (err) {
      if (!err?.response) throw err;
      return rejectWithValue(err?.response?.data);
    }
  }
);

export const editIncome = createAsyncThunk(
  "income/edit",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const { values, id } = payload;
    const token =
      getState().users?.userAuth?.token || localStorage.getItem("user")?.token;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const res = await axios.patch(
        `${baseUrl}/api/incomes/${id}`,
        values,
        config
      );
      return res.data;
    } catch (err) {
      if (!err?.response) throw err;
      return rejectWithValue(err?.response?.data);
    }
  }
);

export const fetchFilteredIncomes = createAsyncThunk(
  "incomes/fetch/filter",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const { page, values } = payload;
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
        `${baseUrl}/api/incomes/filter?page=${page}`,
        values,
        config
      );
      return res.data;
    } catch (err) {
      if (!err?.response) throw err;
      return rejectWithValue(err?.response?.data);
    }
  }
);
//slices
const incomeSlices = createSlice({
  name: "income",
  initialState: {},
  extraReducers: (builder) => {
    addBuilderCases(
      [
        [recordIncome, "created"],
        [fetchIncomes, "created"],
        [fetchFilteredIncomes, "created"],
        [editIncome, "created"],
      ],
      builder,
      true
    );
  },
});

export default incomeSlices.reducer;
