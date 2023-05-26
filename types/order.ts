import { Item } from "./item";
import { User } from "./user";

export type Order = {
    _id: string;
    user: User;
    items: {
        item: Item;
        quantity: number;
    }[];
};
