import { CartItemProps } from "@/utils/store/itemsSlice";
import { Avatar, Box, Button, Chip, Stack, Typography } from "@mui/material";
import CustomDivider from "./customDivider";
import ClearIcon from "@mui/icons-material/Clear";
import { useDispatch, useSelector } from "react-redux";
import { itemsActions } from "@/utils/store";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";

interface MiniCardProps {
    cartItem: CartItemProps;
}

const MiniCard = ({ cartItem }: MiniCardProps) => {
    const dispatch = useDispatch();
    const cartItems = useSelector(
        (state: { itemsReducer: { cartItems: CartItemProps[] } }) =>
            state.itemsReducer.cartItems
    );

    const handleRemove = () => {
        dispatch(itemsActions.deleteFromCartItems(cartItem.item));
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

    const quantButton = (sign: string) => {
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
                    if (sign === "+") {
                        dispatch(
                            itemsActions.changeQuantCartItem({
                                item: cartItem.item,
                                sign: "+",
                            })
                        );
                    } else {
                        dispatch(
                            itemsActions.changeQuantCartItem({
                                item: cartItem.item,
                                sign: "-",
                            })
                        );
                    }
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
