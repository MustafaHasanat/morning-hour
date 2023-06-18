import { AlertColor } from "@mui/material";
import { Context, createContext } from "react";

export interface PageVarsContextProps {
    headTitle: string;
    setHeadTitle: (headTitle: string) => void;
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
    isSnackbarOpen: false,
    setIsSnackbarOpen: (isSnackbarOpen: boolean) => {},
    snackbarMsg: "",
    setSnackbarMsg: (snackbarMsg: string) => {},
    snackbarSeverity: "info",
    setSnackbarSeverity: (snackbarSeverity: AlertColor) => {},
});
