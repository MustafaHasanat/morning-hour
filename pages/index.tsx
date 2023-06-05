import DiscoverItems from "@/components/landingPage/discoverItems";
import FeaturedItemBox from "@/components/landingPage/featuredItemBox";
import BestSellingSlider from "@/components/shared/bestSellingSlider";
import TitleBox from "@/components/shared/titleBox";
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
        localStorage.setItem(
            "best-selling-items",
            JSON.stringify({
                items: items.map((item) => item._id),
            })
        );
    }, [dispatch, items]);

    return (
        <Stack>
            <FeaturedItemBox item={featuredItem} />

            <Stack
                id="best-selling-section"
                px={10}
                py={0}
                mb={{ xs: 10 }}
                alignItems="center"
            >
                <TitleBox
                    title="best seller books"
                    subTitle="check our selected collection of world-class books"
                />

                <BestSellingSlider />
            </Stack>

            <DiscoverItems items={items} />
        </Stack>
    );
}
