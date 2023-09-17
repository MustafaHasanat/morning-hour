import { CartItem } from "@/typess/item";

const getTotalPrice = (cartItems: CartItem[]) => {
  if (!cartItems)
    return {
      itemsCount: 0,
      totalPrice: 0,
    };

  const totalSum = cartItems.reduce(
    (state, item) => {
      if (item && item.quantity && item.item && item.item.currentPrice) {
        return {
          itemsCount: state.itemsCount + item.quantity,
          totalPrice:
            state.totalPrice + item?.quantity * item.item.currentPrice,
        };
      } else {
        return {
          itemsCount: state.itemsCount,
          totalPrice: state.totalPrice,
        };
      }
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
