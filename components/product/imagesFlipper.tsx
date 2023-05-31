import { Avatar, Stack, Typography } from "@mui/material";
import { Item } from "@/types/item";
import theme from "@/styles/theme";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CartItemProps } from "@/utils/store/itemsSlice";

interface ImagesFlipperProps {
    item: Item;
}

const ImagesFlipper = ({ item }: ImagesFlipperProps) => {
    const [sliderShift, setSliderShift] = useState(0);
    const [isFavorite, setIsFavorite] = useState(false);

    const imageSize = 23;
    const thumbnailSize = 4;
    const frameSize = 25;
    const imagesSpaceLength = 2;

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

    const handleThumbnailClick = (index: number) => {
        setSliderShift(index);
    };

    return (
        <Stack width={{ xs: `${frameSize}rem` }} alignItems="center">
            <Stack
                id="slider-container"
                bgcolor="background.paper"
                borderRadius={3}
                width="100%"
                height={{ xs: `${frameSize}rem` }}
                justifyContent="center"
                alignItems="start"
                px={`${imagesSpaceLength / 2}rem`}
                overflow="hidden"
                mb={`${imagesSpaceLength}rem`}
                border={`1px solid ${theme.palette.primary.main}`}
                position="relative"
            >
                <Stack
                    component={motion.div}
                    initial={{ rotate: 45, y: -130, x: 140 }}
                    animate={{ rotate: 45, y: isFavorite ? 40 : -130, x: 140 }}
                    sx={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        bgcolor: "secondary.main",
                        width: "400px",
                        height: "50px",
                        alignItems: "center",
                        justifyContent: "center",
                        borderTop: `1px solid ${theme.palette.primary.main}`,
                        borderBottom: `1px solid ${theme.palette.primary.main}`,
                        zIndex: 1,
                    }}
                >
                    <Typography
                        textTransform="capitalize"
                        fontSize={{ xs: "1rem" }}
                    >
                        on wishlist{" "}
                    </Typography>
                </Stack>

                <Stack
                    id="slider-box"
                    component={motion.div}
                    initial={{ x: 0 }}
                    animate={{
                        x: `-${
                            sliderShift * (imageSize + imagesSpaceLength)
                        }rem`,
                    }}
                    height={{ xs: `${imageSize}rem` }}
                    spacing={`${imagesSpaceLength}rem`}
                    direction="row"
                >
                    {item.screenshots.map((image, index) => {
                        return (
                            <Stack
                                key={`main image number: ${index}`}
                                alignItems="center"
                                sx={{
                                    width: `${imageSize}rem`,
                                    height: `${imageSize}rem`,
                                }}
                            >
                                <Avatar
                                    src={image.asset.url}
                                    alt={`main book image: ${index}`}
                                    variant="square"
                                    sx={{
                                        width: "fit-content",
                                        height: "100%",
                                    }}
                                />
                            </Stack>
                        );
                    })}
                </Stack>
            </Stack>

            <Stack
                id="thumbnails-box"
                width={{ xs: `${imageSize}rem` }}
                direction="row"
                flexWrap="wrap"
                justifyContent="space-between"
            >
                {item.screenshots.map((image, index) => {
                    return (
                        <Stack
                            component={motion.div}
                            initial={{
                                backgroundColor: "#ffffff",
                            }}
                            whileHover={{
                                scale: 1.1,
                                backgroundColor: theme.palette.background.paper,
                                border: `1px solid ${theme.palette.primary.main}`,
                            }}
                            whileTap={{
                                scale: 0.8,
                                backgroundColor: theme.palette.background.paper,
                            }}
                            key={`thumbnail image number: ${index}`}
                            alignItems="center"
                            borderRadius={2}
                            p={0.5}
                            width={`${thumbnailSize}rem`}
                            height={`${thumbnailSize}rem`}
                            sx={{
                                cursor: "pointer",
                            }}
                            onClick={() => {
                                handleThumbnailClick(index);
                            }}
                        >
                            <Avatar
                                src={image.asset.url}
                                alt={`thumbnail book image: ${index}`}
                                variant="square"
                                sx={{
                                    width: "fit-content",
                                    height: "100%",
                                }}
                            />
                        </Stack>
                    );
                })}
            </Stack>
        </Stack>
    );
};

export default ImagesFlipper;
