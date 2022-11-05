import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favoriteItems: [],
  preventReload: false,
  favoriteGroups: [],
  discardedItems: [],
};

export const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    setPreventReload: (state, action) => {
      state.preventReload = action.payload;
    },
    addFavoriteGroup: (state, action) => {
      state.favoriteGroups.push(action.payload);
    },
    setFavoriteItems: (state, action) => {
      state.favoriteItems = action.payload;
    },
    setDiscardedItems: (state, action) => {
      state.discardedItems = action.payload;
    },
    addFavoriteItem: (state, action) => {
      state.favoriteItems.push(action.payload);
    },
    addDiscardedItem: (state, action) => {
      state.discardedItems.push(action.payload);
    },
    removeFavoriteItem: (state, action) => {
      const filteredArray = state.favoriteItems.filter((item) => item.id !== action.payload);
      state.favoriteItems = filteredArray;
    },
    removeDiscardedItem: (state, action) => {
      const filteredArray = state.discardedItems.filter((item) => item.id !== action.payload);
      state.discardedItems = filteredArray;
    },
  },
});

export const {
  setDiscardedItems,
  setFavoriteItems,
  addDiscardedItem,
  addFavoriteItem,
  removeDiscardedItem,
  removeFavoriteItem,
  addFavoriteGroup,
  setPreventReload,
} = itemsSlice.actions;

export default itemsSlice.reducer;
