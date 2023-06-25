import { AlertColor, PaletteMode } from "@mui/material";
import { Context, createContext } from "react";

export interface PageVarsContextProps {
    headTitle: string;
    setHeadTitle: (headTitle: string) => void;
    themeMode: PaletteMode;
    toggleColorMode: () => void;
    setThemeMode: (themeMode: PaletteMode) => void;
    isSnackbarOpen: boolean;
    setIsSnackbarOpen: (isSnackbarOpen: boolean) => void;
    snackbarMsg: string;
    setSnackbarMsg: (snackbarMsg: string) => void;
    snackbarSeverity: AlertColor;
    setSnackbarSeverity: (snackbarSeverity: AlertColor) => void;
}

export const PageVarsContext: Context<PageVarsContextProps> = createContext({
    headTitle: "",
    setHeadTitle: (headTitle: string) => {},
    themeMode: "light",
    toggleColorMode: () => {},
    setThemeMode: (themeMode: PaletteMode) => {},
    isSnackbarOpen: false,
    setIsSnackbarOpen: (isSnackbarOpen: boolean) => {},
    snackbarMsg: "",
    setSnackbarMsg: (snackbarMsg: string) => {},
    snackbarSeverity: "info",
    setSnackbarSeverity: (snackbarSeverity: AlertColor) => {},
});
