import { Avatar, Badge, Button, Stack } from "@mui/material";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { ReactNode, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CartItemProps } from "@/utils/store/itemsSlice";
import getTotalPrice from "@/utils/helpers/getTotalPrice";
import { useSession } from "next-auth/react";

interface ButtonsSetProps {
    setDropDownContents: React.Dispatch<
        React.SetStateAction<"" | "cart" | "menu">
    >;
}

const ButtonsSet = ({ setDropDownContents }: ButtonsSetProps) => {
    const [cartBtnIsHovered, setCartBtnIsHovered] = useState(false);
    const [menuBtn, setMenuBtn] = useState(false);
    const [avatarImage, setAvatarImage] = useState("none");
    const { data: session, status } = useSession();

    const cartItems = useSelector(
        (state: { itemsReducer: { cartItems: CartItemProps[] } }) =>
            state.itemsReducer.cartItems
    );

    const { itemsCount } = getTotalPrice(cartItems);

    useEffect(() => {
        if (status == "authenticated" && session && session.user) {
            setAvatarImage(`${session.user.image}`);
        }
    }, [session, status]);

    const headerIconWrapper = (
        child: ReactNode,
        onMouseEnter: () => void,
        onMouseLeave: () => void,
        onClick: () => void
    ) => {
        return (
            <Button
                sx={{
                    height: { xs: "3.5rem" },
                    width: "auto",
                    zIndex: 11,
                }}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                onClick={onClick}
            >
                {child}
            </Button>
        );
    };

    return (
        <Stack
            direction="row"
            height={{ xs: "100%" }}
            spacing={{ xs: 3 }}
            alignItems="center"
        >
            {headerIconWrapper(
                <Badge
                    sx={{
                        color: cartBtnIsHovered
                            ? "primary.main"
                            : "secondary.main",
                        width: "auto",
                        height: "100%",
                        transition: "0.3s ease",
                    }}
                    badgeContent={itemsCount}
                    color="error"
                    invisible={cartItems.length === 0}
                >
                    <ShoppingCartRoundedIcon
                        sx={{
                            color: cartBtnIsHovered
                                ? "primary.main"
                                : "secondary.main",
                            width: "100%",
                            height: "100%",
                            transition: "0.3s ease",
                        }}
                    />
                </Badge>,
                () => {
                    setCartBtnIsHovered(true);
                },
                () => {
                    setCartBtnIsHovered(false);
                },
                () => {
                    setDropDownContents((prev) =>
                        prev === "cart" ? "" : "cart"
                    );
                }
            )}

            {headerIconWrapper(
                status === "authenticated" ? (
                    <Avatar alt="user avatar" src={avatarImage} />
                ) : (
                    <MenuRoundedIcon
                        sx={{
                            color: menuBtn ? "primary.main" : "secondary.main",
                            width: "auto",
                            height: "100%",
                        }}
                    />
                ),
                () => {
                    setMenuBtn(true);
                },
                () => {
                    setMenuBtn(false);
                },
                () => {
                    setDropDownContents((prev) =>
                        prev === "menu" ? "" : "menu"
                    );
                }
            )}
        </Stack>
    );
};

export default ButtonsSet;
