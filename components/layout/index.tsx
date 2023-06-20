import { Alert, Box, Snackbar } from "@mui/material";
import HeadTag from "../metadata/headTag";
import Header from "../header";
import Footer from "../footer";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import DialogBox from "./dialogBox";
import { PageVarsContext } from "@/context/pageVars/pageVarsContext";
import Script from "next/script";
import Drawer from "./drawer";

interface LayoutComponentProps {
    children: JSX.Element;
}

const LayoutComponent = ({ children }: LayoutComponentProps) => {
    const router = useRouter();
    const [drawerIsOpen, setDrawerIsOpen] = useState(false);
    const [dropDownContents, setDropDownContents] = useState<
        "cart" | "menu" | ""
    >("");

    const {
        setHeadTitle,
        isSnackbarOpen,
        setIsSnackbarOpen,
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

    return (
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
    );
};

export default LayoutComponent;
