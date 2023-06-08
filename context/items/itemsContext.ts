import { Context, createContext } from "react";
import { BooksObjectProps, CartItemProps } from "./itemsContextProvider";
import { Item } from "@/types/item";

export interface ItemsContextProps {
    searchTerm: string;
    setSearchTerm: (searchTerm: string) => void;
    booksObject: BooksObjectProps;
    setBooksObject: (booksObject: BooksObjectProps) => void;

    wishlistItems: Item[];
    setWishlistItems: (cartItems: Item[]) => void;
    addToWishlist: (item: Item) => void;
    deleteFromWishlist: (itemId: string) => void;

    cartItems: CartItemProps[];
    setCartItems: (cartItems: CartItemProps[]) => void;
    deleteFromCartItems: (itemId: string) => void;
    changeQuantCartItem: (itemId: string, sign: "+" | "-") => void;
    addToCartItems: (cartItem: CartItemProps) => void;
}

export const ItemsContext: Context<ItemsContextProps> = createContext({
    searchTerm: "",
    setSearchTerm: (searchTerm: string) => {},
    booksObject: {},
    setBooksObject: (booksObject: BooksObjectProps) => {},

    wishlistItems: [{}],
    setWishlistItems: (cartItems: Item[]) => {},
    addToWishlist: (item: Item) => {},
    deleteFromWishlist: (itemId: string) => {},

    cartItems: [{}],
    setCartItems: (cartItems: CartItemProps[]) => {},
    deleteFromCartItems: (itemId: string) => {},
    changeQuantCartItem: (itemId: string, sign: "+" | "-") => {},
    addToCartItems: (cartItem: CartItemProps) => {},
});
