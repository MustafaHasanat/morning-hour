import { User } from "@/types/user";
import { client } from "./client";
import { groq } from "next-sanity";

const userContents = `
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
`;

export async function getAllIUsers(): Promise<User[]> {
    return await client.fetch(groq`*[_type == "user"]{${userContents}}`);
}

export async function getUserByCondition(condition: {
    id?: string;
    email?: string;
}): Promise<User> {
    const { id, email } = condition;
    const query = `${id ? `_id == "${id}"` : `email == "${email}"`}`;
    const user = await client.fetch(
        groq`*[_type == "user" && ${query}]{${userContents}}`
    );
    return user[0];
}

export async function createUser({
    userName,
    email,
    password,
}: {
    userName: string;
    email: string;
    password: string;
}): Promise<Response> {
    try {
        return await fetch("/api/user/createUser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userName,
                email,
                password,
            }),
        });
    } catch (err: any) {
        return err;
    }
}
