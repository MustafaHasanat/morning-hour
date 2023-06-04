import { Item } from "@/types/item";
import { Box, Stack, Typography } from "@mui/material";
import { Fragment, useEffect, useRef, useState } from "react";
import ItemCard from "../shared/itemCard";
import { useSelector } from "react-redux";
import filterArrayByWord from "@/utils/helpers/filterArrayByWord";
import { motion, useInView } from "framer-motion";
import TitleBox from "../shared/titleBox";

interface DiscoverItemsProps {
    items: Item[];
}

const DiscoverItems = ({ items }: DiscoverItemsProps) => {
    const [filteredItems, setFilteredItems] = useState(items);

    const discoverItemsRef = useRef(null);
    const discoverItemsInView = useInView(discoverItemsRef);

    const { searchTerm } = useSelector(
        (state: { itemsReducer: { searchTerm: string } }) => {
            return {
                searchTerm: state.itemsReducer.searchTerm,
            };
        }
    );

    useEffect(() => {
        setFilteredItems(
            filterArrayByWord({
                array: items,
                arrayType: "item",
                searchTerm,
            })
        );
    }, [items, searchTerm]);

    return (
        <Stack
            id="discover-items-section"
            px={10}
            py={5}
            mb={{ xs: 10 }}
            alignItems="center"
        >
            <TitleBox
                title="discover more books"
                subTitle="take a tour in our bookstore"
            />

            <Stack
                direction="row"
                flexWrap="wrap"
                gap={10}
                justifyContent="center"
            >
                {[
                    ...filteredItems,
                    ...filteredItems,
                    ...filteredItems,
                    ...filteredItems,
                ].map((item, index) => {
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

export default DiscoverItems;
