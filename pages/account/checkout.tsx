import CheckoutPage from "@/components/checkoutPage";
import TitleBox from "@/components/shared/titleBox";
import { ItemsContext } from "@/context/items/itemsContext";
import useUserData from "@/hooks/useUserData";
import { clearCart } from "@/utils/sanity/user";
import { Stack } from "@mui/material";
import { useContext, useEffect, useState } from "react";

export default function Checkout() {
    const { cartItems, setCartItems } = useContext(ItemsContext);
    const [updated, setUpdated] = useState(false);
    const user = useUserData();

    useEffect(() => {
        if (user && user.cart && user._id && !updated) {
            clearCart({ userId: user._id });
            setCartItems(user.cart);
            setUpdated(true);
        }
    }, [setCartItems, user, updated]);

    return (
        <Stack px={40} py={10} alignItems="center">
            <TitleBox
                title={
                    cartItems.length !== 0 ? "cart items" : "your cart is empty"
                }
                subTitle={
                    cartItems.length !== 0
                        ? ""
                        : "go add some items to your cart"
                }
            />

            <CheckoutPage />
        </Stack>
    );
}
