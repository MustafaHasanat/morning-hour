import { CartItemProps } from "@/utils/store/itemsSlice";
import { Avatar, Button, Stack, Typography } from "@mui/material";
import CustomDivider from "./customDivider";
import ClearIcon from "@mui/icons-material/Clear";

interface MiniCardProps {
    item: CartItemProps;
}

const MiniCard = ({ item }: MiniCardProps) => {
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
                <Typography fontSize={{ xs: "0.8rem" }}>{value}</Typography>
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
                    variant="rounded"
                    sx={{ height: "5rem", width: "5rem" }}
                />

                <Stack>
                    {textPair("title", "xxx")}
                    {textPair("quant", "xxx")}
                    {textPair("price", `JOD`)}
                </Stack>
            </Stack>

            <Button
                variant="outlined"
                endIcon={<ClearIcon />}
                sx={{ mb: 1, mt: 1, py: 0, px: 1, textTransform: "lowercase" }}
            >
                remove
            </Button>

            <CustomDivider />
        </Stack>
    );
};

export default MiniCard;
