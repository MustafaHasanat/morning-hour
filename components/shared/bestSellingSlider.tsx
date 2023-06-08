import { Item } from "@/types/item";
import { Stack } from "@mui/material";
import { Fragment, useContext, useEffect, useState } from "react";
import ItemCard from "../shared/itemCard";
import { keyframes } from "@mui/material/styles";
import { ItemsContext } from "@/context/items/itemsContext";
import { filterBestSellingItems } from "@/utils/helpers/itemsObjectHandler";

const BestSellingSlider = () => {
    const [bestSellingBooks, setBestSellingBooks] = useState<Item[]>([]);
    const { booksObject } = useContext(ItemsContext);

    const cardWidth = 15;
    const gapLength = 5;

    const sliderKeyframes = keyframes`
        0% { left: calc(-1 * (${cardWidth}rem * 8 + ${gapLength}rem * 7)) };
        100% { left: 90vw };
    `;

    useEffect(() => {
        setBestSellingBooks(filterBestSellingItems(booksObject));
    }, [booksObject]);

    return (
        <Stack
            id="sliding-box-container"
            direction="row"
            width="100%"
            height="30rem"
            overflow="hidden"
            position="relative"
        >
            <Stack
                id="sliding-box"
                width="fit-content"
                height="fit-content"
                direction="row"
                gap={`${gapLength}rem`}
                position="absolute"
                top="50%"
                sx={{
                    transform: "translateY(-50%)",
                    left: "-100%",
                    animation: `${sliderKeyframes} 20s linear infinite`,
                    animationPlayState: "running",

                    "&:hover": {
                        animationPlayState: "paused",
                    },
                }}
            >
                {[
                    ...bestSellingBooks,
                    ...bestSellingBooks,
                    ...bestSellingBooks,
                    ...bestSellingBooks,
                ].map((item, index) => {
                    return (
                        <Fragment key={`${index}`}>
                            <ItemCard item={item} />
                        </Fragment>
                    );
                })}
            </Stack>
        </Stack>
    );
};

export default BestSellingSlider;
