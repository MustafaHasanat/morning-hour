import { createSlice } from "@reduxjs/toolkit";

const initialVariables: { headTitle: string } = { headTitle: "Morning Hour" };

export const variablesSlice = createSlice({
    name: "variables",
    initialState: initialVariables,
    reducers: {
        setHeadTitle(state, action: { payload: string }) {
            state.headTitle = action.payload;
        },
    },
});
