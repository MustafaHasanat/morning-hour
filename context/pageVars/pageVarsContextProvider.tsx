import { ReactNode, useMemo, useState } from "react";
import { PageVarsContext } from "./pageVarsContext";
import { AlertColor, PaletteMode } from "@mui/material";

type Props = {
    children: ReactNode;
};

const PageVarsContextProvider = ({ children }: Props) => {
    const [headTitle, setHeadTitle] = useState<string>("Morning Hour");

    // theme mode
    const [themeMode, setThemeMode] = useState<PaletteMode>("light");
    const toggleColorMode = useMemo(
        () => () =>
            setThemeMode((prevMode: PaletteMode) =>
                prevMode === "light" ? "dark" : "light"
            ),
        []
    );

    const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);
    const [snackbarMsg, setSnackbarMsg] = useState<string>("loading ..");
    const [snackbarSeverity, setSnackbarSeverity] =
        useState<AlertColor>("info");

    const pageVarsProvider = useMemo(
        () => ({
            headTitle,
            setHeadTitle,
            isSnackbarOpen,
            setIsSnackbarOpen,
            snackbarMsg,
            setSnackbarMsg,
            snackbarSeverity,
            setSnackbarSeverity,
            themeMode,
            toggleColorMode,
            setThemeMode,
        }),
        [
            headTitle,
            isSnackbarOpen,
            snackbarMsg,
            snackbarSeverity,
            themeMode,
            toggleColorMode,
        ]
    );

    return (
        <>
            <PageVarsContext.Provider value={pageVarsProvider}>
                {children}
            </PageVarsContext.Provider>
        </>
    );
};

export default PageVarsContextProvider;
