import {
    Avatar,
    Box,
    Button,
    Stack,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import itemTitleSerializer from "@/utils/helpers/itemTitleSerializer";
import { ItemsContext } from "@/context/items/itemsContext";
import { useContext } from "react";
import useTranslation from "@/hooks/useTranslation";

const FeaturedItemBox = () => {
    const router = useRouter();
    const { booksObject } = useContext(ItemsContext);
    const lgScreen = useMediaQuery("(min-width:1440px)");
    const theme = useTheme();
    const { t } = useTranslation();

    const featuredItem = booksObject["11ee9793-51b3-4aaa-bcab-2bde936934c2"];

    return (
        <Stack
            position="relative"
            direction={{ xs: "column", lg: "row" }}
            bgcolor="background.paper"
            mx={{ xs: 5, lg: 10 }}
            my={{ xs: 8, lg: 10 }}
            p={{ xs: 5 }}
            borderRadius={3}
            alignItems={{ xs: "end" }}
            height={{ xs: "auto", lg: "55vh" }}
            overflow="hidden"
            boxShadow={`10px 10px 20px 1px ${theme.palette.primary.main}`}
        >
            <Stack
                width={{ xs: "100%", lg: "60%" }}
                height="100%"
                px={{ xs: 0, lg: 3 }}
                justifyContent={{ xs: "space-between" }}
            >
                <Stack
                    alignItems={{ xs: "center", lg: "start" }}
                    spacing={{ xs: 2, lg: 0 }}
                    mb={{ xs: 5, lg: 0 }}
                >
                    <Typography
                        width={{ xs: "50%", lg: "70%" }}
                        fontSize={{ xs: "1.5rem", lg: "1.8rem" }}
                        textTransform="capitalize"
                        textAlign={{ xs: "center", lg: "left" }}
                    >
                        {t("landing.featured.title")}
                    </Typography>

                    <Typography
                        color="text.secondary"
                        width={{ xs: "100%", lg: "70%" }}
                        fontSize={{ xs: "2rem", lg: "3rem" }}
                        textAlign={{ xs: "center", lg: "left" }}
                    >
                        {featuredItem?.title}
                    </Typography>

                    <Typography
                        color="secondary.main"
                        fontSize={{ xs: "1.2rem" }}
                        textAlign={{ xs: "right", lg: "left" }}
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
                        alignSelf: { xs: "center", lg: "start" },
                        fontSize: { xs: "1.3rem", lg: "1rem" },
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
                width={{ xs: "100%", lg: "40%" }}
                mt={{ xs: 5, lg: 0 }}
                pl={{ xs: 0, lg: 5 }}
                pr={{ xs: 0, lg: 15 }}
                alignItems={{ xs: "center", lg: "end" }}
                spacing={{ xs: 0, md: 3, lg: 0 }}
                direction={{ xs: "column", md: "row-reverse", lg: "column" }}
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

                <Stack alignItems={{ xs: "center", md: "end" }}>
                    <Typography
                        textTransform="capitalize"
                        fontWeight="bold"
                        fontSize={{ xs: "1.3rem" }}
                    >
                        description
                    </Typography>
                    <Typography textAlign="right">
                        {featuredItem?.description}
                    </Typography>
                </Stack>
            </Stack>

            {lgScreen && (
                <>
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
                            position: { xs: "relative", lg: "absolute" },
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
                            variant="square"
                            sx={{
                                height: "100%",
                                width: "100%",
                            }}
                        />
                    </Box>
                </>
            )}

            <Stack
                sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    bgcolor: "secondary.main",
                    width: "500px",
                    height: { xs: "40px", lg: "50px" },
                    alignItems: "center",
                    justifyContent: "center",
                    transform: {
                        xs: "rotate(45deg) translateY(-110px) translateX(160px)",
                        lg: "rotate(45deg) translateY(-70px) translateX(160px)",
                    },
                    borderTop: `1px solid ${theme.palette.primary.main}`,
                    borderBottom: `1px solid ${theme.palette.primary.main}`,
                }}
            >
                <Typography
                    textTransform="capitalize"
                    fontSize={{ xs: "1rem", lg: "1.5rem" }}
                >
                    featured book
                </Typography>
            </Stack>
        </Stack>
    );
};

export default FeaturedItemBox;
