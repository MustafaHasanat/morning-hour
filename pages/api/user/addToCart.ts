import { client } from "@/utils/sanity/client";

export default async function addToCart(req: any, res: any) {
    const { userId, itemId } = req.body;

    try {
        await client
            .patch(userId)
            .setIfMissing({ cart: [] })
            .insert("after", "cart[-1]", [
                {
                    _type: "object",
                    _key: itemId,
                    item: {
                        _type: "reference",
                        _ref: itemId,
                    },
                    quantity: 1,
                },
            ])
            .commit({
                autoGenerateArrayKeys: true,
            });
    } catch (err) {
        console.error(err);
        return res
            .status(500)
            .json({ message: `Couldn't add the item to cart.`, err });
    }

    return res
        .status(200)
        .json({ message: "Item added to cart!", userId, itemId });
}
