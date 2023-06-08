import { ReactNode, useMemo, useState } from "react";
import { ItemsContext, ItemsContextProps } from "./itemsContext";
import { Item } from "@/types/item";

type Props = {
    children: ReactNode;
};

export interface BooksObjectProps {
    [itemId: string]: Item;
}

export interface CartItemProps {
    item: Item;
    quantity: number;
}

const ItemsContextProvider = ({ children }: Props) => {
    const [booksObject, setBooksObject] = useState<BooksObjectProps>({});
    const [searchTerm, setSearchTerm] = useState<string>("");

    const [cartItems, setCartItems] = useState<CartItemProps[]>([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const addToCartItems = (cartItem: CartItemProps) => {
        setCartItems((prev) => [...prev, cartItem]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const deleteFromCartItems = (itemId: string) => {
        setCartItems((prev) =>
            prev.filter((cartItem) => {
                if (cartItem.item._id !== itemId) {
                    return cartItem;
                }
            })
        );
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const changeQuantCartItem = (itemId: string, sign: "+" | "-") => {
        setCartItems((prev) =>
            prev.map((cartItem) => {
                if (cartItem.item._id === itemId) {
                    return {
                        ...cartItem,
                        quantity:
                            sign === "+"
                                ? cartItem.quantity + 1
                                : cartItem.quantity > 1
                                ? cartItem.quantity - 1
                                : cartItem.quantity,
                    };
                } else {
                    return cartItem;
                }
            })
        );
    };

    const [wishlistItems, setWishlistItems] = useState<Item[]>([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const addToWishlist = (item: Item) => {
        setWishlistItems((prev) => [...prev, item]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const deleteFromWishlist = (itemId: string) => {
        setWishlistItems((prev) =>
            prev.filter((item) => {
                if (item._id !== itemId) {
                    return item;
                }
            })
        );
    };

    const itemsProvider: ItemsContextProps = useMemo(
        () => ({
            booksObject,
            setBooksObject,
            searchTerm,
            setSearchTerm,

            cartItems,
            setCartItems,
            deleteFromCartItems,
            changeQuantCartItem,
            addToCartItems,

            wishlistItems,
            setWishlistItems,
            addToWishlist,
            deleteFromWishlist,
        }),
        [
            booksObject,
            setBooksObject,
            searchTerm,
            setSearchTerm,

            cartItems,
            setCartItems,
            deleteFromCartItems,
            changeQuantCartItem,
            addToCartItems,

            wishlistItems,
            setWishlistItems,
            addToWishlist,
            deleteFromWishlist,
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
