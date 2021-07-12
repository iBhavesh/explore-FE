import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axios";
import { Author } from "../posts/postsSlice";

export type Notification = {
  id: number;
  owner: number;
  actor: Author;
  type: "comment_reaction" | "post_reaction" | "comment";
  post: number;
  read: boolean;
  created_at: string;
};

export type NotificationState = {
  notifications: Notification[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: any | null;
  unread: number;
};

const initialState: NotificationState = {
  notifications: [],
  unread: 0,
  status: "idle",
  error: null,
};

export const fetchNotifications = createAsyncThunk(
  "notifications/fetchNotifications",
  async () => {
    const response = await axiosInstance.get("user/notifications");
    return response.data;
  }
);

export const readAllNotifications = createAsyncThunk(
  "notifications/readAllNotifications",
  async () => {
    const response = await axiosInstance.put("user/notifications/read");
    return response.data;
  }
);

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        if (action.payload) state.notifications = action.payload;
        else state.notifications = [];
        state.notifications.forEach((element) => {
          if (!element.read) state.unread = state.unread + 1;
        });
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(fetchNotifications.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })
      .addCase(readAllNotifications.fulfilled, (state, action) => {
        state.unread = 0;
        state.error = null;
      })
      .addCase(readAllNotifications.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(readAllNotifications.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      });
  },
});

// export const {} = notificationsSlice.actions;
export default notificationsSlice.reducer;
