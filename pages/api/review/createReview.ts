import { client } from "@/utils/sanity/client";

export default async function createReview(req: any, res: any) {
    const { text, rating, userId, itemId } = req.body;

    try {
        await client.create({
            _type: "review",
            text,
            rating,
            user: {
                _type: "reference",
                _ref: userId,
            },
            item: {
                _type: "reference",
                _ref: itemId,
            },
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: `Couldn't create review`, err });
    }

    return res.status(200).json({ message: "Review created!", text, rating });
}
