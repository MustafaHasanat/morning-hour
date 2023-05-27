import { Item } from "@/types/item";
import { createSlice } from "@reduxjs/toolkit";

export interface CartItemProps {
    item: Item;
    quantity: number;
}

const initialItemsState: {
    cartItems: CartItemProps[];
    whishList: Item[];
    bestSelling: Item[];
} = {
    cartItems: [],
    whishList: [],
    bestSelling: [],
};

export const itemsSlice = createSlice({
    name: "items",
    initialState: initialItemsState,
    reducers: {
        setCartItems(state, action) {
            state.cartItems = action.payload;
        },
        setWhishList(state, action) {
            state.whishList = action.payload;
        },
        setBestSelling(state, action) {
            state.bestSelling = action.payload;
        },
    },
});
