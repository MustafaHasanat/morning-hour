import { configureStore } from "@reduxjs/toolkit";
import { itemsSlice } from "./itemsSlice";
import { variablesSlice } from "./variablesSlice";

const store = configureStore({
    reducer: {
        itemsReducer: itemsSlice.reducer,
        variablesReducer: variablesSlice.reducer,
    },
});

export const itemsActions = itemsSlice.actions;
export const variablesActions = variablesSlice.actions;

export default store;
