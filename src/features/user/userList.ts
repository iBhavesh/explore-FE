import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../axios";
import { User } from "./userSlice";

type UserListState = {
  users: User[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null | any;
};

const initialState: UserListState = {
  users: [],
  status: "idle",
  error: null,
};

export const fetchUserList = createAsyncThunk(
  "user/fetchUserList",
  async (query: string) => {
    const response = await axiosInstance.get("user/search?query=" + query, {
      data: { search: query },
    });
    return response.data;
  }
);

const userListSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addSearchUser: (state, action: PayloadAction<User[] | null>) => {
      if (action.payload !== null) state.users = action.payload;
      else state.users = [];
      state.status = "succeeded";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserList.fulfilled, (state, action) => {
        if (action.payload !== null) state.users = action.payload;
        else state.users = [];
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(fetchUserList.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchUserList.rejected, (state, action) => {
        state.status = "failed";
        state.users = [];
        state.error = action.error;
      });
  },
});

export const { addSearchUser } = userListSlice.actions;
export default userListSlice.reducer;
