import { Review } from "@/types/review";
import { client } from "./client";
import { groq } from "next-sanity";

export async function getReviewsForItem(itemId: string): Promise<Review[]> {
    return await client.fetch(groq`*[_type == "review" && item._ref == "${itemId}"]{
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

export async function createReview({
    text,
    rating,
    itemId,
    userId,
}: {
    text: string;
    rating: number;
    itemId: string;
    userId: string;
}) {
    try {
        await fetch("/api/user/postReview", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                text,
                rating,
                itemId,
                userId,
            }),
        });
    } catch (err) {
        console.log(err);
    }
}
