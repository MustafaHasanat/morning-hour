import theme from "@/styles/theme";
import { Item } from "@/types/item";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import ExpandedWidget from "./expandedWidget";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import itemTitleSerializer from "@/utils/helpers/itemTitleSerializer";
import { getCookieWithExpiry } from "@/utils/helpers/cookieHandler";
import { ItemsContext } from "@/context/items/itemsContext";

interface ItemCardProps {
    item: Item;
}

const ItemCard = ({ item }: ItemCardProps) => {
    const router = useRouter();
    const [isButtonHovered, setIsButtonHovered] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const {
        cartItems,
        addToCartItems,
        changeQuantCartItem,
        addToWishlist,
        deleteFromWishlist,
    } = useContext(ItemsContext);

    useEffect(() => {
        const whishList: string[] | null = getCookieWithExpiry("whishList");

        if (whishList) {
            const matchedList = whishList.filter((itemId) => {
                if (itemId === item._id) {
                    return itemId;
                }
            });

            if (matchedList.length !== 0) {
                setIsFavorite(true);
            } else {
                setIsFavorite(false);
            }
        }
    }, [item._id]);

    const handleCartButton = () => {
        const matchedList = cartItems.filter((cartItem) => {
            if (cartItem.item._id === item._id) {
                return cartItem;
            }
        });

        if (matchedList.length === 0) {
            addToCartItems({ item, quantity: 1 });
        } else {
            changeQuantCartItem(item._id, "+");
        }
    };

    const handleFavoriteButton = () => {
        if (isFavorite) {
            // remove the item from wishlist
            setIsFavorite(false);
            deleteFromWishlist(item._id);
        } else {
            // add the item to wishlist
            setIsFavorite(true);
            addToWishlist(item);
        }
    };

    return (
        <Stack
            p={{ xs: "1rem" }}
            width={{ xs: "15rem" }}
            height={{ xs: "23rem" }}
            bgcolor="background.default"
            borderRadius={2}
            justifyContent="space-between"
            alignItems="center"
            boxShadow={`5px 5px 15px 1px ${theme.palette.primary.main}`}
            position="relative"
            sx={{
                overflow: "hidden",
                transition: "0.3s ease",
                "&:hover": {
                    transform: "scale(1.1)",
                },
            }}
        >
            <Stack
                component="div"
                alignItems="center"
                sx={{
                    cursor: "pointer",
                    width: { xs: "10rem" },
                    height: { xs: "10em" },
                    transition: "0.3s ease",

                    "&:hover": {
                        opacity: 0.5,
                    },
                }}
                onClick={() => {
                    router.push(
                        `/product/${itemTitleSerializer(
                            item.title,
                            "underscored"
                        )}`
                    );
                }}
            >
                <Avatar
                    variant="rounded"
                    src={item.image.asset.url}
                    alt={`main card: ${item.title}`}
                    sx={{
                        width: "fit-content",
                        height: "100%",
                    }}
                />

                <Typography
                    mt={{ xs: 2 }}
                    fontSize={{ xs: "1.2rem" }}
                    textAlign="center"
                >
                    {item.title}
                </Typography>

                <Stack direction="row" spacing={2} mt={{ xs: 2 }}>
                    {item.oldPrice !== 0 && (
                        <Typography
                            fontWeight="bold"
                            fontSize={{ xs: "1rem" }}
                            sx={{
                                opacity: 0.5,
                                textDecoration: "line-through",
                            }}
                        >
                            {item.oldPrice} JOD
                        </Typography>
                    )}

                    <Typography fontWeight="bold" fontSize={{ xs: "1rem" }}>
                        {item.currentPrice} JOD
                    </Typography>
                </Stack>
            </Stack>

            <Stack width="100%" position="relative">
                <Box
                    sx={{
                        width: isButtonHovered ? "13rem" : "4rem",
                        transition: "0.3s ease",
                    }}
                >
                    <ExpandedWidget
                        isOpened={isButtonHovered}
                        content={
                            <Stack
                                sx={{
                                    width: isButtonHovered ? "7rem" : "0px",
                                    overflow: "hidden",
                                    transition: "0.3s ease",
                                }}
                            >
                                <Typography width="7rem">
                                    add to cart
                                </Typography>
                            </Stack>
                        }
                        icon={
                            <ShoppingCartRoundedIcon
                                onMouseEnter={() => {
                                    setIsButtonHovered(true);
                                }}
                                onMouseLeave={() => {
                                    setIsButtonHovered(false);
                                }}
                                sx={{
                                    cursor: "pointer",
                                    height: "80%",
                                    width: "80%",
                                }}
                            />
                        }
                        iconOnClick={handleCartButton}
                        colorHovered={item.primaryColor}
                        extraSX={{
                            cursor: "unset",
                        }}
                    />
                </Box>

                <Box
                    component={motion.div}
                    initial={{
                        y: "-50%",
                        color: theme.palette.secondary.main,
                        opacity: 0.5,
                    }}
                    animate={{
                        opacity: isFavorite ? 1 : 0.5,
                        color: isFavorite
                            ? item.primaryColor
                            : theme.palette.secondary.main,
                    }}
                    whileHover={{
                        opacity: 1,
                        scale: 1.4,
                    }}
                    whileTap={{
                        opacity: 1,
                        scale: 0.6,
                    }}
                    transition={{
                        type: "spring",
                        duration: 0.6,
                    }}
                    sx={{
                        position: "absolute",
                        right: 0,
                        top: "50%",
                        width: "2rem",
                        height: "2rem",
                        cursor: "pointer",
                    }}
                    onClick={handleFavoriteButton}
                >
                    <FavoriteIcon
                        sx={{
                            width: "100%",
                            height: "100%",
                        }}
                    />
                </Box>
            </Stack>

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
                    height: "40px",
                    alignItems: "center",
                    justifyContent: "center",
                    borderTop: `1px solid ${theme.palette.primary.main}`,
                    borderBottom: `1px solid ${theme.palette.primary.main}`,
                }}
            >
                <Typography
                    textTransform="capitalize"
                    fontSize={{ xs: "1rem" }}
                >
                    on wishlist
                </Typography>
            </Stack>
        </Stack>
    );
};

export default ItemCard;
