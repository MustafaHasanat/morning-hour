import CheckoutPage from "@/components/checkoutPage";
import TitleBox from "@/components/shared/titleBox";
import { ItemsContext } from "@/context/items/itemsContext";
import useUserData from "@/hooks/useUserData";
import { Stack, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";

export default function Checkout() {
    const { cartItems, setCartItems } = useContext(ItemsContext);
    const [updated, setUpdated] = useState(false);
    const user = useUserData();

    useEffect(() => {
        if (user && user.cart && user._id && !updated) {
            setCartItems(user.cart);
            setUpdated(true);
        }
    }, [setCartItems, user, updated]);

    return !user ? (
        <Stack
            width="100%"
            alignItems="center"
            justifyContent="center"
            height="70vh"
            spacing={10}
        >
            <Typography fontSize="2rem">
                Unauthorized, go to the main page.
            </Typography>
        </Stack>
    ) : (
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

            <CheckoutPage user={user} />
        </Stack>
    );
}
