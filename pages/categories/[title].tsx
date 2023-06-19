import ItemCard from "@/components/shared/itemCard";
import TitleBox from "@/components/shared/titleBox";
import { Category } from "@/types/category";
import { Item } from "@/types/item";
import itemTitleSerializer from "@/utils/helpers/itemTitleSerializer";
import {
    getAllCategories,
    getCategoryByCondition,
} from "@/utils/sanity/category";
import { getItemsGroups } from "@/utils/sanity/item";
import { Avatar, Stack, Typography } from "@mui/material";
import { Fragment } from "react";

export const getStaticPaths = async () => {
    const categories = await getAllCategories();

    const paths = categories.map((category) => {
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
    props: { category: Category; books: Item[] };
}> => {
    const title = itemTitleSerializer(context.params.title, "normal");
    const category = await getCategoryByCondition({ title });
    const books = await getItemsGroups({
        categoryId: category._id,
    });

    return {
        props: { category, books },
    };
};

interface Props {
    category: Category;
    books: Item[];
}

export default function Product({ category, books }: Props) {
    return (
        <Stack alignItems="center" pt={8}>
            <Typography fontSize={{ xs: "3rem" }}>{category.title}</Typography>

            <Avatar
                variant="rounded"
                src={category.image.asset.url}
                sx={{
                    borderRadius: 3,
                    width: "20rem",
                    height: "20rem",
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
                {books?.map((item, index) => {
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
