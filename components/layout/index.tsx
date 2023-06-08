import { Box } from "@mui/material";
import HeadTag from "../metadata/headTag";
import Header from "../header";
import Footer from "../footer";
import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import DialogBox from "./dialogBox";
import { PageVarsContext } from "@/context/pageVars/pageVarsContext";

interface LayoutComponentProps {
    children: JSX.Element;
}

const LayoutComponent = ({ children }: LayoutComponentProps) => {
    const router = useRouter();
    const { setHeadTitle } = useContext(PageVarsContext);

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
    }, [router.asPath, setHeadTitle]);

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
