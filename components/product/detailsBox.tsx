import { Box, Button, Stack, Typography } from "@mui/material";
import { Item } from "@/types/item";
import StarIcon from "@mui/icons-material/Star";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useDispatch, useSelector } from "react-redux";
import { CartItemProps } from "@/utils/store/itemsSlice";
import { itemsActions } from "@/utils/store";

interface DetailsBoxProps {
    item: Item;
}

const DetailsBox = ({ item }: DetailsBoxProps) => {
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

                    {Array(
                        !item.reviews
                            ? 5
                            : Math.floor(
                                  item.reviews.reduce((summation, review) => {
                                      return summation + review.rating;
                                  }, 0) / item.reviews.length
                              )
                    )
                        .fill(0)
                        .map((val, index) => {
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
                                            opacity: !item.reviews ? 0.2 : 1,
                                            color: !item.reviews
                                                ? "gray"
                                                : "gold",
                                        }}
                                    />
                                </Box>
                            );
                        })}

                    {!item.reviews && (
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
                    add to wishlist
                </Button>
            </Stack>
        </Stack>
    );
};

export default DetailsBox;
