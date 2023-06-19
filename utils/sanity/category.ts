import { Category } from "@/types/category";
import { client } from "./client";
import { groq } from "next-sanity";

const categoryContents = `
    _id,
    title,
    image {
        asset->{
            url
        }
    },
`

export async function getAllCategories(): Promise<Category[]> {
    return await client.fetch(groq`*[_type == "category"]{${categoryContents}}`);
}

export async function getCategoryByCondition(condition: {
    id?: string;
    title?: string;
}): Promise<Category> {
    const { id, title } = condition;
    const query = `${id ? `_id == "${id}"` : `title == "${title}"`}`;

    const category = await client.fetch(
        groq`*[_type == "category" && ${query}]{${categoryContents}}`
    );
    return category[0];
}
