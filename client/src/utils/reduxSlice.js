import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../../utils/baseUrl";

const createAsyncSlice = (
  reduxName,
  method,
  url,
  authFlag,
  customFunctionality,
  paginatedFlag
) =>
  createAsyncThunk(
    reduxName,
    async (payload, { rejectWithValue, getState, dispatch }) => {
      let headers;

      if (authFlag) {
        const token =
          getState().users?.userAuth?.token ||
          localStorage.getItem("user")?.token;
        headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };
      } else {
        headers = {
          "Content-Type": "application/json",
        };
      }

      try {
        const res = await axios[method.toLowerCase()](
          `${baseUrl}/api/${
            typeof url === "function" ? url({ payload }) : url
          }`,
          payload,
          {
            headers,
          }
        );
        if (customFunctionality) {
          customFunctionality({ res });
        }
        return res.data;
      } catch (err) {
        if (!err?.response) throw err;
        return rejectWithValue(err?.response?.data);
      }
    }
  );

const whenFulfilled = (state, action, varTrueName, payloadOrTrue) => {
  state.loading = false;
  state[varTrueName] = payloadOrTrue ? action.payload : true;
  state.appErr = undefined;
  state.serverErr = undefined;
};

const whenRejected = (state, action) => {
  state.loading = false;
  state.appErr = action.payload?.msg;
  state.serverErr = action.payload?.error;
};

const whenPending = (state) => {
  state.loading = true;
  state.appErr = undefined;
  state.serverErr = undefined;
};

const addBuilderCases = (asyncThunkTuples, builder, payloadOrTrue) => {
  asyncThunkTuples.forEach((asyncThunk, value) => {
    builder.addCase(asyncThunk.pending, (state) => {
      whenPending(state);
    });
    builder.addCase(asyncThunk.fulfilled, (state, action) => {
      whenFulfilled(state, action, value, payloadOrTrue);
    });
    builder.addCase(asyncThunk.rejected, (state, action) => {
      whenRejected(state, action);
    });
  });
};

export default createAsyncSlice;

export { whenFulfilled, whenRejected, whenPending, addBuilderCases };
