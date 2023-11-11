import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../../utils/baseUrl";
import createAsyncSlice from "../../../utils/reduxSlice";

export const loginUserAction = createAsyncSlice(
  "users/login",
  "POST",
  "auth",
  false,
  ({ res }) => {
    localStorage.setItem("user", JSON.stringify(res.data));
  }
);

export const registerUserAction = createAsyncSlice(
  "users/register",
  "POST",
  "users",
  false
);

export const updateUserAction = createAsyncThunk(
  "users/update",
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
        `${baseUrl}/api/users/${id}`,
        values,
        config
      );
      const lsObj = {
        msg: "User updated",
        token,
        user: res.data,
      };
      localStorage.setItem("user", JSON.stringify(lsObj));
      return res.data;
    } catch (err) {
      if (!err?.response) throw err;
      return rejectWithValue(err?.response?.data);
    }
  }
);

export const logoutUserAction = createAsyncThunk(
  "users/logout",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      localStorage.removeItem("user");
      localStorage.removeItem("fio");
      localStorage.removeItem("degiro");
      localStorage.removeItem("xtb");
      return {};
    } catch (err) {
      if (!err?.response) throw err;
      return rejectWithValue(err?.response?.data);
    }
  }
);

//slices
const userSlices = createSlice({
  name: "users",
  initialState: { userAuth: JSON.parse(localStorage.getItem("user")) } || {},
  extraReducers: (builder) => {
    builder.addCase(loginUserAction.pending, (state) => {
      state.userLoading = true;
      state.userAppErr = undefined;
      state.userServerErr = undefined;
    });
    builder.addCase(loginUserAction.fulfilled, (state, action) => {
      state.userLoading = false;
      state.userAuth = action.payload;
      state.userAppErr = undefined;
      state.userServerErr = undefined;
    });
    builder.addCase(loginUserAction.rejected, (state, action) => {
      state.userLoading = false;
      state.userAppErr = action.payload?.msg;
      state.userServerErr = action.payload?.error;
    });
    builder.addCase(logoutUserAction.pending, (state) => {
      state.userLoading = true;
    });
    builder.addCase(logoutUserAction.fulfilled, (state, action) => {
      state.userLoading = false;
      state.userAuth = undefined;
    });
    builder.addCase(logoutUserAction.rejected, (state, action) => {
      state.userLoading = false;
      state.userAppErr = action.payload?.msg;
    });
    builder.addCase(registerUserAction.pending, (state) => {
      state.userLoading = true;
      state.userAppErr = undefined;
      state.userServerErr = undefined;
    });
    builder.addCase(registerUserAction.fulfilled, (state, action) => {
      state.userLoading = false;
      state.userAuth = action.payload;
      state.userAppErr = undefined;
      state.userServerErr = undefined;
    });
    builder.addCase(registerUserAction.rejected, (state, action) => {
      state.userLoading = false;
      state.userAppErr = action.payload?.msg;
      state.userServerErr = action.payload?.error;
    });
    builder.addCase(updateUserAction.pending, (state) => {
      state.userLoading = true;
      state.userAppErr = undefined;
      state.userServerErr = undefined;
    });
    builder.addCase(updateUserAction.fulfilled, (state, action) => {
      state.userLoading = false;
      state.updated = true;
      state.userAuth.user = action.payload;
      state.userAppErr = undefined;
      state.userServerErr = undefined;
    });
    builder.addCase(updateUserAction.rejected, (state, action) => {
      state.userLoading = false;
      state.userAppErr = action.payload?.msg;
      state.userServerErr = action.payload?.error;
    });
  },
});

export default userSlices.reducer;
