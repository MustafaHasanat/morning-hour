import { client } from "@/utils/sanity/client";

export default async function removeFromCart(req: any, res: any) {
    const { userId, itemId } = req.body;

    try {
        await client
            .patch(userId)
            .unset([`cart[_key=="${itemId}"]`])
            .commit();
    } catch (err) {
        console.error(err);
        return res
            .status(500)
            .json({ message: `Couldn't remove the item from cart.`, err });
    }

    return res
        .status(200)
        .json({ message: "Item's removed from cart!", userId, itemId });
}
