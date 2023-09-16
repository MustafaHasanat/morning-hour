import { Avatar, Box, Stack, useMediaQuery, useTheme } from "@mui/material";
import React, { Dispatch, SetStateAction, useContext, useEffect } from "react";
import DropDown from "./dropDown";
import Navbar from "./navbar";
import ButtonsSet from "./buttonsSet";
import SearchBox from "../shared/searchBox";
import Link from "next/link";
import useUserData from "@/hooks/useUserData";
import { ItemsContext } from "@/context/items/itemsContext";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import themes from "@/utils/constants/themes";

interface Props {
    setDrawerIsOpen: Dispatch<SetStateAction<boolean>>;
    drawerIsOpen: boolean;
    dropDownContents: "" | "menu" | "cart";
    setDropDownContents: Dispatch<SetStateAction<"" | "cart" | "menu">>;
}

const Header = ({
    drawerIsOpen,
    setDrawerIsOpen,
    dropDownContents,
    setDropDownContents,
}: Props) => {
    const { cartItems, setCartItems } = useContext(ItemsContext);
    const lgScreen = useMediaQuery(themes.MEDIA_QUERIES_HOOK.LG);
    const user = useUserData();
    const theme = useTheme();

    useEffect(() => {
        if (user && user.cart) {
            setCartItems(user?.cart);
        }
    }, [setCartItems, user]);

    useEffect(() => {
        if (cartItems && cartItems.length === 0) {
            setDropDownContents("");
        }
    }, [cartItems, setDropDownContents]);

    return (
        <Stack
            component="header"
            position="relative"
            height={{ xs: "6rem" }}
            boxShadow={`0px -5px 20px 1px ${theme.palette.primary.main}`}
        >
            <Stack
                direction="row"
                position="fixed"
                bgcolor="background.default"
                width={{ xs: "100vw" }}
                height={{ xs: "6rem" }}
                justifyContent="space-between"
                alignItems="center"
                boxShadow={`0px -5px 20px 1px ${theme.palette.primary.main}`}
                px={{ xs: 2, lg: 5 }}
                zIndex={10}
            >
                {lgScreen && (
                    <DropDown
                        isOpen={dropDownContents !== ""}
                        contents={dropDownContents}
                        setDropDownContents={setDropDownContents}
                    />
                )}
                <Stack direction="row" spacing={5} alignItems="center">
                    <Link href="/">
                        <Avatar
                            src="/logo.png"
                            alt="main logo"
                            variant="rounded"
                            sx={{
                                height: "5.5rem",
                                width: "auto",
                            }}
                        />
                    </Link>

                    {lgScreen && <SearchBox />}
                </Stack>

                {lgScreen ? (
                    <Stack direction="row" spacing={10} alignItems="center">
                        <Navbar />
                        <ButtonsSet setDropDownContents={setDropDownContents} />
                    </Stack>
                ) : (
                    <Box
                        component="div"
                        onClick={() => {
                            setDrawerIsOpen((prev) => !prev);
                        }}
                        sx={{
                            color: "secondary.main",
                            height: "50%",
                            width: "auto",
                        }}
                    >
                        <MenuRoundedIcon
                            sx={{
                                color: "secondary.main",
                                height: "100%",
                                width: "auto",
                            }}
                        />
                    </Box>
                )}
            </Stack>
        </Stack>
    );
};

export default Header;
