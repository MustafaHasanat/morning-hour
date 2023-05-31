import { Item } from "@/types/item";
import { Stack, Typography } from "@mui/material";
import { Fragment, useEffect, useRef, useState } from "react";
import ItemCard from "../shared/itemCard";
import { useSelector } from "react-redux";
import filterArrayByWord from "@/utils/helpers/filterArrayByWord";
import { motion, useInView } from "framer-motion";

interface AllItemsBoxProps {
    items: Item[];
}

const BestSellingItems = ({ items }: AllItemsBoxProps) => {
    const [filteredItems, setFilteredItems] = useState(items);

    const bestSellingRef = useRef(null);
    const bestSellingInView = useInView(bestSellingRef);

    const { bestSelling, searchTerm } = useSelector(
        (state: {
            itemsReducer: { bestSelling: Item[]; searchTerm: string };
        }) => {
            return {
                bestSelling: state.itemsReducer.bestSelling,
                searchTerm: state.itemsReducer.searchTerm,
            };
        }
    );

    useEffect(() => {
        setFilteredItems(
            filterArrayByWord({
                array: bestSelling,
                arrayType: "item",
                searchTerm,
            })
        );
    }, [bestSelling, searchTerm]);

    return (
        <Stack
            px={10}
            py={5}
            mb={{ xs: 10 }}
            alignItems="center"
            id="best-selling-section"
        >
            <Stack
                component={motion.div}
                ref={bestSellingRef}
                initial={{
                    y: 100,
                    opacity: 0,
                }}
                animate={{
                    y: bestSellingInView ? 0 : 80,
                    opacity: bestSellingInView ? 1 : 0,
                    transition: {
                        duration: 1,
                    },
                }}
                mb={{ xs: 10 }}
                alignItems="center"
            >
                <Typography
                    textTransform="capitalize"
                    fontSize={{ xs: "3rem" }}
                    color="primary"
                >
                    best seller books
                </Typography>

                <Typography fontSize={{ xs: "1.3rem" }} color="secondary">
                    check our selected collection of world-class books
                </Typography>
            </Stack>

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
    );
};

export default BestSellingItems;
