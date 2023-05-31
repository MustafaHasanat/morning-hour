import { Avatar, Stack } from "@mui/material";
import { Item } from "@/types/item";
import theme from "@/styles/theme";
import { motion } from "framer-motion";
import { useState } from "react";

interface ImagesFlipperProps {
    item: Item;
}

const ImagesFlipper = ({ item }: ImagesFlipperProps) => {
    const [sliderShift, setSliderShift] = useState(0);

    const imageSize = 23;
    const thumbnailSize = 4;
    const frameSize = 25;
    const imagesSpaceLength = 2;

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
                >
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
                                backgroundColor: "transparent",
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
