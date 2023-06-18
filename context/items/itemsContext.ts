import { Context, createContext } from "react";
import { BooksObjectProps } from "./itemsContextProvider";
import { CartItem, Item } from "@/types/item";

export interface ItemsContextProps {
    searchTerm: string;
    setSearchTerm: (searchTerm: string) => void;
    booksObject: BooksObjectProps;
    setBooksObject: (booksObject: BooksObjectProps) => void;
    cartItems: CartItem[];
    setCartItems: (cartItems: CartItem[]) => void;
    wishlist: Item[];
    setWishlist: (wishlist: Item[]) => void;
}

export const ItemsContext: Context<ItemsContextProps> = createContext({
    searchTerm: "",
    setSearchTerm: (searchTerm: string) => {},
    booksObject: {},
    setBooksObject: (booksObject: BooksObjectProps) => {},
    cartItems: [],
    setCartItems: (cartItems: CartItem[]) => {},
    wishlist: [],
    setWishlist: (wishlist: Item[]) => {},
});
