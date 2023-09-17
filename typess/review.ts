import { Item } from "./item";
import { User } from "./user";

export type Review = {
    _id: string;
    text: string;
    rating: number;
    user: User;
    item: Item;
};
