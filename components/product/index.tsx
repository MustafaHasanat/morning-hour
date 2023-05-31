import { Item } from "@/types/item";
import { Divider, Stack } from "@mui/material";
import ImagesFlipper from "./imagesFlipper";
import DetailsBox from "./detailsBox";
import ReviewsBox from "./reviewsBox";
import { Review } from "@/types/review";

interface BookPageProps {
    item: Item;
    reviews: Review[];
}

const BookPage = ({ item, reviews }: BookPageProps) => {
    return (
        <Stack px={{ xs: 10 }} py={{ xs: 10 }} width={{ xs: "100%" }}>
            <Stack
                direction={{ xs: "column", lg: "row" }}
                width={{ xs: "100%" }}
                justifyContent={{
                    xs: "space-between",
                }}
            >
                <ImagesFlipper item={item} />
                <DetailsBox item={item} reviews={reviews} />
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
