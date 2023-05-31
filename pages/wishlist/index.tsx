import YouMayAlsoLike from "@/components/shared/youMayAlsoLike";
import WishlistBox from "@/components/wishlistPage";
import { Stack } from "@mui/material";

export default function Wishlist() {
    return (
        <Stack alignItems="center">
            <WishlistBox />
            <YouMayAlsoLike />
        </Stack>
    );
}
