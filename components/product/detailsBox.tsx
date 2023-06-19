import { Box, Button, Stack, Typography } from "@mui/material";
import { CartItem, Item } from "@/types/item";
import StarIcon from "@mui/icons-material/Star";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Review } from "@/types/review";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import {
    addToCart,
    addToWishlist,
    changeQuantCartItem,
    removeFromWishlist,
} from "@/utils/sanity/user";
import { User } from "@/types/user";
import { ItemsContext } from "@/context/items/itemsContext";

interface DetailsBoxProps {
    item: Item;
    reviews: Review[];
    isFavorite: boolean;
    user: User | null;
    setIsFavorite: Dispatch<SetStateAction<boolean>>;
}

const DetailsBox = ({
    item,
    reviews,
    isFavorite,
    setIsFavorite,
    user,
}: DetailsBoxProps) => {
    const itemRating = Math.floor(
        reviews.reduce((summation, review) => {
            return summation + review.rating;
        }, 0) / reviews.length
    );

    const { cartItems } = useContext(ItemsContext);

    const [cartItem, setCartItem] = useState<CartItem>(
        cartItems.filter((cartItemObj) => {
            if (cartItemObj.item._id === item._id) {
                return cartItemObj;
            }
        })[0]
    );

    const handleCartButton = () => {
        if (user) {
            const matchedList = cartItems.filter((cartItem) => {
                if (cartItem.item._id === item._id) {
                    return cartItem;
                }
            });

            if (matchedList.length === 0) {
                addToCart({
                    userId: user._id,
                    itemId: `${item?._id}`,
                });
            } else {
                changeQuantCartItem({
                    userId: user._id,
                    itemId: `${item._id}`,
                    sign: "+",
                    curQuant: cartItem.quantity,
                });
            }
        }
    };

    const handleFavoriteButton = () => {
        if (user) {
            if (isFavorite) {
                // remove the item from wishlist
                setIsFavorite(false);
                removeFromWishlist({
                    userId: user._id,
                    itemId: `${item?._id}`,
                });
            } else {
                // add the item to wishlist
                setIsFavorite(true);
                addToWishlist({
                    userId: user._id,
                    itemId: `${item?._id}`,
                });
            }
        }
    };

    //TODO: fire a snackbar once the item is added to the cart

    return (
        <Stack width={{ xs: "100%" }} px={{ xs: 8 }}>
            <Stack>
                <Typography fontSize={{ xs: "3rem" }}>{item.title}</Typography>

                <Typography fontSize={{ xs: "1.2rem" }} mb={{ xs: 5 }}>
                    {item.description}
                </Typography>

                <Stack
                    direction="row"
                    spacing={{ xs: 1 }}
                    mb={{ xs: 3 }}
                    alignItems="center"
                >
                    <Typography
                        textTransform="capitalize"
                        fontSize={{ xs: "1.6rem" }}
                    >
                        rating:
                    </Typography>

                    <Stack direction="row">
                        {Array(5)
                            .fill(0)
                            .map((_, index) => {
                                return (
                                    <Box
                                        key={`rating start for ${item.title} number ${index}`}
                                        sx={{
                                            width: "2.5rem",
                                            height: "2.5rem",
                                        }}
                                    >
                                        <StarIcon
                                            sx={{
                                                width: "100%",
                                                height: "100%",
                                                opacity:
                                                    index >= itemRating
                                                        ? 0.2
                                                        : 1,
                                                color:
                                                    index >= itemRating || reviews.length === 0
                                                        ? "#808080"
                                                        : "#ffd700",
                                            }}
                                        />
                                    </Box>
                                );
                            })}
                    </Stack>

                    {reviews.length === 0 && (
                        <Typography fontSize={{ xs: "1.2rem" }}>
                            (nothing yet)
                        </Typography>
                    )}
                </Stack>

                <Stack direction="row" spacing={{ xs: 3 }} alignItems="center">
                    <Typography
                        textTransform="capitalize"
                        fontSize={{ xs: "1.6rem" }}
                    >
                        price:
                    </Typography>

                    <Stack
                        direction="row"
                        spacing={2}
                        mt={{ xs: 2 }}
                        alignItems="center"
                    >
                        {item.oldPrice !== 0 && (
                            <Typography
                                fontWeight="bold"
                                fontSize={{ xs: "1.2rem" }}
                                sx={{
                                    opacity: 0.5,
                                    textDecoration: "line-through",
                                }}
                            >
                                {item.oldPrice} JOD
                            </Typography>
                        )}

                        <Typography
                            fontWeight="bold"
                            fontSize={{ xs: "1.2rem" }}
                        >
                            {item.currentPrice} JOD
                        </Typography>
                    </Stack>
                </Stack>

                <Button
                    variant="contained"
                    endIcon={
                        <ShoppingCartRoundedIcon
                            sx={{ width: "2rem", height: "1.5rem" }}
                        />
                    }
                    onClick={handleCartButton}
                    sx={{
                        fontSize: { xs: "1.3rem" },
                        my: 1,
                        textTransform: "lowercase",
                        width: "fit-content",
                        mt: 10,
                        alignSelf: "end",
                    }}
                >
                    add to cart
                </Button>

                <Button
                    variant="outlined"
                    endIcon={
                        <FavoriteIcon
                            sx={{ width: "2rem", height: "1.5rem" }}
                        />
                    }
                    onClick={handleFavoriteButton}
                    sx={{
                        fontSize: { xs: "1.3rem" },
                        my: 1,
                        textTransform: "lowercase",
                        width: "fit-content",
                        alignSelf: "end",
                    }}
                >
                    {isFavorite ? "remove from wishlist" : "add to wishlist"}
                </Button>
            </Stack>
        </Stack>
    );
};

export default DetailsBox;
