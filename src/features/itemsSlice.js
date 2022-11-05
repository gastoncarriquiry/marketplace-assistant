import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favoriteItems: [],
  discardedItems: [],
};

export const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
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
} = itemsSlice.actions;

export default itemsSlice.reducer;
