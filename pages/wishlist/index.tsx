import YouMayAlsoLike from "@/components/shared/youMayAlsoLike";
import WishlistBox from "@/components/wishlistPage";
import { Item } from "@/types/item";
import { getCookieWithExpiry } from "@/utils/helpers/cookieHandler";
import {
    getItemsByIds,
} from "@/utils/sanity/item";
import { Stack } from "@mui/material";
import { useEffect, useState } from "react";

export default function Wishlist() {
    const [filteredItems, setFilteredItems] = useState<Item[]>([]);

    useEffect(() => {
        const getDate = async () => {
            const whishList: string[] | null = getCookieWithExpiry("whishList");

            if (!!whishList) {
                const items = await getItemsByIds(whishList);
                setFilteredItems(items);
            }
        };

        getDate();
    }, []);

    return (
        <Stack alignItems="center">
            <WishlistBox whishList={filteredItems} />
            <YouMayAlsoLike />
        </Stack>
    );
}
