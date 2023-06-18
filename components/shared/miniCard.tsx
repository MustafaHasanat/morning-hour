import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import CustomDivider from "./customDivider";
import ClearIcon from "@mui/icons-material/Clear";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { changeQuantCartItem, removeFromCart } from "@/utils/sanity/user";
import useUserData from "@/hooks/useUserData";
import { useContext } from "react";
import { CartItem } from "@/types/item";
import { ItemsContext } from "@/context/items/itemsContext";

interface MiniCardProps {
    cartItem: CartItem;
}

const MiniCard = ({ cartItem }: MiniCardProps) => {
    const { setCartItems, cartItems } = useContext(ItemsContext);
    const user = useUserData();

    const handleRemove = () => {
        if (user) {
            setCartItems(
                cartItems.filter((item: CartItem) => {
                    if (item.item._id !== cartItem.item._id) {
                        return cartItems;
                    }
                })
            );
            removeFromCart({
                userId: user?._id,
                itemId: `${cartItem.item._id}`,
            });
        }
    };

    const handleChangeQuant = (sign: "+" | "-") => {
        if (user) {
            if (sign === "+") {
                changeQuantCartItem({
                    userId: user._id,
                    itemId: `${cartItem.item._id}`,
                    sign: "+",
                    curQuant: cartItem.quantity,
                });
            } else {
                changeQuantCartItem({
                    userId: user._id,
                    itemId: `${cartItem.item._id}`,
                    sign: "-",
                    curQuant: cartItem.quantity,
                });
            }
        }
    };

    const textPair = (key: string, value: string) => {
        return (
            <Stack direction="row" spacing={1}>
                <Typography
                    fontWeight="bold"
                    textTransform="capitalize"
                    fontSize={{ xs: "0.9rem" }}
                >
                    {key}:
                </Typography>
                <Typography fontSize={{ xs: "1rem" }}>{value}</Typography>
            </Stack>
        );
    };

    const quantButton = (sign: "+" | "-") => {
        return (
            <Box
                component="div"
                sx={{
                    cursor: "pointer",
                    transition: "0.3s ease",
                    bgcolor: "background.paper",
                    borderRadius: "50%",
                    width: "25px",
                    height: "25px",
                    "&:hover": {},
                }}
                onClick={() => {
                    handleChangeQuant(sign);
                }}
            >
                {sign === "+" ? (
                    <AddCircleIcon
                        sx={{
                            width: "100%",
                            height: "100%",
                        }}
                    />
                ) : (
                    <RemoveCircleIcon
                        sx={{
                            width: "100%",
                            height: "100%",
                        }}
                    />
                )}
            </Box>
        );
    };

    const quantBox = () => {
        return (
            <Stack direction="row" spacing={1} alignItems="center">
                <Typography
                    fontWeight="bold"
                    textTransform="capitalize"
                    fontSize={{ xs: "0.9rem" }}
                >
                    quant
                </Typography>

                {quantButton("+")}
                <Typography fontSize={{ xs: "1.2rem" }}>
                    {cartItem.quantity}
                </Typography>
                {quantButton("-")}
            </Stack>
        );
    };

    return (
        <Stack alignItems="end" pb={2}>
            <Stack
                direction={{ xs: "column", lg: "row" }}
                justifyContent="space-evenly"
                width={{ xs: "100%" }}
            >
                <Avatar
                    src={cartItem.item.image.asset.url}
                    variant="rounded"
                    sx={{ height: "5rem", width: "5rem" }}
                />

                <Stack spacing="5px">
                    {textPair("title", cartItem.item.title)}
                    {quantBox()}
                    {textPair("price", `${cartItem.item.currentPrice} JOD`)}
                </Stack>
            </Stack>

            <Button
                variant="outlined"
                endIcon={<ClearIcon />}
                sx={{ mb: 1, mt: 1, py: 0, px: 1, textTransform: "lowercase" }}
                onClick={handleRemove}
            >
                remove
            </Button>

            <CustomDivider />
        </Stack>
    );
};

export default MiniCard;
