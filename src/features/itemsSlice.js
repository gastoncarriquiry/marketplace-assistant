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
    resetItemsSlice: (state) => {
      state.favoriteItems = initialState.favoriteItems;
      state.favoriteGroups = initialState.favoriteGroups;
      state.discardedItems = initialState.discardedItems;
      state.preventReload = initialState.preventReload;
    },
  },
});

export const {
  addDiscardedItem,
  addFavoriteItem,
  removeDiscardedItem,
  removeFavoriteItem,
  addFavoriteGroup,
  setPreventReload,
  resetItemsSlice,
} = itemsSlice.actions;

export default itemsSlice.reducer;
