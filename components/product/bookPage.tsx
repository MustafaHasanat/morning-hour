import { Item } from "@/types/item";
import { Stack } from "@mui/material";

const BookPage = ({ item }: { item: Item }) => {
    return (
        <Stack>
            {item.title}
        </Stack>
    );
}

export default BookPage;