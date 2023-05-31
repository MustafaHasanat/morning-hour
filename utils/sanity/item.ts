import { Item } from "@/types/item";
import { client } from "./client";
import { groq } from "next-sanity";

export async function getAllItems(): Promise<Item[]> {
    return await client.fetch(groq`*[_type == "item"]{
        _id,
        title,
        description,
        currentPrice,
        oldPrice,
        isBestSelling,
        rating,
        category->{
            title,
            image {
                asset->{
                    url
                }
            },
        },
        reviews->{
            text,
            rating,
            user->{
                userName,
                avatar {
                    asset->{
                        url
                    }
                },
            },
        }[],
        author->{
            name,
            image {
                asset->{
                    url
                }
            },
        },
        image {
            asset->{
                url
            }
        },
        screenshots {
            asset->{
                url
            }
        }[],
    }`);
}

export async function getItemByCondition(condition: {
    id?: string;
    title?: string;
}): Promise<Item> {
    const { id, title } = condition;

    const query = `${id ? `_id == "${id}"` : `title == "${title}"`}`;

    const item = await client.fetch(groq`*[_type == "item" && ${query}]{
        _id,
        title,
        description,
        currentPrice,
        oldPrice,
        isBestSelling,
        primaryColor,
        category->{
            title,
            image {
                asset->{
                    url
                }
            },
        },
        reviews->{
            text,
            rating,
            user->{
                userName,
                avatar {
                    asset->{
                        url
                    }
                },
            },
        }[],
        author->{
            name,
            image {
                asset->{
                    url
                }
            },
        },
        image {
            asset->{
                url
            }
        },
        screenshots {
            asset->{
                url
            }
        }[],
    }`);

    return item[0];
}
