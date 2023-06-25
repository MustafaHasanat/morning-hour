import { LocalUser, User } from "@/types/user";

const sanityUserToLocalUser = (sanityUser: User | null): LocalUser => {
    if (sanityUser) {
        return {
            id: sanityUser._id,
            userName: sanityUser.userName,
            email: sanityUser.email,
            phoneNumber: sanityUser.phoneNumber || 0,
            address: sanityUser.address || "",
            isAdmin: sanityUser.isAdmin || false,
            avatar: {
                asset: {
                    url:
                        (sanityUser.avatar && sanityUser.avatar.asset.url) ||
                        "/person.jpg",
                },
            },
            wishlist: sanityUser.wishlist
                ? sanityUser.wishlist.map((item) => item._id)
                : [],
            recentVisited: sanityUser.recentVisited
                ? sanityUser.recentVisited.map((item) => item._id)
                : [],
            cart: sanityUser.cart
                ? sanityUser.cart.map((item) => item.item._id)
                : [],
            orders: sanityUser.orders
                ? sanityUser.orders.map((item) => item._id)
                : [],
            paymentMethods: sanityUser.paymentMethods || [],
        };
    } else {
        return {};
    }
};

export default sanityUserToLocalUser;
