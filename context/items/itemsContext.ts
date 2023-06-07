import { Context, createContext } from "react";
import { BooksObjectProps } from "./itemsContextProvider";

export const ItemsContext: Context<{
    searchTerm: string;
    setSearchTerm: (searchTerm: string) => void;
    booksObject: BooksObjectProps;
    setBooksObject: (booksObject: BooksObjectProps) => void;
}> = createContext({
    searchTerm: "",
    setSearchTerm: (searchTerm: string) => {},
    booksObject: {},
    setBooksObject: (booksObject: BooksObjectProps) => {},
});
