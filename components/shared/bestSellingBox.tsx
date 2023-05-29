import { Item } from "@/types/item";
import { Box, Stack } from "@mui/material";
import { motion } from "framer-motion";
import { useState } from "react";
import { useSelector } from "react-redux";
import { keyframes, styled } from "@mui/material/styles";

interface BestSellingBoxProps {}

const BestSellingBox = ({}: BestSellingBoxProps) => {
    const bestSellingItems = useSelector(
        (state: { itemsReducer: { bestSelling: Item[] } }) =>
            state.itemsReducer.bestSelling
    );

    const [isHovered, setIsHovered] = useState(false);

    const boxes = [
        "red",
        "yellow",
        "blue",
        "gray",
        "white",
        "green",
        "pink",
        "purple",
    ];
    const boxSize = 100;
    const gap = 15;

    const animationDuration = 21; // must be divisible by 3
    const animationDelay = animationDuration / 3;

    const threeBoxes = (delay: number) => {
        return (
            <Stack
                component={motion.div}
                initial={{ y: "-50%" }}
                animate={{
                    x: [
                        `-${boxSize * boxes.length + gap * boxes.length}px`,
                        "0px",
                        `${boxSize * boxes.length + gap * boxes.length}px`,
                        `${
                            2 * (boxSize * boxes.length + gap * boxes.length)
                        }px`,
                    ],
                }}
                transition={{
                    duration: animationDuration,
                    repeat: Infinity,
                    ease: "linear",
                    repeatDelay: 0,
                    delay: delay,
                    repeatType: "loop"
                }}
                direction="row"
                width="fit-content"
                position="absolute"
                top="50%"
                spacing={`${gap}px`}
            >
                {boxes.map((x, index) => {
                    return (
                        <Box
                            key={index}
                            sx={{
                                width: `${boxSize}px`,
                                height: `${boxSize}px`,
                                bgcolor: x,
                            }}
                        >
                            {delay}
                        </Box>
                    );
                })}
            </Stack>
        );
    };

    return (
        <Stack
            py={5}
            px={10}
            component="div"
            onMouseEnter={() => {
                setIsHovered(true);
            }}
            onMouseLeave={() => {
                setIsHovered(false);
            }}
        >
            <Stack
                bgcolor="lightgreen"
                position="relative"
                height="300px"
                fontSize="3rem"
                overflow="hidden"
            >
                {threeBoxes(
                    animationDuration - animationDelay * 3,
                )}
                {threeBoxes(
                    animationDuration - animationDelay * 2,
                )}
                {threeBoxes(
                    animationDuration - animationDelay * 1,
                )}
            </Stack>
        </Stack>
    );
};

export default BestSellingBox;
