/* eslint-disable react-hooks/exhaustive-deps */
import { ReactNode, useMemo, useState } from "react";
import { ItemsContext, ItemsContextProps } from "./itemsContext";
import { CartItem, Item } from "@/types/item";

type Props = {
    children: ReactNode;
};

export interface BooksObjectProps {
    [itemId: string]: Item;
}

const ItemsContextProvider = ({ children }: Props) => {
    const [booksObject, setBooksObject] = useState<BooksObjectProps>({});
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [wishlist, setWishlist] = useState<Item[]>([]);

    const itemsProvider: ItemsContextProps = useMemo(
        () => ({
            booksObject,
            setBooksObject,
            searchTerm,
            setSearchTerm,
            cartItems,
            setCartItems,
            wishlist,
            setWishlist,
        }),
        [
            booksObject,
            setBooksObject,
            searchTerm,
            setSearchTerm,
            cartItems,
            setCartItems,
            wishlist,
            setWishlist,
        ]
    );

    return (
        <>
            <ItemsContext.Provider value={itemsProvider}>
                {children}
            </ItemsContext.Provider>
        </>
    );
};

export default ItemsContextProvider;
