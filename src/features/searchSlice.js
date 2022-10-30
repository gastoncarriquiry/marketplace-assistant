import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedZone: "",
  query: undefined,
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    selectZone: (state, action) => {
      state.selectedZone = action.payload;
    },
    setQuery: (state, action) => {
      state.query = action.payload;
    },
  },
});

export const { selectZone, setQuery } = searchSlice.actions;

export default searchSlice.reducer;
