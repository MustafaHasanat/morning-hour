import theme from "@/styles/theme";
import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import itemTitleSerializer from "@/utils/helpers/itemTitleSerializer";
import { ItemsContext } from "@/context/items/itemsContext";
import { useContext } from "react";

const FeaturedItemBox = () => {
    const router = useRouter();

    const { booksObject } = useContext(ItemsContext);    
    const featuredItem = booksObject["11ee9793-51b3-4aaa-bcab-2bde936934c2"]

    return (
        <Stack
            position="relative"
            direction={{ xs: "column", lg: "row" }}
            bgcolor="background.paper"
            mx={{ xs: 10 }}
            my={{ xs: 10 }}
            p={{ xs: 5 }}
            borderRadius={3}
            alignItems={{ xs: "end" }}
            height={{ xs: "55vh" }}
            overflow="hidden"
            boxShadow={`10px 10px 20px 1px ${theme.palette.primary.main}`}
        >
            <Stack
                width={{ xs: "60%", height: "100%" }}
                px={{ xs: 3 }}
                justifyContent={{ xs: "space-between" }}
            >
                <Stack>
                    <Typography
                        width={{ xs: "70%" }}
                        fontSize={{ xs: "1.8rem" }}
                        textTransform="capitalize"
                    >
                        book of the morning
                    </Typography>
                    <Typography
                        color="text.secondary"
                        width={{ xs: "70%" }}
                        fontSize={{ xs: "3rem" }}
                    >
                        {featuredItem?.title}
                    </Typography>
                    <Typography
                        color="secondary.main"
                        fontSize={{ xs: "1.2rem" }}
                    >
                        ~ by {featuredItem?.author.name}
                    </Typography>
                </Stack>

                <Button
                    variant="contained"
                    sx={{
                        bgcolor: featuredItem?.primaryColor,
                        width: "fit-content",
                        p: 1.5,
                        borderRadius: 3,
                        textTransform: "capitalize",
                    }}
                    onClick={() => {
                        router.push(
                            `/product/${itemTitleSerializer(
                                featuredItem?.title,
                                "underscored"
                            )}`
                        );
                    }}
                >
                    get the book of the morning
                </Button>
            </Stack>

            <Stack
                width={{ xs: "40%" }}
                pl={{ xs: 5 }}
                pr={{ xs: 15 }}
                alignItems="end"
            >
                <Avatar
                    src={featuredItem?.author.image.asset.url}
                    alt="best selling book"
                    sx={{
                        mb: 3,
                        height: "6rem",
                        width: "6rem",
                    }}
                />

                <Typography
                    textTransform="capitalize"
                    fontWeight="bold"
                    fontSize={{ xs: "1.3rem" }}
                >
                    description
                </Typography>
                <Typography textAlign="right">{featuredItem?.description}</Typography>
            </Stack>

            <Box
                component={motion.div}
                initial={{ x: "-50%", width: "20px", rotateX: 84 }}
                animate={{
                    width: ["20px", "80px", "20px"],
                }}
                transition={{
                    duration: 4,
                    ease: "easeInOut",
                    repeat: Infinity,
                }}
                sx={{
                    position: "absolute",
                    height: "70px",
                    bottom: "0px",
                    left: "50%",
                    bgcolor: "secondary.main",
                    borderRadius: "100%",
                    boxShadow: `0px 0px 25px 30px ${theme.palette.secondary.main}`,
                }}
            />

            <Box
                component={motion.div}
                initial={{ x: "-50%", y: "-53%" }}
                animate={{ x: "-50%", y: ["-53%", "-47%", "-53%"] }}
                transition={{
                    duration: 4,
                    ease: "easeInOut",
                    repeat: Infinity,
                }}
                sx={{
                    position: "absolute",
                    height: "80%",
                    width: "auto",
                    top: "50%",
                    left: "50%",
                }}
            >
                <Avatar
                    src={featuredItem?.image.asset.url}
                    alt="best selling book"
                    sx={{
                        height: "100%",
                        width: "100%",
                    }}
                />
            </Box>

            <Stack
                sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    bgcolor: "secondary.main",
                    width: "500px",
                    height: "50px",
                    alignItems: "center",
                    justifyContent: "center",
                    transform:
                        "rotate(45deg) translateY(-70px) translateX(160px)",
                    borderTop: `1px solid ${theme.palette.primary.main}`,
                    borderBottom: `1px solid ${theme.palette.primary.main}`,
                }}
            >
                <Typography
                    textTransform="capitalize"
                    fontSize={{ xs: "1.5rem" }}
                >
                    featured book
                </Typography>
            </Stack>
        </Stack>
    );
};

export default FeaturedItemBox;
