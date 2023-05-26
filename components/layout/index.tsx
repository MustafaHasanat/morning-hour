import { Box } from "@mui/material";
import HeadTag from "../metadata/headTag";
import Header from "../header";
import Footer from "../footer";

interface LayoutComponentProps {
    children: JSX.Element;
}

const LayoutComponent = ({ children }: LayoutComponentProps) => {
    return (
        <Box bgcolor="white">
            <HeadTag />
            <Header />
            <Box component="main">{children}</Box>
            <Footer />
        </Box>
    );
};

export default LayoutComponent;
