import { Alert, CircularProgress, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { createUser, getUserByCondition } from "@/utils/sanity/user";
import { signOut, useSession } from "next-auth/react";
import { PageVarsContext } from "@/context/pageVars/pageVarsContext";
import sanityUserToLocalUser from "@/utils/helpers/sanityUserToLocalUser";

const Splash = () => {
    const router = useRouter();
    const {
        setIsSnackbarOpen,
        setSnackbarMsg,
        snackbarMsg,
        setSnackbarSeverity,
    } = useContext(PageVarsContext);
    const { data: session } = useSession();

    const { successMsg, errorMsg } = {
        successMsg: {
            userCreated: "User is created successfully!",
            userLoggedIn: "Logged in successfully!",
        },
        errorMsg: {
            postError: "Couldn't create the user.",
            unauthorizedLogin:
                "This account doesn't exist, try signing up first.",
        },
    };

    // TODO: make sure that there won't be a duplicate users upon creating a new one via Google

    useEffect(() => {
        const handleUser = async () => {
            if (session && session.user && session.user.email) {
                // check if the user exists in the database
                const sanityUser = await getUserByCondition({
                    email: session.user.email,
                });

                var userObj;

                // if the user exists, then this is a "LOGIN google" process
                if (sanityUser) {
                    userObj = sanityUserToLocalUser(sanityUser);

                    setSnackbarMsg(successMsg.userLoggedIn);
                    setSnackbarSeverity("success");
                    window.localStorage.removeItem("google-process");
                } else {
                    // if not, then it is either a "SIGN-UP" or a "LOGIN" with no credentials
                    const googleProcess =
                        window.localStorage.getItem("google-process");

                    // if this is an unauthorized "LOGIN google" process, abort it
                    if (googleProcess === "login") {
                        setTimeout(() => {
                            router.push("/account/signup");
                        }, 5000);

                        signOut({ redirect: false });
                        setSnackbarMsg(errorMsg.unauthorizedLogin);
                        setSnackbarSeverity("error");
                        setIsSnackbarOpen(true);
                        window.localStorage.removeItem("user");
                        window.localStorage.removeItem("userId");
                        window.localStorage.removeItem("google-process");

                        setTimeout(() => {
                            router.push("/");
                        }, 5000);

                        return;
                    }

                    window.localStorage.removeItem("google-process");

                    // if this is a "SIGN-UP google" process, create the user on Sanity
                    const response: Response = await createUser({
                        userName: `${session.user.name}`,
                        email: `${session.user.email}`,
                        password: "123456789",
                    });

                    // if the user is created successfully:
                    if (response.status === 200) {
                        // set the cookies and show a snackbar msg
                        userObj = {
                            userName: session.user.name,
                            email: session.user.email,
                            avatar: {
                                asset: { url: "/person.jpg" },
                            },
                        };

                        setSnackbarMsg(successMsg.userCreated);
                        setSnackbarSeverity("success");
                    } else {
                        // if there were an error upon creating the user:
                        setSnackbarMsg(errorMsg.postError);
                        setSnackbarSeverity("error");
                        setIsSnackbarOpen(true);

                        setTimeout(() => {
                            router.push("/");
                        }, 5000);

                        return;
                    }
                }

                if (!!!window.localStorage.getItem("user")) {
                    setIsSnackbarOpen(true);
                }

                window.localStorage.setItem("user", JSON.stringify(userObj));
                window.localStorage.setItem("userId", sanityUser._id);

                if (!!!window.localStorage.getItem("splash")) {
                    window.localStorage.setItem("splash", "active");
                    window.location.reload();
                } else {
                    setTimeout(() => {
                        router.push("/");
                    }, 3000);
                }
            } else {
                const localUser = window.localStorage.getItem("user");

                if (localUser) {
                    setIsSnackbarOpen(true);
                    setSnackbarMsg(successMsg.userLoggedIn);
                    setSnackbarSeverity("success");
                }

                if (!!!window.localStorage.getItem("splash")) {
                    window.localStorage.setItem("splash", "active");
                    window.location.reload();
                } else {
                    setTimeout(() => {
                        router.push("/");
                    }, 5000);
                }
            }
        };

        handleUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [session]);

    return (
        <Stack height="70vh" alignItems="center" justifyContent="center">
            <CircularProgress color="secondary" size={150} sx={{ mb: 10 }} />

            <Typography fontSize={{ xs: "1.5rem" }} sx={{ mb: 5 }}>
                redirecting ...
            </Typography>

            <Alert
                severity={
                    [successMsg.userCreated, successMsg.userLoggedIn].includes(
                        snackbarMsg
                    )
                        ? "success"
                        : [
                              errorMsg.postError,
                              errorMsg.unauthorizedLogin,
                          ].includes(snackbarMsg)
                        ? "error"
                        : "warning"
                }
                variant="standard"
                sx={{
                    width: "fit-content",
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <Typography fontSize={{ xs: "1.5rem" }}>
                    {snackbarMsg}
                </Typography>
            </Alert>
        </Stack>
    );
};

export default Splash;
