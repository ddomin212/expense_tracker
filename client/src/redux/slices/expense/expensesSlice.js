import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../../utils/baseUrl";
//Login action
export const recordExpense = createAsyncThunk(
  "expenses/add",
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
      const res = await axios.post(`${baseUrl}/api/expenses`, payload, config);
      return res.data;
    } catch (err) {
      if (!err?.response) throw err;
      return rejectWithValue(err?.response?.data);
    }
  }
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
    //create expense
    builder.addCase(recordExpense.pending, (state) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(recordExpense.fulfilled, (state, action) => {
      state.loading = false;
      state.created = action.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(recordExpense.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action.payload?.msg;
      state.serverErr = action.payload?.error;
    });
    //fetch expenses
    builder.addCase(fetchExpenses.pending, (state) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchExpenses.fulfilled, (state, action) => {
      state.loading = false;
      state.created = action.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchExpenses.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action.payload?.msg;
      state.serverErr = action.payload?.error;
    });
    //edit expense
    builder.addCase(editExpense.pending, (state) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(editExpense.fulfilled, (state, action) => {
      state.loading = false;
      state.created = action.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(editExpense.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action.payload?.msg;
      state.serverErr = action.payload?.error;
    });
    builder.addCase(fetchFilteredExpenses.pending, (state) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchFilteredExpenses.fulfilled, (state, action) => {
      state.loading = false;
      state.created = action.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchFilteredExpenses.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action.payload?.msg;
      state.serverErr = action.payload?.error;
    });
  },
});

export default expensesSlices.reducer;
