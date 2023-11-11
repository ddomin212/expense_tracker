import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../../utils/baseUrl";
import createAsyncSlice, { addBuilderCases } from "../../../utils/reduxSlice";
//Login action
export const recordExpense = createAsyncSlice(
  "expenses/add",
  "POST",
  "expenses",
  true
);

export const fetchExpenses = createAsyncThunk(
  "expenses/fetch",
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
        `${baseUrl}/api/expenses/user?page=${payload}`,
        config
      );
      return res.data;
    } catch (err) {
      if (!err?.response) throw err;
      return rejectWithValue(err?.response?.data);
    }
  }
);

export const fetchFilteredExpenses = createAsyncThunk(
  "expenses/fetch/filter",
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
        `${baseUrl}/api/expenses/filter?page=${page}`,
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
export const editExpense = createAsyncThunk(
  "expenses/edit",
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
        `${baseUrl}/api/expenses/${id}`,
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
const expensesSlices = createSlice({
  name: "expenses",
  initialState: {},
  extraReducers: (builder) => {
    addBuilderCases(
      [
        [recordExpense, "created"],
        [fetchExpenses, "created"],
        [fetchFilteredExpenses, "created"],
        [editExpense, "created"],
      ],
      builder,
      true
    );
  },
});

export default expensesSlices.reducer;
