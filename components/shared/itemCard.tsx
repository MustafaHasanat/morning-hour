import theme from "@/styles/theme";
import { Item } from "@/types/item";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import ExpandedWidget from "./expandedWidget";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { itemsActions } from "@/utils/store";
import { CartItemProps } from "@/utils/store/itemsSlice";

interface ItemCardProps {
    item: Item;
}

const ItemCard = ({ item }: ItemCardProps) => {
    const [isButtonHovered, setIsButtonHovered] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);

    const dispatch = useDispatch();
    const { whishList, cartItems } = useSelector(
        (state: {
            itemsReducer: { whishList: Item[]; cartItems: CartItemProps[] };
        }) => {
            return {
                whishList: state.itemsReducer.whishList,
                cartItems: state.itemsReducer.cartItems,
            };
        }
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

    const handleCartButton = () => {
        const matchedList = cartItems.filter((cartItem) => {
            if (cartItem.item._id === item._id) {
                return cartItem;
            }
        });

        if (matchedList.length === 0) {
            dispatch(itemsActions.addToCartItems({ item, quantity: 1 }));
        } else {
            dispatch(itemsActions.changeQuantCartItem({ item, sign: "+" }));
        }
    };

    const handleFavoriteButton = () => {
        const matchedList = whishList.filter((whishListItem) => {
            if (whishListItem._id === item._id) {
                return whishListItem;
            }
        });

        if (matchedList.length === 0) {
            dispatch(itemsActions.addToWhishList(item));
        } else {
            dispatch(itemsActions.deleteFromWhishList(item));
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
            overflow="hidden"
            sx={{
                transition: "0.3s ease",
                "&:hover": {
                    transform: "scale(1.1)",
                },
            }}
        >
            <Stack
                alignItems="center"
                sx={{
                    width: { xs: "10rem" },
                    height: { xs: "10em" },
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

                <Typography mt={{ xs: 2 }} fontSize={{ xs: "1.2rem" }}>
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
                        bgcolor={item.primaryColor}
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
                            ? theme.palette.primary.main
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
                initial={{ rotate: 45, y: -130, x: 130 }}
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
                    on wishlist{" "}
                </Typography>
            </Stack>
        </Stack>
    );
};

export default ItemCard;
