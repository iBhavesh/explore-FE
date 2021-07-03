import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import jwt_decode from "jwt-decode";

type AccessToken = {
  token: string;
  expire: number;
  email: string;
  user_id: number;
};
export interface UserState {
  accessToken: AccessToken | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
}
export type UserType = {
  email: string;
  password: string;
};

const initialState: UserState = {
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
};

const setUserDetails = (token: string) => {
  const decoded: any = jwt_decode(token);
  const accessToken = {
    token,
    user_id: decoded.user_id,
    email: decoded.email,
    expire: decoded.exp,
  };
  return accessToken;
};

const token = localStorage.getItem("accessToken");
const refreshToken = localStorage.getItem("accessToken");
if (token && refreshToken) {
  initialState.accessToken = setUserDetails(token);
  initialState.refreshToken = refreshToken;
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state, action) => {
      state.accessToken = null;
      state.isAuthenticated = false;
      state.refreshToken = null;
    },
    login: (
      state,
      action: PayloadAction<{ access: string; refresh: string }>
    ) => {
      state.accessToken = setUserDetails(action.payload.access);
      state.isAuthenticated = true;
      state.refreshToken = action.payload.refresh;
      localStorage.setItem("accessToken", action.payload.access);
      localStorage.setItem("refreshToken", action.payload.refresh);
    },
  },
});

export const { logout, login } = authSlice.actions;
export const getAuthStatus = (state: RootState) => !!state.auth.accessToken;

export default authSlice.reducer;
