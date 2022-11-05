import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedZone: "",
  query: "",
  recentSearches: [],
  preventReload: false,
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setPreventReload: (state, action) => {
      state.preventReload = action.payload;
    },
    selectZone: (state, action) => {
      state.selectedZone = action.payload;
    },
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    setRecentSearches: (state, action) => {
      state.recentSearches = action.payload;
    },
    addRecentSearch: (state, action) => {
      state.recentSearches.push(action.payload);
    },
  },
});

export const { selectZone, setQuery, setRecentSearches, addRecentSearch, setPreventReload } =
  searchSlice.actions;

export default searchSlice.reducer;
