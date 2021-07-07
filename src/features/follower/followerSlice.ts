import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axios";

export type Follower = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  profile_picture: string | null;
};

type FollowerState = {
  followers: Follower[];
  following: Follower[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

const initialState: FollowerState = {
  followers: [],
  following: [],
  error: null,
  status: "idle",
};

export const fetchFollowers = createAsyncThunk(
  "follower/fetchFollowers",
  async (user_id: number) => {
    try {
      const response = await axiosInstance.get(`/user/${user_id}/followers`);
      return response.data;
    } catch (e) {
      // return e;
    }
  }
);

export const fetchFollowing = createAsyncThunk(
  "follower/fetchFollowing",
  async (user_id: number) => {
    try {
      const response = await axiosInstance.get(`/user/${user_id}/following`);
      return response.data;
    } catch (e) {
      // return e;
    }
  }
);

const followerSlice = createSlice({
  name: "followers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFollowers.fulfilled, (state, action) => {
        if (action.payload !== null) state.followers = action.payload;
        else state.followers = [];
        state.status = "succeeded";
      })
      .addCase(fetchFollowers.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchFollowing.fulfilled, (state, action) => {
        if (action.payload !== null) state.following = action.payload;
        else state.following = [];
        state.status = "succeeded";
      })
      .addCase(fetchFollowing.pending, (state, action) => {
        state.status = "loading";
      });
  },
});

// export const {} = followerSlice.actions;
export default followerSlice.reducer;
