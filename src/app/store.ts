import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import postReducer from "../features/posts/postsSlice";
import commentReducer from "../features/comments/commentsSlice";
import userReducer from "../features/user/userSlice";
import followerReducer from "../features/follower/followerSlice";
import notificationReducer from "../features/notifications/notificationsSlice";
import uiSlice from "../features/uiSlice/uiSlice";

export const store = configureStore({
  reducer: {
    ui: uiSlice,
    follower: followerReducer,
    auth: authReducer,
    user: userReducer,
    posts: postReducer,
    comments: commentReducer,
    notification: notificationReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
