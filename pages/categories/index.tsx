import CategoryCard from "@/components/categoryPage/categoryCard";
import SearchBox from "@/components/shared/searchBox";
import TitleBox from "@/components/shared/titleBox";
import { ItemsContext } from "@/context/items/itemsContext";
import { Category } from "@/types/category";
import { filterCategoriesByWord } from "@/utils/helpers/filterArrayByWord";
import { Stack, useMediaQuery } from "@mui/material";
import { Fragment, useContext, useEffect, useState } from "react";
import getCategories from "../api/categories/getcategories";
import assets from "@/utils/constants/assets";
import themes from "@/utils/constants/themes";

export const getStaticProps = async (): Promise<{
  props: {
    categories: Category[];
  };
}> => {
  const categories = await getCategories();
  const newCategories = categories.data.map((category: Category) => {
    return {
      ...category,
      image: assets.BACKEND_IMAGE_URL("categories", category.image),
    };
  });

  return {
    props: { categories: newCategories },
  };
};

interface Props {
  categories: Category[];
}

export default function Categories({ categories }: Props) {
  const [filteredCategories, setFilteredCategories] = useState(categories);
  const { searchTerm } = useContext(ItemsContext);
  const lgScreen = useMediaQuery(themes.MEDIA_QUERIES_HOOK.LG);

  useEffect(() => {
    setFilteredCategories(
      filterCategoriesByWord({
        array: categories,
        searchTerm,
      })
    );
  }, [categories, searchTerm]);

  return (
    <Stack pt={10} px={5} alignItems="center">
      <TitleBox
        title="categories list"
        subTitle="choose your next book based on your preferred genre"
      />

      {!lgScreen && <SearchBox />}

      <Stack
        pt={5}
        pb={10}
        px={10}
        direction="row"
        flexWrap="wrap"
        gap={10}
        justifyContent="center"
      >
        {filteredCategories?.map((category, index) => {
          return (
            <Fragment key={`author card number: ${index}`}>
              <CategoryCard category={category} />
            </Fragment>
          );
        })}
      </Stack>
    </Stack>
  );
}
