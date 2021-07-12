import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UIState = {
  isOpenAddPostModal: boolean;
  postType: "post" | "profile";
  error: any;
  showError: boolean;
  success: any;
  showSuccess: boolean;
};

const initialState: UIState = {
  isOpenAddPostModal: false,
  postType: "post",
  error: "",
  showError: false,
  success: "",
  showSuccess: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openAddPostModal: (state) => {
      state.isOpenAddPostModal = true;
    },
    openUploadProfileModal: (state) => {
      state.isOpenAddPostModal = true;
      state.postType = "profile";
    },
    closeAddPostModal: (state) => {
      state.isOpenAddPostModal = false;
    },
    showError: (state, action: PayloadAction<any>) => {
      state.error = action.payload;
      state.showError = true;
    },
    hideError: (state) => {
      state.showError = false;
      state.error = null;
    },
    showSuccess: (state, action: PayloadAction<any>) => {
      state.success = action.payload;
      state.showSuccess = true;
    },
    hideSuccess: (state) => {
      state.showSuccess = false;
      state.success = null;
    },
  },
});

export const {
  openAddPostModal,
  closeAddPostModal,
  openUploadProfileModal,
  hideError,
  showError,
  showSuccess,
  hideSuccess,
} = uiSlice.actions;
export default uiSlice.reducer;
