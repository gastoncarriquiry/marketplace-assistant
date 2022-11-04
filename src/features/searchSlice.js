import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedZone: "",
  query: undefined,
  recentSearches: [],
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
    setRecentSearches: (state, action) => {
      state.recentSearches = action.payload;
    },
    addRecentSearch: (state, action) => {
      state.recentSearches.push(action.payload);
    },
  },
});

export const { selectZone, setQuery, setRecentSearches, addRecentSearch } = searchSlice.actions;

export default searchSlice.reducer;
