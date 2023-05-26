import { createTheme } from "@mui/material";

const theme = createTheme({
    typography: {
        fontFamily: "Georgia, 'Times New Roman', Times, serif",
    },

    palette: {
        primary: {
            main: "#55473F",
        },
        secondary: {
            main: "#cc9c74",
        },
        background: {
            default: "#f8f4f1",
        },
        text: {
            primary: "#55473F",
        },
    },

    breakpoints: {
        values: {
            xs: 0,
            sm: 425, // mobile
            md: 768, // tablet
            lg: 1440, // laptop
            xl: 2560, // 4K
        },
    },
});

export default theme;
