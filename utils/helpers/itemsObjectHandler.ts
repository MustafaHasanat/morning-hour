import { BooksObjectProps } from "@/context/items/itemsContextProvider";
import { Item } from "@/typess/item";

const itemsObjectToItemsArray = (booksObject: BooksObjectProps): Item[] => {
  const items: Item[] = [];

  Object.entries(booksObject).forEach((itemObj) => {
    const [_, item] = itemObj;
    items.push(item);
  });

  return items;
};

const filterBestSellingItems = (booksObject: BooksObjectProps): Item[] => {
  const items: Item[] = [];

  Object.entries(booksObject).forEach((itemObj) => {
    const [_, item] = itemObj;

    if (item.isBestSelling) items.push(item);
  });

  return items;
};

export { filterBestSellingItems, itemsObjectToItemsArray };
