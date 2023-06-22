import { ReactNode, useMemo, useState } from "react";
import { PageVarsContext } from "./pageVarsContext";
import { AlertColor } from "@mui/material";

type Props = {
    children: ReactNode;
};

const PageVarsContextProvider = ({ children }: Props) => {
    const [headTitle, setHeadTitle] = useState<string>("Morning Hour");
    
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
        }),
        [headTitle, isSnackbarOpen, snackbarMsg, snackbarSeverity]
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
