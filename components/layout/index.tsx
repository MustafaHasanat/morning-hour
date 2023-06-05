import { Box } from "@mui/material";
import HeadTag from "../metadata/headTag";
import Header from "../header";
import Footer from "../footer";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { variablesActions } from "@/utils/store";
import DialogBox from "./dialogBox";

interface LayoutComponentProps {
    children: JSX.Element;
}

const LayoutComponent = ({ children }: LayoutComponentProps) => {
    const router = useRouter();
    const dispatch = useDispatch();

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
        dispatch(
            variablesActions.setHeadTitle(getTitle(router.asPath.slice(1)))
        );
    }, [dispatch, router.asPath]);

    return (
        <Box bgcolor="white" id="layout-box">
            <HeadTag />
            <Header />
            <DialogBox />
            <Box component="main">{children}</Box>
            <Footer />
        </Box>
    );
};

export default LayoutComponent;
