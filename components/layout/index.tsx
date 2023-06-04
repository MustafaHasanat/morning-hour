import { Box } from "@mui/material";
import HeadTag from "../metadata/headTag";
import Header from "../header";
import Footer from "../footer";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { variablesActions } from "@/utils/store";

interface LayoutComponentProps {
    children: JSX.Element;
}

const LayoutComponent = ({ children }: LayoutComponentProps) => {
    const router = useRouter();
    const dispatch = useDispatch();

    const getTitle = (route: string): string => {
        console.log(route);

        switch (route) {
            case "categories":
                return "Categories";
            case "authors":
                return "Authors";
            default:
                return "Morning Hour";
        }
    };

    useEffect(() => {
        document.getElementById("layout-box")?.scrollIntoView();
        console.log(getTitle(router.asPath.slice(1)));

        dispatch(
            variablesActions.setHeadTitle(getTitle(router.asPath.slice(1)))
        );
    }, [dispatch, router.asPath]);

    return (
        <Box bgcolor="white" id="layout-box">
            <HeadTag />
            <Header />
            <Box component="main">{children}</Box>
            <Footer />
        </Box>
    );
};

export default LayoutComponent;
