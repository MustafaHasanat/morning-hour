import {
    Alert,
    Box,
    Snackbar,
    ThemeProvider,
    createTheme,
} from "@mui/material";
import HeadTag from "../metadata/headTag";
import Header from "../header";
import Footer from "../footer";
import { useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import DialogBox from "./dialogBox";
import { PageVarsContext } from "@/context/pageVars/pageVarsContext";
import Script from "next/script";
import Drawer from "./drawer";
import themeTokens from "@/styles/themeTokens";

interface LayoutComponentProps {
    children: JSX.Element;
}

const LayoutComponent = ({ children }: LayoutComponentProps) => {
    const router = useRouter();
    const [drawerIsOpen, setDrawerIsOpen] = useState(false);
    const [dropDownContents, setDropDownContents] = useState<
        "cart" | "menu" | ""
    >("");

    const { themeMode, setThemeMode } = useContext(PageVarsContext);
    const theme = useMemo(
        () => createTheme(themeTokens(themeMode)),
        [themeMode]
    );

    const {
        setHeadTitle,
        setIsSnackbarOpen,
        setSnackbarMsg,
        setSnackbarSeverity,
        isSnackbarOpen,
        snackbarMsg,
        snackbarSeverity,
    } = useContext(PageVarsContext);

    // map the route name to the corresponding title
    const getTitle = (route: string): string => {
        switch (route) {
            case "categories":
                return "Categories";
            case "authors":
                return "Authors";
            default:
                return "Morning Hour";
        }
    };

    /**
     * upon routing:
     * - scroll to the top of the page
     * - change the tab title accordingly
     */
    useEffect(() => {
        document.getElementById("layout-box")?.scrollIntoView();
        setHeadTitle(getTitle(router.asPath.slice(1)));
        setDrawerIsOpen(false);
    }, [router.asPath, setHeadTitle]);

    useEffect(() => {
        const colorCookie = localStorage.getItem("colorMode");

        if (!colorCookie) {
            localStorage.setItem("colorMode", "light");
        } else {
            setThemeMode(colorCookie === "dark" ? "dark" : "light");
        }
    }, [setThemeMode]);

    return (
        <ThemeProvider theme={theme}>
            <Box bgcolor="white" id="layout-box" position="relative">
                <Script
                    src={`https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}&currency=USD`}
                ></Script>

                <HeadTag />

                <Header
                    drawerIsOpen={drawerIsOpen}
                    setDrawerIsOpen={setDrawerIsOpen}
                    dropDownContents={dropDownContents}
                    setDropDownContents={setDropDownContents}
                />
                <Drawer
                    drawerIsOpen={drawerIsOpen}
                    dropDownContents={dropDownContents}
                    setDropDownContents={setDropDownContents}
                />

                <DialogBox />
                <Box component="main">{children}</Box>
                <Footer />

                <Snackbar
                    open={isSnackbarOpen}
                    autoHideDuration={5000}
                    onClose={() => {
                        setIsSnackbarOpen(false);
                        setSnackbarMsg("loading ..");
                        setSnackbarSeverity("info");
                    }}
                >
                    <Alert
                        severity={snackbarSeverity}
                        variant="filled"
                        sx={{ width: "100%" }}
                    >
                        {snackbarMsg}
                    </Alert>
                </Snackbar>
            </Box>
        </ThemeProvider>
    );
};

export default LayoutComponent;
