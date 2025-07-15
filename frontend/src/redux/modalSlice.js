import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    loginModalOpen: false,
    registerModalOpen: false,
  },
  reducers: {
    openLoginModal: (state) => {
      state.loginModalOpen = true;
    },
    closeLoginModal: (state) => {
      state.loginModalOpen = false;
    },
    openRegisterModal: (state) => {
      state.registerModalOpen = true;
    },
    closeRegisterModal: (state) => {
      state.registerModalOpen = false;
    },
  },
});

export const {
  openLoginModal,
  closeLoginModal,
  openRegisterModal,
  closeRegisterModal,
} = modalSlice.actions;

export default modalSlice.reducer;
