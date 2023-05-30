import { User } from "@/types/user";
import { client } from "./client";
import { groq } from "next-sanity";

export async function getAllIUsers(): Promise<User[]> {
    return await client.fetch(groq`*[_type == "user"]{
        _id,
        userName,
        phoneNumber,
        email,
        password,
        recentVisited->{
            _id,
            title,
            currentPrice,
            oldPrice,
            rating,
            category,
            image {
                asset->{
                    url
                }
            },
        },
        whishList->{
            _id,
            title,
            currentPrice,
            oldPrice,
            rating,
            category,
            image {
                asset->{
                    url
                }
            },
        },
        cart->{
            _id,
            title,
            currentPrice,
            oldPrice,
            rating,
            category,
            image {
                asset->{
                    url
                }
            },
        },
        orders->{
            items {
                quantity,
                item->{
                    _id,
                    title,
                    currentPrice,
                    oldPrice,
                    category,
                    image {
                        asset->{
                            url
                        }
                    },
                },
            }[],
        },
        address,
        isAdmin,
        paymentMethods {
            name,
        }[],
        avatar {
            asset->{
                url
            }
        },
    }`);
}
