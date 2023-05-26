import { Item } from "./item";

export type Category = {
    _id: string;
    title: string;
    items: Item[];
    image: {
        asset: {
            url: string;
        };
    };
};
