import { CartItemProps } from "../store/itemsSlice";

const getTotalPrice = (cartItems: CartItemProps[]) => {
    const totalSum = cartItems.reduce(
        (state, item) => {
            return {
                itemsCount: state.itemsCount + item.quantity,
                totalPrice:
                    state.totalPrice + item.quantity * item.item.currentPrice,
            };
        },
        {
            itemsCount: 0,
            totalPrice: 0,
        }
    );

    return {
        itemsCount: totalSum.itemsCount,
        totalPrice: totalSum.totalPrice,
    };
};

export default getTotalPrice;
