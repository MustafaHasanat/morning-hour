import { Alert, AlertColor, Snackbar } from "@mui/material";

interface SnackbarWrapper {
    text: string;
    isOpen: boolean;
    setIsOpen: any;
    severity: AlertColor | undefined;
}

const SnackbarWrapper = ({
    text,
    isOpen,
    setIsOpen,
    severity,
}: SnackbarWrapper) => {
    return (
        <Snackbar
            open={isOpen}
            autoHideDuration={5000}
            onClose={() => {
                setIsOpen(false);
            }}
        >
            <Alert severity={severity} variant="filled" sx={{ width: "100%" }}>
                {text}
            </Alert>
        </Snackbar>
    );
};

export default SnackbarWrapper;
