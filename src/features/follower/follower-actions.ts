import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axios";

export const fetchFollowing = createAsyncThunk(
  "follower/fetchFollowing",
  async (user_id: number) => {
    const response = await axiosInstance.get(`/user/${user_id}/following`);
    return response.data;
  }
);

export const fetchFollowers = createAsyncThunk(
  "follower/fetchFollowers",
  async (user_id: number) => {
    const response = await axiosInstance.get(`/user/${user_id}/followers`);
    return response.data;
  }
);

export const sendFollowRequest = createAsyncThunk(
  "follower/sendFollowRequest",
  async (user_id: number, thunkAPI) => {
    const response = await axiosInstance.post(`user/${user_id}/follow/request`);
    await thunkAPI.dispatch(fetchFollowedByUserStatus(user_id));
    return response.data;
  }
);

export const fetchFollowedByUserStatus = createAsyncThunk(
  "follower/fetchFollowedByUserStatus",
  async (user_id: number) => {
    const response = await axiosInstance.get(`/user/${user_id}/follow/status`);
    return response.data;
  }
);

export const cancelFollowRequest = createAsyncThunk(
  "follower/cancelFollowRequest",
  async (user_id: number, thunkAPI) => {
    const response = await axiosInstance.delete(
      `user/${user_id}/follow/request/cancel`
    );
    await thunkAPI.dispatch(fetchFollowedByUserStatus(user_id));
    return response.data;
  }
);

export const unfollowUser = createAsyncThunk(
  "follower/unfollowUser",
  async (user_id: number, thunkAPI) => {
    const response = await axiosInstance.post(
      `user/${user_id}/following/unfollow`
    );
    await thunkAPI.dispatch(fetchFollowedByUserStatus(user_id));
    await thunkAPI.dispatch(fetchFollowing(user_id));
    return response.data;
  }
);

export const removeFollower = createAsyncThunk(
  "follower/removeFollower",
  async (user_id: number, thunkAPI) => {
    const response = await axiosInstance.post(
      `user/${user_id}/follower/remove`
    );
    await thunkAPI.dispatch(fetchFollowers(user_id));
    return response.data;
  }
);

export const fetchFollowRequests = createAsyncThunk(
  "follower/fetchFollowRequests",
  async () => {
    const response = await axiosInstance.get("user/follow/requests");
    return response.data;
  }
);
