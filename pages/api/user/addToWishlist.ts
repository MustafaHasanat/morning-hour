import { client } from "@/utils/sanity/client";

export default async function addToWishlist(req: any, res: any) {
    const { userId, itemId } = req.body;

    try {
        await client
            .patch(userId)
            .setIfMissing({ wishlist: [] })
            .insert("after", "wishlist[-1]", [
                { _type: "reference", _ref: itemId },
            ])
            .commit({
                autoGenerateArrayKeys: true,
            });
    } catch (err) {
        console.error(err);
        return res
            .status(500)
            .json({ message: `Couldn't add the item to wishlist.`, err });
    }

    return res
        .status(200)
        .json({ message: "Item added to wishlist!", userId, itemId });
}
