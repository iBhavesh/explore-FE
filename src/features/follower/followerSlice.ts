import { createSlice } from "@reduxjs/toolkit";
import {
  cancelFollowRequest,
  fetchFollowedByUserStatus,
  fetchFollowers,
  fetchFollowing,
  fetchFollowRequests,
  sendFollowRequest,
  unfollowUser,
} from "./follower-actions";

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
  followed_by_user: Follower[];
  follow_requests: any[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: any | null;
};

const initialState: FollowerState = {
  followers: [],
  following: [],
  followed_by_user: [],
  follow_requests: [],
  error: null,
  status: "idle",
};

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
      .addCase(fetchFollowers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })
      .addCase(fetchFollowing.fulfilled, (state, action) => {
        if (action.payload !== null) state.following = action.payload;
        else state.following = [];
        state.status = "succeeded";
      })
      .addCase(fetchFollowing.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchFollowing.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })
      .addCase(fetchFollowRequests.fulfilled, (state, action) => {
        if (action.payload !== null) state.follow_requests = action.payload;
        else state.follow_requests = [];
        state.status = "succeeded";
      })
      .addCase(fetchFollowRequests.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchFollowRequests.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })
      .addCase(fetchFollowedByUserStatus.fulfilled, (state, action) => {
        console.log(action.payload);
        if (action.payload !== null)
          state.followed_by_user = action.payload.is_accepted;
        state.status = "succeeded";
      })
      .addCase(fetchFollowedByUserStatus.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchFollowedByUserStatus.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })
      .addCase(sendFollowRequest.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(sendFollowRequest.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(sendFollowRequest.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })
      .addCase(cancelFollowRequest.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(cancelFollowRequest.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(cancelFollowRequest.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })
      .addCase(unfollowUser.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(unfollowUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(unfollowUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      });
  },
});

// export const {} = followerSlice.actions;
export default followerSlice.reducer;
