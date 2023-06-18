import { Item } from "./item";
import { Order } from "./order";

export type User = {
    _id: string;
    userName: string;
    phoneNumber: number;
    email: string;
    password: string;
    recentVisited: Item[];
    wishlist: Item[];
    cart: {
        item: Item;
        quantity: number;
    }[];
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

export type LocalUser = {
    id?: string;
    userName?: string;
    phoneNumber?: number;
    email?: string;
    password?: string;
    recentVisited?: string[];
    wishlist?: string[];
    cart?: string[];
    orders?: string[];
    address?: string;
    isAdmin?: boolean;
    paymentMethods?: {
        name: string;
    }[];
    avatar?: {
        asset: {
            url: string;
        };
    };
};
