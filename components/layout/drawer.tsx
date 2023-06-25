import { Button, Stack, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import Navbar from "../header/navbar";
import { Dispatch, SetStateAction } from "react";
import ButtonsSet from "../header/buttonsSet";

interface Props {
    drawerIsOpen: boolean;
    dropDownContents: "" | "menu" | "cart";
    setDropDownContents: Dispatch<SetStateAction<"" | "cart" | "menu">>;
}

const Drawer = ({
    drawerIsOpen,
    dropDownContents,
    setDropDownContents,
}: Props) => {
    const theme = useTheme();

    return (
        <Stack
            component={motion.div}
            initial={{ x: "100%" }}
            animate={{
                x: drawerIsOpen ? "0%" : "100%",
                transition: {
                    type: "tween",
                },
            }}
            bgcolor="background.default"
            width="100vw"
            height="calc(100vh - 6rem)"
            borderTop={`2px solid ${theme.palette.primary.main}`}
            borderLeft={`2px solid ${theme.palette.primary.main}`}
            position="fixed"
            top="6rem"
            zIndex={10}
        >
            {dropDownContents !== "" ? (
                <Stack>
                    <Button
                        variant="contained"
                        sx={{
                            width: "fit-content",
                            m: 3,
                        }}
                        onClick={() => {
                            setDropDownContents("");
                        }}
                    >
                        back
                    </Button>

                    {/* <DropDown
                        isOpen={true}
                        contents={dropDownContents}
                        setDropDownContents={setDropDownContents}
                    /> */}
                </Stack>
            ) : (
                <Stack spacing={10} alignItems="center">
                    <ButtonsSet setDropDownContents={setDropDownContents} />
                    <Navbar />
                </Stack>
            )}
        </Stack>
    );
};

export default Drawer;
