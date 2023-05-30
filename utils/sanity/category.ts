import { Category } from "@/types/category";
import { client } from "./client";
import { groq } from "next-sanity";

export async function getAllCategories(): Promise<Category[]> {
    return await client.fetch(groq`*[_type == "category"]{
        _id,
        title,
        items->{
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
        }[],
        image {
            asset->{
                url
            }
        },
    }`);
}
