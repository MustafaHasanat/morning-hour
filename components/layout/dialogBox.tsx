import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Slide,
    Stack,
} from "@mui/material";
import { ReactElement, Ref, forwardRef, useEffect, useState } from "react";
import { TransitionProps } from "@mui/material/transitions";
import { useRouter } from "next/router";
import {
    getCookieWithExpiry,
    setCookieWithExpiry,
} from "@/utils/helpers/cookieHandler";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import cookies from "@/utils/constants/cookies";

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: ReactElement<any, any>;
    },
    ref: Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const DialogBox = () => {
    const router = useRouter();
    const [dialogIsOpen, setDialogIsOpen] = useState(false);

    const handleDialogAction = (page: "login" | "signup" | "") => {
        if (page !== "") {
            router.push(`/account/${page}`);
        }
        setDialogIsOpen(false);
    };

    useEffect(() => {
        const isLoggedIn = !!localStorage.getItem("userId");
        const isAlerted = !!getCookieWithExpiry("login-alert");

        if (!isAlerted && !isLoggedIn) {
            // set a cookie that expired in one hour
            setCookieWithExpiry(
                "login-alert",
                "alerted",
                cookies.ONE_HOUR
            );
            setDialogIsOpen(true);
        }
    }, []);

    return (
        <Dialog
            open={dialogIsOpen}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => {
                setDialogIsOpen(false);
            }}
        >
            <DialogTitle textAlign="center">
                {"Let us serve you better!"}
            </DialogTitle>

            <DialogContent
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 2,
                }}
            >
                <DialogContentText color="secondary" textAlign="justify">
                    create a new account or log in if you already have one so we
                    can provide you with the best service.
                </DialogContentText>

                <InsertEmoticonIcon
                    color="secondary"
                    sx={{
                        width: "10rem",
                        height: "10rem",
                    }}
                />
            </DialogContent>

            <DialogActions
                sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                <Stack direction="row" spacing={2}>
                    <Button
                        variant="contained"
                        onClick={() => {
                            handleDialogAction("login");
                        }}
                    >
                        login
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => {
                            handleDialogAction("signup");
                        }}
                    >
                        sign up
                    </Button>
                </Stack>
                <Button
                    variant="outlined"
                    onClick={() => {
                        handleDialogAction("");
                    }}
                >
                    later
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DialogBox;
