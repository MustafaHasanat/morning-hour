import { Item } from "@/types/item";
import { Stack } from "@mui/material";
import { Fragment } from "react";
import ItemCard from "../shared/itemCard";
import { useSelector } from "react-redux";
import { keyframes } from "@mui/material/styles";

const BestSellingSlider = () => {
    const cardWidth = 15;
    const gapLength = 5;

    const sliderKeyframes = keyframes`
        0% { left: calc(-1 * (${cardWidth}rem * 8 + ${gapLength}rem * 7)) };
        100% { left: 90vw };
    `;

    const { bestSelling } = useSelector(
        (state: { itemsReducer: { bestSelling: Item[] } }) => {
            return {
                bestSelling: state.itemsReducer.bestSelling,
            };
        }
    );

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
                    ...bestSelling,
                    ...bestSelling,
                    ...bestSelling,
                    ...bestSelling,
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
