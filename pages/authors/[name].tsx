import ItemCard from "@/components/shared/itemCard";
import TitleBox from "@/components/shared/titleBox";
import { Author } from "@/types/author";
import { Item } from "@/typess/item";
import itemTitleSerializer from "@/utils/helpers/itemTitleSerializer";
import { getItemsGroups } from "@/utils/sanity/item";
import { Avatar, Stack, Typography } from "@mui/material";
import { Fragment } from "react";
import getAuthors from "../api/authors/getAuthors";
import getAuthorsByCondition from "../api/authors/getAuthorsByCondition";
import useUpdateImage from "@/hooks/useUpdateImage";
import assets from "@/utils/constants/assets";

export const getStaticPaths = async () => {
  const authors = await getAuthors();

  const paths = authors.data.data.map((author: Author) => {
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
  const author = await getAuthorsByCondition({ name });
  const newAuthor = {
    ...author.data[0],
    image: assets.BACKEND_IMAGE_URL("authors", author.data[0].image),
  };

  const books = await getItemsGroups({
    authorId: newAuthor.id,
  });

  return {
    props: { author: newAuthor, books },
  };
};

interface Props {
  author: Author;
  books: Item[];
}

export default function Product({ author, books }: Props) {
  const avatarUrl = useUpdateImage({
    imageUrl: author.image,
    placeholderImage: "/" + assets.PLACEHOLDER_IMAGE,
  });

  return (
    <Stack alignItems="center">
      <Stack direction={{ xs: "column", lg: "row" }} pt={10} pb={5} px={15}>
        <Avatar
          variant="rounded"
          src={avatarUrl}
          sx={{
            borderRadius: 3,
            width: { xs: "80vw", md: "20rem" },
            height: { xs: "80vw", md: "20rem" },
            mr: { lg: 5 },
          }}
        />

        <Stack>
          <Typography fontSize={{ xs: "3rem" }}>{author.name}</Typography>

          <Typography fontSize={{ xs: "1.2rem" }} mb={{ xs: 5 }}>
            {author.brief}
          </Typography>
        </Stack>
      </Stack>

      <TitleBox title="Books" subTitle={`a list of ${author.name}'s books`} />

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
