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
            xs: 0,
            sm: 420, // mobile
            md: 768, // tablet
            lg: 1138, // laptop
            xl: 2550, // 4K
        },
    },
});

export default themeTokens;
