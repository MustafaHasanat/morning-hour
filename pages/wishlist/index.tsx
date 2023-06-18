import YouMayAlsoLike from "@/components/shared/youMayAlsoLike";
import WishlistBox from "@/components/wishlistPage";
import { ItemsContext } from "@/context/items/itemsContext";
import { Stack } from "@mui/material";
import { useContext } from "react";

export default function Wishlist() {
    const { wishlistItems } = useContext(ItemsContext);

    return (
        <Stack alignItems="center">
            <WishlistBox wishlist={wishlistItems} />
            <YouMayAlsoLike />
        </Stack>
    );
}
