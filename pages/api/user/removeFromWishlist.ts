import { client } from "@/utils/sanity/client";

export default async function removeFromWishlist(req: any, res: any) {
    const { userId, itemId } = req.body;

    try {
        await client
            .patch(userId)
            .unset([`wishlist[_ref=="${itemId}"]`])
            .commit();
    } catch (err) {
        console.error(err);
        return res
            .status(500)
            .json({ message: `Couldn't remove the item from wishlist.`, err });
    }

    return res
        .status(200)
        .json({ message: "Item's deleted from wishlist!", userId, itemId });
}
