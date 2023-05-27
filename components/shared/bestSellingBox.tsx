import { Item } from "@/types/item";
import { Stack } from "@mui/material";
import { useSelector } from "react-redux";

interface BestSellingBoxProps {}

const BestSellingBox = ({}: BestSellingBoxProps) => {
    const bestSellingItems = useSelector(
        (state: { itemsReducer: { bestSelling: Item[] } }) =>
            state.itemsReducer.bestSelling
    );

    return <Stack></Stack>;
};

export default BestSellingBox;
