import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CustomDivider from "../shared/customDivider";
import { CartItem } from "@/types/item";

interface MiniCardProps {
    cartItem: CartItem;
}

const MiniCardCheckout = ({ cartItem }: MiniCardProps) => {
    const handleRemove = () => {
        // removeItemFromCart(cartItem.item._id);
    };

    const textPair = (key: string, value: string) => {
        return (
            <Stack direction="row" spacing={1}>
                <Typography
                    fontWeight="bold"
                    textTransform="capitalize"
                    fontSize={{ xs: "0.9rem", lg: "1.6rem" }}
                >
                    {key}:
                </Typography>
                <Typography
                    fontSize={{ xs: "1rem", lg: "1.6rem" }}
                    sx={{ opacity: 0.7 }}
                >
                    {value}
                </Typography>
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
                    width: "40px",
                    height: "40px",
                }}
                onClick={() => {
                    if (sign === "+") {
                        // updateCartItem(cartItem.item._id, "+");
                    } else {
                        // updateCartItem(cartItem.item._id, "-");
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
            <Stack direction="row" spacing={5} alignItems="center">
                <Typography
                    fontWeight="bold"
                    textTransform="capitalize"
                    fontSize={{ xs: "0.9rem", lg: "1.6rem" }}
                >
                    quant
                </Typography>

                {quantButton("+")}
                <Typography fontSize={{ xs: "1.2rem", lg: "1.6rem" }}>
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
                justifyContent="start"
                width={{ xs: "100%" }}
                spacing={5}
            >
                <Avatar
                    src={cartItem.item.image.asset.url}
                    variant="rounded"
                    sx={{
                        height: "10rem",
                        width: "10rem",
                        img: {
                            height: "100%",
                            width: "auto",
                        },
                    }}
                />

                <Stack spacing={2}>
                    {textPair("title", cartItem.item.title)}
                    {quantBox()}
                    {textPair("price", `${cartItem.item.currentPrice} JOD`)}
                </Stack>
            </Stack>

            <Button
                variant="outlined"
                endIcon={<ClearIcon />}
                sx={{
                    my: 1,
                    py: 1,
                    px: 4,
                    textTransform: "lowercase",
                    fontSize: "1.3rem",
                }}
                onClick={handleRemove}
            >
                remove
            </Button>

            <CustomDivider />
        </Stack>
    );
};

export default MiniCardCheckout;
