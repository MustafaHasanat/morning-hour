import { Button, List, Stack, Typography } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import MiniCard from "../shared/miniCard";
import { useSelector } from "react-redux";
import { CartItemProps } from "@/utils/store/itemsSlice";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

const CartContents = () => {
    const [totalPrice, setTotalPrice] = useState(0);
    
    const cartItems = useSelector(
        (state: { itemsReducer: { cartItems: CartItemProps[] } }) =>
            state.itemsReducer.cartItems
    );

    useEffect(() => {
        setTotalPrice(
            cartItems.reduce(
                (partialSum, item) =>
                    partialSum + item.quantity * item.item.currentPrice,
                0
            )
        );
    }, [cartItems]);

    return (
        <List sx={{ height: "60%", zIndex: 11 }}>
            <Stack height="100%" overflow="scroll">
                {cartItems.map((item, index) => {
                    return (
                        <Fragment
                            key={`cart mini cards header container number ${index}`}
                        >
                            <MiniCard item={item} />
                        </Fragment>
                    );
                })}
            </Stack>

            <Stack
                direction="row"
                py={{ xs: 2 }}
                justifyContent="space-between"
            >
                <Typography textTransform="capitalize">total :</Typography>
                <Typography textTransform="capitalize">
                    {totalPrice} JOD
                </Typography>
            </Stack>

            <Button
                variant="outlined"
                endIcon={<DeleteRoundedIcon />}
                sx={{ my: 1, textTransform: "lowercase", width: "100%" }}
            >
                clear cart
            </Button>

            <Button
                variant="contained"
                endIcon={<ShoppingCartCheckoutIcon />}
                sx={{ my: 1, textTransform: "lowercase", width: "100%" }}
            >
                checkout
            </Button>
        </List>
    );
};

export default CartContents;
