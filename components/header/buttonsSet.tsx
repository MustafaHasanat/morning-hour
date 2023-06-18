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
import { CartItem } from "@/types/item";
import { ItemsContext } from "@/context/items/itemsContext";

interface ButtonsSetProps {
    setDropDownContents: Dispatch<SetStateAction<"" | "cart" | "menu">>;
}

const ButtonsSet = ({
    setDropDownContents,
}: ButtonsSetProps) => {
    const [cartBtnIsHovered, setCartBtnIsHovered] = useState(false);
    const { cartItems, setCartItems } = useContext(ItemsContext);
    const [menuBtn, setMenuBtn] = useState(false);
    const [updated, setUpdated] = useState(false);

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
                }
            )}

            {headerIconWrapper(
                user ? (
                    <Avatar
                        alt="user avatar"
                        src={user?.avatar ? `${user?.avatar.asset.url}` : ""}
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
                }
            )}
        </Stack>
    );
};

export default ButtonsSet;
