import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UIState = {
  isOpenAddPostModal: boolean;
};

const initialState: UIState = {
  isOpenAddPostModal: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openAddPostModal: (state, action: PayloadAction) => {
      state.isOpenAddPostModal = true;
    },
    closeAddPostModal: (state, action: PayloadAction) => {
      state.isOpenAddPostModal = false;
    },
  },
});

export const { openAddPostModal, closeAddPostModal } = uiSlice.actions;
export default uiSlice.reducer;
