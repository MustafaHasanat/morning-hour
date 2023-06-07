import { ReactNode, useMemo, useState } from "react";
import { ItemsContext } from "./itemsContext";
import { Item } from "@/types/item";

type Props = {
    children: ReactNode;
};

export interface BooksObjectProps {
    [itemId: string]: Item;
}

const ItemsContextProvider = ({ children }: Props) => {
    const [booksObject, setBooksObject] = useState<BooksObjectProps>({});
    const [searchTerm, setSearchTerm] = useState<string>("");

    const itemsProvider = useMemo(
        () => ({ booksObject, setBooksObject, searchTerm, setSearchTerm }),
        [booksObject, setBooksObject, searchTerm, setSearchTerm]
    );

    return (
        <>
            <ItemsContext.Provider value={itemsProvider}>
                {children}
            </ItemsContext.Provider>
        </>
    );
};

export default ItemsContextProvider;
