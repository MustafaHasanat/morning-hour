import theme from "@/styles/theme";
import { Avatar, Stack } from "@mui/material";
import React, { useState } from "react";
import DropDown from "./dropDown";
import Navbar from "./navbar";
import ButtonsSet from "./buttonsSet";
import SearchBox from "./searchBox";
import Link from "next/link";

const Header = () => {
    const [dropDownContents, setDropDownContents] = useState<
        "cart" | "menu" | ""
    >("");

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
                px={{ xs: 5 }}
                zIndex={10}
            >
                <DropDown
                    isOpen={dropDownContents !== ""}
                    contents={dropDownContents}
                    setDropDownContents={setDropDownContents}
                />

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

                    <SearchBox />
                </Stack>

                <Stack direction="row" spacing={10} alignItems="center">
                    <Navbar />
                    <ButtonsSet setDropDownContents={setDropDownContents} />
                </Stack>
            </Stack>
        </Stack>
    );
};

export default Header;
