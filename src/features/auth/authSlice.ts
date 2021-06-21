import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface AuthState {
  authToken: string | null;
  refreshToken: string | null;
}
export type AuthType = {
  email: string;
  password: string;
};

const initialState: AuthState = {
  authToken: null,
  refreshToken: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, { payload }: PayloadAction<AuthState>) => {
      if (payload.authToken && payload.refreshToken) {
        state.refreshToken = payload.refreshToken;
        state.authToken = payload.refreshToken;
      }
    },
  },
});

export const { login } = authSlice.actions;
export const getAuthStatus = (state: RootState) => !!state.auth.authToken;

export default authSlice.reducer;
