import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  menuState: false,
};

export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    toggleMenuState: (state, action) => {
      state.menuState = action.payload;
    },
  },
});

export const { toggleMenuState } = menuSlice.actions;

export default menuSlice.reducer;
