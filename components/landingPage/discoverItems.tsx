import { Item } from "@/types/item";
import { Stack } from "@mui/material";
import { Fragment, useContext, useEffect, useState } from "react";
import ItemCard from "../shared/itemCard";
import { filterItemsByWord } from "@/utils/helpers/filterArrayByWord";
import TitleBox from "../shared/titleBox";
import { ItemsContext } from "@/context/items/itemsContext";

const DiscoverItems = ({ items }: { items: Item[] }) => {
    const [filteredItems, setFilteredItems] = useState(items);
    const { searchTerm } = useContext(ItemsContext);

    useEffect(() => {
        setFilteredItems(
            filterItemsByWord({
                array: items,
                searchTerm,
            })
        );
    }, [items, searchTerm]);

    return (
        <Stack
            id="discover-items-section"
            px={{ xs: 2, lg: 10 }}
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
                {filteredItems.map((item, index) => {
                    return (
                        <Fragment key={`discover item number: ${index}`}>
                            <ItemCard item={item} />
                        </Fragment>
                    );
                })}
            </Stack>
        </Stack>
    );
};

export default DiscoverItems;
