import { configureStore } from "@reduxjs/toolkit";
import { itemsSlice } from "./itemsSlice";

const store = configureStore({
    reducer: {
        itemsReducer: itemsSlice.reducer,
    },
});

export const itemsActions = itemsSlice.actions;

export default store;
