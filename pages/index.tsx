import BestSellingItems from "@/components/landingPage/bestSellingItems";
import FeaturedItemBox from "@/components/landingPage/featuredItemBox";
import { Item } from "@/types/item";
import { getAllItems, getItemByCondition } from "@/utils/sanity/item";
import { itemsActions } from "@/utils/store";
import { Stack } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const getStaticProps = async (): Promise<{
    props: {
        items: Item[];
        featuredItem: Item;
    };
}> => {
    const items = await getAllItems();
    // get the one featured book
    const featuredItem = await getItemByCondition({
        id: "11ee9793-51b3-4aaa-bcab-2bde936934c2",
    });

    return {
        props: { items, featuredItem },
    };
};

interface HomeProps {
    items: Item[];
    featuredItem: Item;
}

export default function Home({ items, featuredItem }: HomeProps) {
    const dispatch = useDispatch();

    useEffect(() => {
        window.localStorage.removeItem("splash");
    }, []);

    useEffect(() => {
        dispatch(itemsActions.setBestSelling(items));
    }, [dispatch, items]);

    return (
        <Stack>
            <FeaturedItemBox item={featuredItem} />
            <BestSellingItems items={items} />
        </Stack>
    );
}
