import { Item } from "./item";

export type Author = {
    _id: string;
    name: string;
    brief: string;
    books: Item[];
    image: {
        asset: {
            url: string;
        };
    };
};
