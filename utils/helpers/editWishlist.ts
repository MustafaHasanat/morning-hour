import { getCookieWithExpiry, setCookieWithExpiry } from "./cookieHandler";

const addItemToWishlist = (itemId: string) => {
    const whishList = getCookieWithExpiry("whishList");

    if (!!whishList) {
        const whishListSet = new Set(whishList);
        whishListSet.add(itemId);

        setCookieWithExpiry("whishList", Array.from(whishListSet), 3600000);
    } else {
        setCookieWithExpiry("whishList", [itemId], 3600000);
    }
};

const removeItemFromWishlist = (itemId: string) => {
    const whishList: string[] = getCookieWithExpiry("whishList");

    if (!!whishList) {
        setCookieWithExpiry(
            "whishList",
            Array.from(
                whishList.filter((currItemId) => {
                    if (currItemId !== itemId) {
                        return currItemId;
                    }
                })
            ),
            3600000
        );
    }
};

export { addItemToWishlist, removeItemFromWishlist };
