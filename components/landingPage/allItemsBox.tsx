import { Item } from "@/types/item";
import { Stack } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import ItemCard from "../shared/itemCard";
import { useSelector } from "react-redux";

interface AllItemsBoxProps {
    items: Item[];
}

const AllItemsBox = ({ items }: AllItemsBoxProps) => {
    const [filteredItems, setFilteredItems] = useState(items);

    const searchTerm = useSelector(
        (state: { itemsReducer: { searchTerm: string } }) =>
            state.itemsReducer.searchTerm
    );

    useEffect(() => {
        setFilteredItems(
            items.filter((item) => {
                if (
                    item.title.toLowerCase().includes(searchTerm.toLowerCase())
                ) {
                    return item;
                }
            })
        );
    }, [items, searchTerm]);

    return (
        <Stack
            px={10}
            py={5}
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
    );
};

export default AllItemsBox;
