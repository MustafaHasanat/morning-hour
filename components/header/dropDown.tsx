import theme from "@/styles/theme";
import { Box, Stack } from "@mui/material";
import { motion } from "framer-motion";
import MenuContents from "./menuContents";
import CartContents from "./cartContents";
import zIndex from "@mui/material/styles/zIndex";

interface DropDownProps {
    isOpen: boolean;
    contents: "cart" | "menu" | "";
    setDropDownContents: React.Dispatch<
        React.SetStateAction<"" | "cart" | "menu">
    >;
}

const DropDown = ({ isOpen, contents, setDropDownContents }: DropDownProps) => {
    return (
        <Stack
            component={motion.div}
            initial={{
                height: 0,
                border: 0,
                paddingTop: "0px",
            }}
            animate={{
                height: isOpen ? "calc(100vh - 10rem)" : 0,
                border: isOpen ? `1px solid ${theme.palette.primary.main}` : 0,
                paddingTop: isOpen ? "20px" : "0px",
            }}
            position="absolute"
            width={{ xs: "15rem" }}
            bgcolor="background.default"
            overflow="hidden"
            borderRadius={1}
            top={"7rem"}
            right={20}
            px={{ xs: 2 }}
            zIndex={9}
        >
            {isOpen && (
                <Box
                    component="div"
                    onClick={() => {
                        setDropDownContents("");
                    }}
                    sx={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100vw",
                        height: "100vh",
                    }}
                />
            )}

            {contents === "menu" ? (
                <MenuContents />
            ) : contents === "cart" ? (
                <CartContents />
            ) : null}
        </Stack>
    );
};

export default DropDown;
