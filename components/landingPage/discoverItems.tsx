import { Item } from "@/types/item";
import { Stack } from "@mui/material";
import { Fragment, useContext, useEffect, useState } from "react";
import ItemCard from "../shared/itemCard";
import filterArrayByWord from "@/utils/helpers/filterArrayByWord";
import TitleBox from "../shared/titleBox";
import { ItemsContext } from "@/context/items/itemsContext";
import { itemsObjectToItemsArray } from "@/utils/helpers/itemsObjectHandler";

const DiscoverItems = () => {
    const [filteredItems, setFilteredItems] = useState<Item[]>([]);
    const { booksObject, searchTerm } = useContext(ItemsContext);

    useEffect(() => {
        const items = itemsObjectToItemsArray(booksObject);
        
        setFilteredItems(
            filterArrayByWord({
                array: items,
                arrayType: "item",
                searchTerm,
            })
        );
    }, [booksObject, searchTerm]);

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
