import { Item } from "@/types/item";
import { Divider, Stack } from "@mui/material";
import ImagesFlipper from "./imagesFlipper";
import DetailsBox from "./detailsBox";
import ReviewsBox from "./reviewsBox";
import { Review } from "@/types/review";
import { useContext, useEffect, useState } from "react";
import { ItemsContext } from "@/context/items/itemsContext";

interface BookPageProps {
    item: Item;
    reviews: Review[];
}

const BookPage = ({ item, reviews }: BookPageProps) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const { wishlistItems } = useContext(ItemsContext);

    useEffect(() => {
        const matchedList = wishlistItems.filter((wishlistItem) => {
            if (wishlistItem._id === item._id) {
                return wishlistItem._id;
            }
        });

        if (matchedList.length !== 0) {
            setIsFavorite(true);
        } else {
            setIsFavorite(false);
        }
    }, [item._id, wishlistItems]);

    return (
        <Stack px={{ xs: 10 }} py={{ xs: 10 }} width={{ xs: "100%" }}>
            <Stack
                direction={{ xs: "column", lg: "row" }}
                width={{ xs: "100%" }}
                justifyContent={{
                    xs: "space-between",
                }}
            >
                <ImagesFlipper item={item} isFavorite={isFavorite} />
                <DetailsBox
                    item={item}
                    reviews={reviews}
                    isFavorite={isFavorite}
                    setIsFavorite={setIsFavorite}
                />
            </Stack>

            <Divider
                sx={{
                    my: 5,
                }}
            />

            <ReviewsBox item={item} reviews={reviews} />
        </Stack>
    );
};

export default BookPage;
