import DiscoverItems from "@/components/landingPage/discoverItems";
import FeaturedItemBox from "@/components/landingPage/featuredItemBox";
import BestSellingSlider from "@/components/shared/bestSellingSlider";
import TitleBox from "@/components/shared/titleBox";
import { ItemsContext } from "@/context/items/itemsContext";
import { BooksObjectProps } from "@/context/items/itemsContextProvider";
import { Item } from "@/types/item";
import sanityUserToLocalUser from "@/utils/helpers/sanityUserToLocalUser";
import { getAllItems } from "@/utils/sanity/item";
import { getUserByCondition } from "@/utils/sanity/user";
import { Stack } from "@mui/material";
import { useContext, useEffect } from "react";

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
    const { setBooksObject } = useContext(ItemsContext);

    useEffect(() => {
        localStorage.removeItem("splash");

        const getUser = async () => {
            const userCookie = localStorage.getItem("user");

            if (userCookie) {
                const localUser = JSON.parse(userCookie);
                const sanityUser = await getUserByCondition({
                    id: localUser.id,
                });

                localStorage.setItem(
                    "user",
                    JSON.stringify(sanityUserToLocalUser(sanityUser))
                );
            }
        };

        getUser();
    }, []);

    // set the context
    useEffect(() => {
        const booksObject: BooksObjectProps = {};

        items.forEach((item) => {
            booksObject[`${item._id}`] = item;
        });

        setBooksObject(booksObject);
    }, [items, setBooksObject]);

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
