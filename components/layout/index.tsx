import { Box } from "@mui/material";
import HeadTag from "../metadata/headTag";
import Header from "../header";
import Footer from "../footer";
import { useEffect } from "react";
import { useRouter } from "next/router";

interface LayoutComponentProps {
    children: JSX.Element;
}

const LayoutComponent = ({ children }: LayoutComponentProps) => {
    const router = useRouter();

    useEffect(() => {
        document.getElementById("layout-box")?.scrollIntoView();
    }, [router.asPath]);

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
