import { Author } from "@/types/author";
import { Category } from "@/types/category";
import { Item } from "@/typess/item";

export const filterItemsByWord = ({
  array,
  searchTerm,
}: {
  array: Item[];
  searchTerm: string;
}) => {
  return array.filter((item) => {
    if (item.title.toLowerCase().includes(searchTerm.toLowerCase())) {
      return item;
    }
  });
};

export const filterAuthorsByWord = ({
  array,
  searchTerm,
}: {
  array: Author[];
  searchTerm: string;
}) => {
  return array.filter((author) => {
    if (author.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return author;
    }
  });
};

export const filterCategoriesByWord = ({
  array,
  searchTerm,
}: {
  array: Category[];
  searchTerm: string;
}) => {
  return array.filter((category) => {
    if (category.title.toLowerCase().includes(searchTerm.toLowerCase())) {
      return category;
    }
  });
};
