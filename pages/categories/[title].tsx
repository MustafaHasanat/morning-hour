import ItemCard from "@/components/shared/itemCard";
import TitleBox from "@/components/shared/titleBox";
import itemTitleSerializer from "@/utils/helpers/itemTitleSerializer";
import { Avatar, Stack, Typography } from "@mui/material";
import { Fragment } from "react";
import getItemsByCondition from "../api/items/getItemsByCondition";
import getCategoriesByCondition from "../api/categories/getCategoriesByCondition";
import getCategories from "../api/categories/getcategories";
import assets from "@/utils/constants/assets";
import { Category } from "@/types/category";
import { Item } from "@/types/item";

export const getStaticPaths = async () => {
  const categories = await getCategories();

  const paths = categories.data.map((category: Category) => {
    return {
      params: {
        title: itemTitleSerializer(category.title, "underscored"),
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context: {
  params: { title: string };
}): Promise<{
  props: { category: Category; items: Item[] };
}> => {
  const title = itemTitleSerializer(context.params.title, "normal");
  const category = await getCategoriesByCondition({ title });
  const newCategory = {
    ...category.data[0],
    image: assets.BACKEND_IMAGE_URL("categories", category.data[0].image),
  };
  const items = await getItemsByCondition({
    categoryId: newCategory.id,
  });

  return {
    props: { category: newCategory, items: items.data || [] },
  };
};

interface Props {
  category: Category;
  items: Item[];
}

export default function Product({ category, items }: Props) {
  return (
    <Stack alignItems="center" pt={8}>
      <Typography fontSize={{ xs: "2rem", md: "3rem" }}>
        {category.title}
      </Typography>

      <Avatar
        variant="rounded"
        src={category.image}
        sx={{
          borderRadius: 3,
          width: { xs: "80vw", md: "20rem" },
          height: { xs: "80vw", md: "20rem" },
          mt: 3,
          mb: 8,
        }}
      />

      <TitleBox
        title="Books"
        subTitle={`a list of "${category.title}" books`}
      />

      <Stack
        direction="row"
        flexWrap="wrap"
        gap={10}
        justifyContent="center"
        mb={15}
      >
        {items?.map((item, index) => {
          return (
            <Fragment key={`category item card number: ${index}`}>
              <ItemCard item={item} />
            </Fragment>
          );
        })}
      </Stack>
    </Stack>
  );
}
