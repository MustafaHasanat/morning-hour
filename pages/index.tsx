import DiscoverItems from "@/components/landingPage/discoverItems";
import FeaturedItemBox from "@/components/landingPage/featuredItemBox";
import BestSellingSlider from "@/components/shared/bestSellingSlider";
import SearchBox from "@/components/shared/searchBox";
import TitleBox from "@/components/shared/titleBox";
import { ItemsContext } from "@/context/items/itemsContext";
import { BooksObjectProps } from "@/context/items/itemsContextProvider";
import { Item } from "@/typess/item";
import themes from "@/utils/constants/themes";
import { getAllItems } from "@/utils/sanity/item";
import { Stack, useMediaQuery } from "@mui/material";
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
  const lgScreen = useMediaQuery(themes.MEDIA_QUERIES_HOOK.LG);

  useEffect(() => {
    localStorage.removeItem("splash");
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
    <Stack alignItems="center">
      <FeaturedItemBox />

      <Stack
        id="best-selling-section"
        px={{ xs: 2, lg: 10 }}
        py={0}
        mb={{ xs: 10 }}
        alignItems="center"
        width="100%"
      >
        <TitleBox
          title="best seller books"
          subTitle="check our selected collection of world-class books"
        />

        <BestSellingSlider />
      </Stack>

      {!lgScreen && <SearchBox />}

      <DiscoverItems items={items} />
    </Stack>
  );
}
