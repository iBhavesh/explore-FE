import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UIState = {
  isOpenAddPostModal: boolean;
  postType: "post" | "profile";
};

const initialState: UIState = {
  isOpenAddPostModal: false,
  postType: "post",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openAddPostModal: (state, action: PayloadAction) => {
      state.isOpenAddPostModal = true;
    },
    openUploadProfileModal: (state, action: PayloadAction) => {
      state.isOpenAddPostModal = true;
      state.postType = "profile";
    },
    closeAddPostModal: (state, action: PayloadAction) => {
      state.isOpenAddPostModal = false;
    },
  },
});

export const { openAddPostModal, closeAddPostModal, openUploadProfileModal } =
  uiSlice.actions;
export default uiSlice.reducer;
