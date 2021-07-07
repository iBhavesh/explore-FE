import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axios";

export type Author = {
  id: number;
  date_of_birth: string;
  email: string;
  first_name: string;
  last_name: string;
  is_private_profile: boolean;
  profile_picture: null | "string";
};
export type CommentReaction = {
  author: number;
  reaction_type: number;
  comment: number;
  created_at: string;
};

export type CommentPost = {
  id: number;
  author: number;
};

export type Comment = {
  author: Author;
  comment: string;
  created_at: string;
  id: number;
  post: CommentPost;
  comment_reaction: CommentReaction[];
};

type CommentState = {
  comments: Comment[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

const initialState: CommentState = {
  comments: [],
  error: null,
  status: "idle",
};

export const fetchPostComments = createAsyncThunk(
  "comments/fetchPostComments",
  async (post_id: number) => {
    try {
      const response = await axiosInstance.get(`/posts/${post_id}/comments`);
      return response.data;
    } catch (e) {
      // return e;
    }
  }
);

export const addPostComment = createAsyncThunk(
  "comments/addPostComment",
  async ({ url, data }: { url: string; data: any }, thunkAPI) => {
    try {
      const response = await axiosInstance.post(url, data);
      thunkAPI.dispatch(fetchPostComments(data.post));
      return response.data;
    } catch (error) {}
  }
);

export const deletePostComment = createAsyncThunk(
  "comments/addPostComment",
  async ({ url, post_id }: { url: string; post_id: number }, thunkAPI) => {
    try {
      const response = await axiosInstance.delete(url);
      thunkAPI.dispatch(fetchPostComments(post_id));
      return response.data;
    } catch (error) {}
  }
);

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostComments.fulfilled, (state, action) => {
        if (action.payload === null) state.comments = [];
        else state.comments = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchPostComments.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(addPostComment.fulfilled, (state, action) => {
        state.status = "loading";
      })
      .addCase(addPostComment.pending, (state, action) => {
        state.status = "loading";
      });
  },
});

// export const {} = commentsSlice.actions;
export default commentsSlice.reducer;
