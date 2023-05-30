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

export async function getItemById(id: string): Promise<Item> {
    const item = await client.fetch(groq`*[_type == "item" && _id == "${id}"]{
        _id,
        title,
        description,
        currentPrice,
        oldPrice,
        isBestSelling,
        rating,
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
