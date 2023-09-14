import AuthorCard from "@/components/authorsPage/authorCard";
import SearchBox from "@/components/shared/searchBox";
import TitleBox from "@/components/shared/titleBox";
import { ItemsContext } from "@/context/items/itemsContext";
import { Author } from "@/types/author";
import { filterAuthorsByWord } from "@/utils/helpers/filterArrayByWord";
import { Stack, useMediaQuery } from "@mui/material";
import { Fragment, useContext, useEffect, useState } from "react";
import getAuthors from "../api/authors/getAuthors";
import assets from "@/utils/constants/assets";

export const getStaticProps = async (): Promise<{
  props: {
    authors: Author[];
  };
}> => {
  const authors = await getAuthors();
  const newAuthors = authors.data.data.map((author: Author) => {
    return {
      ...author,
      image: assets.BACKEND_IMAGE_URL("authors", author.image),
    };
  });

  return {
    props: { authors: newAuthors },
  };
};

interface Props {
  authors: Author[];
}

export default function Authors({ authors }: Props) {
  const [filteredAuthors, setFilteredAuthors] = useState(authors);
  const { searchTerm } = useContext(ItemsContext);
  const lgScreen = useMediaQuery("(min-width:1440px)");

  useEffect(() => {
    setFilteredAuthors(
      filterAuthorsByWord({
        array: authors,
        searchTerm,
      })
    );
  }, [authors, searchTerm]);

  return (
    <Stack pt={10} px={5} alignItems="center">
      <TitleBox
        title="authors list"
        subTitle="choose your next book by your favorite author"
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
        {filteredAuthors?.map((author, index) => {
          return (
            <Fragment key={`author card number: ${index}`}>
              <AuthorCard author={author} />
            </Fragment>
          );
        })}
      </Stack>
    </Stack>
  );
}
