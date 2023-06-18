import { client } from "@/utils/sanity/client";

export default async function clearCart(req: any, res: any) {
    const { userId } = req.body;

    try {
        await client
            .patch(userId)
            .unset([`cart`])
            .commit();
    } catch (err) {
        console.error(err);
        return res
            .status(500)
            .json({ message: `Couldn't clear the cart.`, err });
    }

    return res
        .status(200)
        .json({ message: "Cart is cleared!", userId });
}
