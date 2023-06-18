import { Button, Stack, Typography } from "@mui/material";
import { Fragment, useContext, useEffect, useState } from "react";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import getTotalPrice from "@/utils/helpers/getTotalPrice";
import MiniCardCheckout from "./miniCardCheckout";
import { ItemsContext } from "@/context/items/itemsContext";
import Payment from "./payment";

const CheckoutPage = () => {
    const [totalPrice, setTotalPrice] = useState(0);
    const [paymentIsOpen, setPaymentIsOpen] = useState(false);
    const { cartItems, setCartItems } = useContext(ItemsContext);

    const handleClearButton = () => {
        setCartItems([]);
        setTotalPrice(0);
    };

    useEffect(() => {
        const { totalPrice } = getTotalPrice(cartItems);
        setTotalPrice(totalPrice);
    }, [cartItems]);

    return (
        <Stack alignItems="center">
            <Stack width="100%">
                {cartItems.map((item, index) => {
                    return (
                        <Fragment
                            key={`cart mini cards header container number ${index}`}
                        >
                            <MiniCardCheckout
                                cartItem={item}
                                paymentIsOpen={paymentIsOpen}
                            />
                        </Fragment>
                    );
                })}
            </Stack>

            {cartItems.length !== 0 ? (
                <Stack alignItems="center" width="100%">
                    <Stack direction="row" py={{ xs: 2 }} spacing={3}>
                        <Typography
                            textTransform="capitalize"
                            fontSize={{ xs: "2rem" }}
                        >
                            total :
                        </Typography>
                        <Typography
                            textTransform="capitalize"
                            fontSize={{ xs: "2rem" }}
                        >
                            {totalPrice} JOD
                        </Typography>
                    </Stack>

                    <Button
                        variant="outlined"
                        disabled={paymentIsOpen}
                        endIcon={
                            <DeleteRoundedIcon
                                sx={{
                                    width: "2rem",
                                    height: "100%",
                                }}
                            />
                        }
                        sx={{
                            my: 1,
                            px: 8,
                            textTransform: "lowercase",
                            width: "fit-content",
                            fontSize: { xs: "1.5rem" },
                        }}
                        onClick={handleClearButton}
                    >
                        clear cart
                    </Button>

                    {paymentIsOpen ? (
                        <Payment />
                    ) : (
                        <Button
                            variant="contained"
                            endIcon={
                                <ShoppingCartCheckoutIcon
                                    sx={{
                                        width: "2rem",
                                        height: "100%",
                                    }}
                                />
                            }
                            sx={{
                                my: 1,
                                px: 8,
                                textTransform: "lowercase",
                                width: "fit-content",
                                fontSize: { xs: "1.5rem" },
                            }}
                            onClick={() => {
                                setPaymentIsOpen(true);
                            }}
                        >
                            payment
                        </Button>
                    )}
                </Stack>
            ) : (
                <AutoAwesomeIcon
                    color="primary"
                    sx={{
                        mb: 8,
                        width: "5rem",
                        height: "5rem",
                    }}
                />
            )}
        </Stack>
    );
};

export default CheckoutPage;
