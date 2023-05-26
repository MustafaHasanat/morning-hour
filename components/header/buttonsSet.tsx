import { Avatar, Button, Stack } from "@mui/material";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { ReactNode, useState } from "react";

interface ButtonsSetProps {
    setDropDownContents: React.Dispatch<
        React.SetStateAction<"" | "cart" | "menu">
    >;
}

const ButtonsSet = ({ setDropDownContents }: ButtonsSetProps) => {
    const [cartBtnIsHovered, setCartBtnIsHovered] = useState(false);
    const [menuBtn, setMenuBtn] = useState(false);

    const headerIconWrapper = (
        child: ReactNode,
        onMouseEnter: () => void,
        onMouseLeave: () => void,
        onClick: () => void
    ) => {
        return (
            <Button
                sx={{ height: { xs: "3.5rem" }, width: "auto", zIndex: 11 }}
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
                <ShoppingCartRoundedIcon
                    sx={{
                        color: cartBtnIsHovered
                            ? "primary.main"
                            : "secondary.main",
                        width: "auto",
                        height: "100%",
                        transition: "0.3s ease"
                    }}
                />,
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

            {false ? (
                <Avatar />
            ) : (
                headerIconWrapper(
                    <MenuRoundedIcon
                        sx={{
                            color: menuBtn ? "primary.main" : "secondary.main",
                            width: "auto",
                            height: "100%",
                        }}
                    />,
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
                )
            )}
        </Stack>
    );
};

export default ButtonsSet;
