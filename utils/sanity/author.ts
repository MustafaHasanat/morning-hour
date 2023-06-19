import { Author } from "@/types/author";
import { client } from "./client";
import { groq } from "next-sanity";

const authorContents = `
    _id,
    name,
    brief,
    image {
        asset->{
            url
        }
    },
`;

export async function getAllAuthors(): Promise<Author[]> {
    return await client.fetch(groq`*[_type == "author"]{${authorContents}}`);
}

export async function getAuthorByCondition(condition: {
    id?: string;
    name?: string;
}): Promise<Author> {
    const { id, name } = condition;
    const query = `${id ? `_id == "${id}"` : `name == "${name}"`}`;
    const author = await client.fetch(
        groq`*[_type == "author" && ${query}]{${authorContents}}`
    );
    return author[0];
}
