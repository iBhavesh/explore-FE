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

export type PostReaction = {
  author: number;
  reaction_type: number;
  post: number;
  created_at: string;
};
export type CommentReaction = {
  author: number;
  reaction_type: number;
  comment: number;
  created_at: string;
};

export type Post = {
  author: Author;
  caption: string;
  content_type: "post" | "profile";
  created_at: string;
  id: number;
  media: string;
  media_type: null | "image" | "video";
  post_reaction: PostReaction[];
};

type PostState = {
  posts: Post[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

const initialState: PostState = {
  posts: [],
  error: null,
  status: "idle",
};

export const fetchAllPosts = createAsyncThunk(
  "posts/fetchAllPosts",
  async () => {
    try {
      const response = await axiosInstance.get("posts/");
      return response.data;
    } catch (e) {}
  }
);

export const fetchUserPosts = createAsyncThunk(
  "posts/fetchUserPosts",
  async (user_id: number) => {
    try {
      const response = await axiosInstance.get(`user/${user_id}/posts
      `);
      return response.data;
    } catch (e) {}
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (
    { post_id, user_id }: { post_id: number; user_id: number },
    thunkAPI
  ) => {
    try {
      const response = await axiosInstance.delete(`posts/${post_id}`);
      thunkAPI.dispatch(fetchUserPosts(user_id));
      return response.data;
    } catch (e) {}
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchAllPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload;
      })
      .addCase(fetchUserPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchUserPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload;
      });
  },
});

// export const {} = postsSlice.actions;
export default postsSlice.reducer;
