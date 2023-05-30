import { Review } from "@/types/review";
import { client } from "./client";
import { groq } from "next-sanity";

export async function getReviewsForItem(itemId: string): Promise<Review[]> {
    return await client.fetch(groq`*[_type == "review" && item._id == ${itemId}]{
        _id,
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
        item->{
            _id,
        },
    }`);
}
