import { Author } from "next/dist/lib/metadata/types/metadata-types";
import { client } from "./client";
import { groq } from "next-sanity";

export async function getAllAuthors(): Promise<Author[]> {
    return await client.fetch(groq`*[_type == "author"]{
        _id,
        name,
        brief,
        books->{
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
