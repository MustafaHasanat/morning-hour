import { Item } from "@/types/item";
import filterArrayByWord from "@/utils/helpers/filterArrayByWord";
import { Button, Stack, Typography } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ItemCard from "../shared/itemCard";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { itemsActions } from "@/utils/store";

const WishlistPage = () => {
    const { whishList, searchTerm } = useSelector(
        (state: {
            itemsReducer: { whishList: Item[]; searchTerm: string };
        }) => {
            return {
                whishList: state.itemsReducer.whishList,
                searchTerm: state.itemsReducer.searchTerm,
            };
        }
    );

    const dispatch = useDispatch();
    const [filteredItems, setFilteredItems] = useState(whishList);

    useEffect(() => {
        setFilteredItems(
            filterArrayByWord({
                array: whishList,
                arrayType: "item",
                searchTerm,
            })
        );
    }, [searchTerm, whishList]);

    const handleClearButton = () => {
        dispatch(itemsActions.setWhishList([]));
    };

    return (
        <Stack px={{ xs: 10 }} py={{ xs: 10 }} alignItems="center">
            <Typography
                mb={2}
                fontSize={{ xs: "3rem" }}
                color="primary"
                textTransform="capitalize"
            >
                {filteredItems.length !== 0
                    ? "your wishlist items"
                    : "your wishlist is empty!"}
            </Typography>

            {filteredItems.length === 0 ? (
                <Stack mb={5} spacing={5} alignItems="center">
                    <Typography fontSize={{ xs: "1.5rem" }} color="secondary">
                        go add some items to your wishlist
                    </Typography>

                    <AutoAwesomeIcon
                        color="primary"
                        sx={{
                            width: "5rem",
                            height: "5rem",
                        }}
                    />
                </Stack>
            ) : (
                <Stack spacing={5} alignItems="center">
                    <Button
                        variant="outlined"
                        endIcon={<DeleteRoundedIcon />}
                        sx={{
                            my: 1,
                            textTransform: "lowercase",
                            width: "fit-content",
                            fontSize: {xs: "1.2rem"}
                        }}
                        onClick={handleClearButton}
                        color="secondary"
                    >
                        clear wishlist
                    </Button>

                    <Stack
                        direction="row"
                        flexWrap="wrap"
                        spacing={10}
                        justifyContent="center"
                    >
                        {filteredItems.map((item, index) => {
                            return (
                                <Fragment key={`${index}`}>
                                    <ItemCard item={item} />
                                </Fragment>
                            );
                        })}
                    </Stack>
                </Stack>
            )}
        </Stack>
    );
};

export default WishlistPage;
