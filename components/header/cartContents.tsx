import { Button, List, Stack, Typography } from "@mui/material";
import { Dispatch, Fragment, SetStateAction, useEffect, useState } from "react";
import MiniCard from "../shared/miniCard";
import { useDispatch, useSelector } from "react-redux";
import { CartItemProps } from "@/utils/store/itemsSlice";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { itemsActions } from "@/utils/store";
import getTotalPrice from "@/utils/helpers/getTotalPrice";

interface CartContentsProps {
    setDropDownContents: Dispatch<SetStateAction<"" | "menu" | "cart">>;
}

const CartContents = ({ setDropDownContents }: CartContentsProps) => {
    const [totalPrice, setTotalPrice] = useState(0);

    const dispatch = useDispatch();
    const cartItems = useSelector(
        (state: { itemsReducer: { cartItems: CartItemProps[] } }) =>
            state.itemsReducer.cartItems
    );

    const handleClearButton = () => {
        dispatch(itemsActions.setCartItems([]));
        setTimeout(() => {
            setDropDownContents("");
        }, 400);
    };

    useEffect(() => {
        const { totalPrice } = getTotalPrice(cartItems);
        setTotalPrice(totalPrice);
    }, [cartItems]);

    return (
        <List sx={{ height: "60%", zIndex: 11 }}>
            <Stack height="100%" overflow="scroll">
                {cartItems.map((item, index) => {
                    return (
                        <Fragment
                            key={`cart mini cards header container number ${index}`}
                        >
                            <MiniCard cartItem={item} />
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
                onClick={handleClearButton}
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
