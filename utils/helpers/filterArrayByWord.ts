import { Item } from "@/types/item";

const filterArrayByWord = ({
    array,
    arrayType,
    searchTerm,
}: {
    array: Item[];
    arrayType: "item";
    searchTerm: string;
}) => {
    switch (arrayType) {
        case "item":
            return array.filter((item) => {
                if (
                    item.title.toLowerCase().includes(searchTerm.toLowerCase())
                ) {
                    return item;
                }
            });
    }
};

export default filterArrayByWord;
