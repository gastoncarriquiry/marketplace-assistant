import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedZone: "",
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    selectZone: (state, action) => {
      state.selectedZone = action.payload;
    },
  },
});

export const { selectZone } = searchSlice.actions;

export default searchSlice.reducer;
