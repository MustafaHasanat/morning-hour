import BookPage from "@/components/product/bookPage";
import { Item } from "@/types/item";
import { Stack } from "@mui/material";
import { useSelector } from "react-redux";

export default function Product() {
    const currentVisitedItem = useSelector(
        (state: { itemsReducer: { currentVisitedItem: Item | null } }) =>
            state.itemsReducer.currentVisitedItem
    );

    return (
        <Stack>
            {currentVisitedItem && <BookPage item={currentVisitedItem} />}
        </Stack>
    );
}
