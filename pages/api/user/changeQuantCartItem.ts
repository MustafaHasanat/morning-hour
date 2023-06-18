import { client } from "@/utils/sanity/client";

interface SanityCartItem {
    item: {
        _ref: string;
    };
    quantity: number;
}

export default async function changeQuantCartItem(
    req: {
        body: {
            userId: string;
            itemId: string;
            sign: "+" | "-";
            curQuant: number;
        };
    },
    res: any
) {
    const { userId, itemId, sign, curQuant } = req.body;

    if (curQuant === 1 && sign === "-")
        return res
            .status(500)
            .json({ message: `Quantity can't be less than 1` });

    const extraValue = sign === "+" ? 1 : -1;

    try {
        // get the user
        const userDoc:
            | {
                  cart: SanityCartItem[];
                  _rev: string;
              }
            | undefined = await client.getDocument(userId);
        if (!userDoc) {
            return res.status(500).json({ message: `User does not exist!` });
        }
        // get the cart
        const cart = userDoc.cart;
        // get the item's index in the array
        const cartIndex = cart.findIndex(
            (cartItem: SanityCartItem) => cartItem.item._ref === itemId
        );
        // if item exists, then modify it
        if (cartIndex !== -1) {
            const updatedCart = [
                ...cart.slice(0, cartIndex),
                {
                    ...cart[cartIndex],
                    quantity: cart[cartIndex].quantity + extraValue,
                },
                ...cart.slice(cartIndex + 1),
            ];

            await client
                .patch(userId)
                .set({ cart: updatedCart })
                .ifRevisionId(userDoc._rev)
                .commit();
        } else {
            return res.status(500).json({ message: `Item does not exist!` });
        }
    } catch (err) {
        console.error(err);
        return res
            .status(500)
            .json({ message: `Couldn't add the item to wishlist.`, err });
    }

    return res
        .status(200)
        .json({ message: "Cart item updated!", userId, itemId });
}
