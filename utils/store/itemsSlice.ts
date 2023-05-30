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
    searchTerm: string;
    currentVisitedItem: Item | null;
} = {
    cartItems: [],
    whishList: [],
    bestSelling: [],
    searchTerm: "",
    currentVisitedItem: null,
};

export const itemsSlice = createSlice({
    name: "items",
    initialState: initialItemsState,
    reducers: {
        setCartItems(state, action: { payload: CartItemProps[] }) {
            state.cartItems = action.payload;
        },
        addToCartItems(state, action: { payload: CartItemProps }) {
            state.cartItems.push(action.payload);
        },
        changeQuantCartItem(
            state,
            action: { payload: { item: Item; sign: "+" | "-" } }
        ) {
            state.cartItems = state.cartItems.map((item) => {
                if (item.item._id === action.payload.item._id) {
                    item.quantity =
                        action.payload.sign === "+"
                            ? item.quantity + 1
                            : item.quantity > 1
                            ? item.quantity - 1
                            : item.quantity;
                }

                return item;
            });
        },
        deleteFromCartItems(state, action: { payload: Item }) {
            state.cartItems = state.cartItems.filter((item) => {
                if (item.item._id !== action.payload._id) {
                    return item;
                }
            });
        },

        setWhishList(state, action: { payload: Item[] }) {
            state.whishList = action.payload;
        },
        addToWhishList(state, action: { payload: Item }) {
            state.whishList.push(action.payload);
        },
        deleteFromWhishList(state, action: { payload: Item }) {
            state.whishList = state.whishList.filter((item) => {
                if (item._id !== action.payload._id) {
                    return item;
                }
            });
        },

        setBestSelling(state, action: { payload: Item[] }) {
            state.bestSelling = action.payload;
        },

        setSearchTerm(state, action: { payload: string }) {
            state.searchTerm = action.payload;
        },

        setCurrentVisitedItem(state, action: { payload: Item }) {
            state.currentVisitedItem = action.payload;
        },
    },
});
