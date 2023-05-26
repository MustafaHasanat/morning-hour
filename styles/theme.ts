import { createTheme } from "@mui/material";

const theme = createTheme({
    typography: {
        fontFamily: "Georgia, 'Times New Roman', Times, serif",
    },

    palette: {
        primary: {
            main: "#FB8122",
        },
        secondary: {
            main: "#1D2228",
        },
        text: {
            primary: "#E1E2E2",
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
