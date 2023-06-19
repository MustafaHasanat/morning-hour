import { Item } from "@/types/item";
import { client } from "./client";
import { groq } from "next-sanity";

const itemContents = `
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
    }[],`;

export async function getAllItems(): Promise<Item[]> {
    return await client.fetch(groq`*[_type == "item"]{${itemContents}}`);
}

export async function getItemByCondition(condition: {
    id?: string;
    title?: string;
}): Promise<Item> {
    const { id, title } = condition;
    const query = `${id ? `_id == "${id}"` : `title == "${title}"`}`;
    const item = await client.fetch(
        groq`*[_type == "item" && ${query}]{${itemContents}}`
    );
    return item[0];
}

export async function getItemsByIds(ids: string[]): Promise<Item[]> {
    if (ids.length === 0) return [];

    const modifiedArray = `["${ids.join(`", "`)}"]`;

    return await client.fetch(
        groq`*[_type == "item" && _id in ${modifiedArray}]{${itemContents}}`
    );
}

export async function getItemsGroups(condition: {
    authorId?: string;
    categoryId?: string;
}): Promise<Item[]> {
    const { authorId, categoryId } = condition;
    const query = `${
        authorId
            ? `author._ref == "${authorId}"`
            : `category._ref == "${categoryId}"`
    }`;
    const items = await client.fetch(
        groq`*[_type == "item" && ${query}]{${itemContents}}`
    );
    return items;
}
