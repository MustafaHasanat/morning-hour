import DiscoverItems from "@/components/landingPage/discoverItems";
import FeaturedItemBox from "@/components/landingPage/featuredItemBox";
import BestSellingSlider from "@/components/shared/bestSellingSlider";
import TitleBox from "@/components/shared/titleBox";
import { ItemsContext } from "@/context/items/itemsContext";
import { BooksObjectProps } from "@/context/items/itemsContextProvider";
import { Item } from "@/types/item";
import { getAllItems } from "@/utils/sanity/item";
import { Stack } from "@mui/material";
import { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";

export const getStaticProps = async (): Promise<{
    props: {
        items: Item[];
    };
}> => {
    const items = await getAllItems();

    return {
        props: { items },
    };
};

interface HomeProps {
    items: Item[];
}

export default function Home({ items }: HomeProps) {
    const dispatch = useDispatch();
    const { setBooksObject } = useContext(ItemsContext);

    useEffect(() => {
        window.localStorage.removeItem("splash");
    }, []);

    // set the context
    useEffect(() => {
        const booksObject: BooksObjectProps = {};

        items.forEach((item) => {
            booksObject[`${item._id}`] = item;
        });

        setBooksObject(booksObject);
    }, [items, setBooksObject]);

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
            <FeaturedItemBox />

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

            <DiscoverItems />
        </Stack>
    );
}
