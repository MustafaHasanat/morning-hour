import YouMayAlsoLike from "@/components/shared/youMayAlsoLike";
import WishlistBox from "@/components/wishlistPage";
import { ItemsContext } from "@/context/items/itemsContext";
import useUserData from "@/hooks/useUserData";
import { Stack } from "@mui/material";
import { useContext, useEffect } from "react";

export default function Wishlist() {
    const { wishlist, setWishlist } = useContext(ItemsContext);
    const user = useUserData();

    useEffect(() => {
        if (user && user.wishlist) {
            setWishlist(user.wishlist);            
        }
    }, [user, setWishlist]);

    return (
        <Stack alignItems="center">
            <WishlistBox wishlist={wishlist} />
            <YouMayAlsoLike />
        </Stack>
    );
}
