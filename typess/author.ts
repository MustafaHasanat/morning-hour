import { Item } from "./item";

export type Author = {
    _id: string;
    name: string;
    brief: string;
    image: {
        asset: {
            url: string;
        };
    };
};
