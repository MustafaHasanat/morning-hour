import themes from "@/utils/constants/themes";
import { PaletteMode, createTheme } from "@mui/material";

const themeTokens = (mode: PaletteMode) => ({
    typography: {
        fontFamily: "'Patua One', cursive",
    },

    palette: {
        mode,
        ...(mode === "light"
            ? {
                  // palette values for light mode
                  primary: {
                      main: "#55473F",
                  },
                  secondary: {
                      main: "#cc9c74",
                  },
                  background: {
                      default: "#f8f4f1",
                      paper: "#e4e0dd",
                  },
                  text: {
                      primary: "#55473F",
                      secondary: "white",
                  },
              }
            : {
                  // palette values for dark mode
                  primary: {
                      main: "#55473F",
                  },
                  secondary: {
                      main: "#55473F",
                  },
                  background: {
                      default: "#55473F",
                      paper: "#55473F",
                  },
                  text: {
                      primary: "#55473F",
                      secondary: "#55473F",
                  },
              }),
    },

    breakpoints: {
        values: {
            xs: themes.MEDIA_QUERIES.XS,
            sm: themes.MEDIA_QUERIES.SM, // mobile
            md: themes.MEDIA_QUERIES.MD, // tablet
            lg: themes.MEDIA_QUERIES.LG, // laptop
            xl: themes.MEDIA_QUERIES.XL, // 4K
        },
    },
});

export default themeTokens;
