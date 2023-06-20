import { Avatar, Badge, Button, Stack } from "@mui/material";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import {
    Dispatch,
    ReactNode,
    SetStateAction,
    useContext,
    useEffect,
    useState,
} from "react";
import getTotalPrice from "@/utils/helpers/getTotalPrice";
import useUserData from "@/hooks/useUserData";
import { PageVarsContext } from "@/context/pageVars/pageVarsContext";
import { ItemsContext } from "@/context/items/itemsContext";
import { useRouter } from "next/router";

interface ButtonsSetProps {
    setDropDownContents: Dispatch<SetStateAction<"" | "cart" | "menu">>;
}

const ButtonsSet = ({ setDropDownContents }: ButtonsSetProps) => {
    const [cartBtnIsHovered, setCartBtnIsHovered] = useState(false);
    const { cartItems, setCartItems } = useContext(ItemsContext);
    const [menuBtn, setMenuBtn] = useState(false);
    const [updated, setUpdated] = useState(false);
    const router = useRouter();

    const user = useUserData();

    const { setIsSnackbarOpen, setSnackbarMsg, setSnackbarSeverity } =
        useContext(PageVarsContext);

    const { itemsCount } = getTotalPrice(cartItems);

    useEffect(() => {
        if (user?.cart && !updated) {
            const cart = user.cart || [];

            setCartItems(
                cart.map((item) => {
                    return {
                        ...item,
                        key: item.item._id,
                    };
                })
            );
            setUpdated(true);
        }
    }, [setCartItems, updated, user]);

    const headerIconWrapper = (
        child: ReactNode,
        onMouseEnter: () => void,
        onMouseLeave: () => void,
        onClick: () => void,
        disabled: boolean
    ) => {
        return (
            <Button
                sx={{
                    height: { xs: "5rem", lg: "3.5rem" },
                    width: "auto",
                    zIndex: 11,
                    opacity: disabled ? 0.5 : 1,
                }}
                disabled={disabled}
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
            direction={{ xs: "column-reverse", lg: "row" }}
            height={{ xs: "100%" }}
            pt={{ xs: 5, lg: 0 }}
            spacing={{ xs: 7, lg: 3 }}
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
                    invisible={cartItems?.length === 0}
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
                    if (cartItems && cartItems.length !== 0) {
                        setDropDownContents((prev) =>
                            prev === "cart" ? "" : "cart"
                        );
                    } else {
                        setIsSnackbarOpen(true);
                        setSnackbarMsg("Cart is empty!");
                        setSnackbarSeverity("warning");
                    }
                },
                router.asPath === "/account/checkout"
            )}

            {headerIconWrapper(
                user ? (
                    <Avatar
                        alt="user avatar"
                        src={user?.avatar ? `${user?.avatar.asset.url}` : ""}
                        sx={{
                            width: "auto",
                            height: "100%",
                        }}
                    />
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
                },
                false
            )}
        </Stack>
    );
};

export default ButtonsSet;
