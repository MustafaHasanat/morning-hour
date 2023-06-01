import { Item } from "@/types/item";
import { Divider, Stack } from "@mui/material";
import ImagesFlipper from "./imagesFlipper";
import DetailsBox from "./detailsBox";
import ReviewsBox from "./reviewsBox";
import { Review } from "@/types/review";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface BookPageProps {
    item: Item;
    reviews: Review[];
}

const BookPage = ({ item, reviews }: BookPageProps) => {
    const [isFavorite, setIsFavorite] = useState(false);

    const whishList = useSelector(
        (state: { itemsReducer: { whishList: Item[] } }) =>
            state.itemsReducer.whishList
    );
    useEffect(() => {
        const matchedList = whishList.filter((whishListItem) => {
            if (whishListItem._id === item._id) {
                return whishListItem;
            }
        });

        if (matchedList.length !== 0) {
            setIsFavorite(true);
        } else {
            setIsFavorite(false);
        }
    }, [item._id, whishList]);

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
