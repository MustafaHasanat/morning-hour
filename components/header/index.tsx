import theme from "@/styles/theme";
import { Avatar, Stack } from "@mui/material";
import React, { useState } from "react";
import DropDown from "./dropDown";
import Navbar from "./navbar";
import ButtonsSet from "./buttonsSet";

// TODO: replace the burger button with the user avatar if signed-in

const Header = () => {
    const [dropDownContents, setDropDownContents] = useState<
        "cart" | "menu" | ""
    >("");

    return (
        <Stack
            component="header"
            direction="row"
            position="relative"
            bgcolor="background.default"
            height={{ xs: "6rem" }}
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`1px solid ${theme.palette.primary.main}`}
            px={{ xs: 5 }}
        >
            <DropDown
                isOpen={dropDownContents !== ""}
                contents={dropDownContents}
                setDropDownContents={setDropDownContents}
            />

            <Avatar
                src="/logo.png"
                alt="main logo"
                variant="rounded"
                sx={{
                    height: "5.5rem",
                    width: "auto",
                }}
            />

            <Navbar />
            <ButtonsSet setDropDownContents={setDropDownContents} />
        </Stack>
    );
};

export default Header;
