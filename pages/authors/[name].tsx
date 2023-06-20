import ItemCard from "@/components/shared/itemCard";
import TitleBox from "@/components/shared/titleBox";
import { Author } from "@/types/author";
import { Item } from "@/types/item";
import itemTitleSerializer from "@/utils/helpers/itemTitleSerializer";
import { getAllAuthors, getAuthorByCondition } from "@/utils/sanity/author";
import { getItemsGroups } from "@/utils/sanity/item";
import { Avatar, Stack, Typography } from "@mui/material";
import { Fragment } from "react";

export const getStaticPaths = async () => {
    const authors = await getAllAuthors();

    const paths = authors.map((author) => {
        return {
            params: { name: itemTitleSerializer(author.name, "underscored") },
        };
    });

    return {
        paths,
        fallback: false,
    };
};

export const getStaticProps = async (context: {
    params: { name: string };
}): Promise<{
    props: { author: Author; books: Item[] };
}> => {
    const name = itemTitleSerializer(context.params.name, "normal");
    const author = await getAuthorByCondition({ name });
    const books = await getItemsGroups({
        authorId: author._id,
    });

    return {
        props: { author, books },
    };
};

interface Props {
    author: Author;
    books: Item[];
}

export default function Product({ author, books }: Props) {
    return (
        <Stack alignItems="center">
            <Stack
                direction={{ xs: "column", lg: "row" }}
                pt={10}
                pb={5}
                px={15}
            >
                <Avatar
                    variant="rounded"
                    src={author.image.asset.url}
                    sx={{
                        borderRadius: 3,
                        width: { xs: "80vw", md: "20rem" },
                        height: { xs: "80vw", md: "20rem" },
                        mr: { lg: 5 },
                    }}
                />

                <Stack>
                    <Typography fontSize={{ xs: "3rem" }}>
                        {author.name}
                    </Typography>

                    <Typography fontSize={{ xs: "1.2rem" }} mb={{ xs: 5 }}>
                        {author.brief}
                    </Typography>
                </Stack>
            </Stack>

            <TitleBox
                title="Books"
                subTitle={`a list of ${author.name}'s books`}
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
                        <Fragment key={`author item card number: ${index}`}>
                            <ItemCard item={item} />
                        </Fragment>
                    );
                })}
            </Stack>
        </Stack>
    );
}
