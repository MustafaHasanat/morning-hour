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
import { LocalUser } from "@/types/user";
import { ItemsContext } from "@/context/items/itemsContext";

interface ButtonsSetProps {
    setDropDownContents: Dispatch<SetStateAction<"" | "cart" | "menu">>;
}

const ButtonsSet = ({ setDropDownContents }: ButtonsSetProps) => {
    const [cartBtnIsHovered, setCartBtnIsHovered] = useState(false);
    const [menuBtn, setMenuBtn] = useState(false);
    const [avatarImage, setAvatarImage] = useState("none");
    const [user, setUser] = useState<LocalUser | null>(null);

    const { cartItems } = useContext(ItemsContext);

    useEffect(() => {
        const localUser = window.localStorage.getItem("user");

        if (localUser) {
            const userObj: LocalUser = JSON.parse(localUser);

            if (userObj && userObj.avatar) {
                setAvatarImage(userObj.avatar.asset.url);
                setUser(userObj);
            }
        }
    }, []);

    const { itemsCount } = getTotalPrice(cartItems);

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
                user ? (
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
