import { Item } from "./item";
import { Order } from "./order";

export type User = {
    _id: string;
    userName: string;
    phoneNumber: number;
    email: string;
    password: string;
    recentVisited: Item[];
    whishList: Item[];
    cart: Item[];
    orders: Order[];
    address: string;
    isAdmin: boolean;
    paymentMethods: {
        name: string;
    }[];
    avatar: {
        asset: {
            url: string;
        };
    };
};
