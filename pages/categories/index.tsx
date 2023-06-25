import CategoryCard from "@/components/categoryPage/categoryCard";
import SearchBox from "@/components/shared/searchBox";
import TitleBox from "@/components/shared/titleBox";
import { ItemsContext } from "@/context/items/itemsContext";
import { Category } from "@/types/category";
import { filterCategoriesByWord } from "@/utils/helpers/filterArrayByWord";
import { getAllCategories } from "@/utils/sanity/category";
import { Stack, useMediaQuery } from "@mui/material";
import { Fragment, useContext, useEffect, useState } from "react";

export const getStaticProps = async (): Promise<{
    props: {
        categories: Category[];
    };
}> => {
    const categories = await getAllCategories();

    return {
        props: { categories },
    };
};

interface Props {
    categories: Category[];
}

export default function Categories({ categories }: Props) {
    const [filteredCategories, setFilteredCategories] = useState(categories);
    const { searchTerm } = useContext(ItemsContext);
    const lgScreen = useMediaQuery("(min-width:1440px)");

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
