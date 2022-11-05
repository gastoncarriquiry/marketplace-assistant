import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "../features/menuSlice";
import searchReducer from "../features/searchSlice";
import itemsReducer from "../features/itemsSlice";

export const store = configureStore({
  reducer: {
    menu: menuReducer,
    search: searchReducer,
    items: itemsReducer,
  },
});
