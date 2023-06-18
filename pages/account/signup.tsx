import theme from "@/styles/theme";
import {
    Alert,
    Button,
    Divider,
    Snackbar,
    Stack,
    TextField,
    Typography,
    useMediaQuery,
} from "@mui/material";
import { signIn } from "next-auth/react";
import GoogleIcon from "@mui/icons-material/Google";
import { createUser, getUserByCondition } from "@/utils/sanity/user";
import {
    ChangeEvent,
    FormEvent,
    useContext,
    useReducer,
    useState,
} from "react";
import { useRouter } from "next/router";
import { PageVarsContext } from "@/context/pageVars/pageVarsContext";

interface FormData {
    userName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface ReducerProps {
    isSnackbarOpen: boolean;
    snackbarMsg: string;
}

export type ReducerActionProps =
    | {
          type: "isSnackbarOpen";
          payload: boolean;
      }
    | {
          type: "snackbarMsg";
          payload: string;
      };

export default function SignUp() {
    const router = useRouter();
    const lgScreen = useMediaQuery("(min-width:1440px)");

    const {
        setIsSnackbarOpen,
        setSnackbarMsg,
        isSnackbarOpen,
        snackbarMsg,
        setSnackbarSeverity,
    } = useContext(PageVarsContext);

    const [formData, setFormData] = useState<FormData>({
        userName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const { successMsg, errorMsg } = {
        successMsg: "User is created successfully!",
        errorMsg: {
            postError: "Couldn't create the user.",
            duplicateError: "User with this info already exists.",
        },
    };

    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (formData.password === formData.confirmPassword) {
            // check if user already exists
            const sanityUser = await getUserByCondition({
                email: formData.email,
            });

            // if yes, then throw a snackbar error
            if (sanityUser) {
                setIsSnackbarOpen(true);
                setSnackbarMsg(errorMsg.duplicateError);
                setSnackbarSeverity("error");
                return;
            }

            // otherwise, create the user on Sanity
            const response: Response = await createUser({
                userName: formData.userName,
                email: formData.email,
                password: formData.password,
            });

            // open the snackbar
            setIsSnackbarOpen(true);

            // if the user is created successfully:
            if (response.status === 200) {
                setSnackbarMsg(successMsg);
                setSnackbarSeverity("success");

                // set the cookies and route to the main page
                window.localStorage.setItem(
                    "user",
                    JSON.stringify({
                        userName: formData.userName,
                        email: formData.email,
                        avatar: {
                            asset: { url: "/person.jpg" },
                        },
                    })
                );

                const timeout = setTimeout(() => {
                    router.push("/account/splash");
                }, 1000);

                return () => clearTimeout(timeout);
            } else {
                // if there were an error upon creating the user:
                setSnackbarMsg(errorMsg.postError);
                setSnackbarSeverity("error");
            }
        }
    };

    const handleSignUp = () => {
        window.localStorage.setItem("google-process", "signup");
        signIn("google", { callbackUrl: "/account/splash" });
    };

    return (
        <Stack
            width="100%"
            p={{ xs: 10 }}
            alignItems="center"
            justifyContent="center"
            direction={{ xs: "column", lg: "row" }}
        >
            <Stack
                component="form"
                onSubmit={handleSubmit}
                width={{ xs: "100%", lg: "50%" }}
            >
                <Typography
                    textAlign="center"
                    mb={{ xs: 5 }}
                    fontSize={{ xs: "2rem" }}
                >
                    Create a new account
                </Typography>
                <TextField
                    name="userName"
                    label="user name"
                    type="text"
                    placeholder="John Doe"
                    helperText="This field is required!"
                    value={formData.userName}
                    onChange={handleInputChange}
                    sx={{
                        label: {
                            color: theme.palette.primary.main,
                            opacity: 0.7,
                        },
                    }}
                />

                <TextField
                    name="email"
                    label="email"
                    type="email"
                    placeholder="example@gmail.com"
                    helperText="This field is required!"
                    value={formData.email}
                    onChange={handleInputChange}
                    sx={{
                        label: {
                            color: theme.palette.primary.main,
                            opacity: 0.7,
                        },
                    }}
                />

                <TextField
                    name="password"
                    label="password"
                    type="password"
                    helperText="This field is required!"
                    value={formData.password}
                    onChange={handleInputChange}
                    sx={{
                        label: {
                            color: theme.palette.primary.main,
                            opacity: 0.7,
                        },
                    }}
                />

                <TextField
                    name="confirmPassword"
                    label="confirm password"
                    type="password"
                    helperText="This field is required!"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    sx={{
                        label: {
                            color: theme.palette.primary.main,
                            opacity: 0.7,
                        },
                    }}
                />

                <Button
                    type="submit"
                    variant="contained"
                    sx={{
                        width: "100%",
                        p: { xs: 1 },
                        fontSize: { xs: "1rem" },
                    }}
                >
                    submit
                </Button>
            </Stack>

            <Divider
                orientation={lgScreen ? "vertical" : "horizontal"}
                sx={{
                    my: 3,
                    mx: 3,
                    width: { xs: "100%", lg: "10px" },
                    height: { xs: "10px", lg: "400px" },
                    color: "black",
                }}
            />

            <Stack width={{ xs: "100%", lg: "50%" }} px={{ xs: 3, lg: 10 }}>
                <Typography
                    textAlign="center"
                    mb={{ xs: 5 }}
                    fontSize={{ xs: "2rem" }}
                >
                    or sign up with google
                </Typography>

                <Button
                    onClick={handleSignUp}
                    variant="contained"
                    sx={{
                        display: "flex",
                        py: { xs: 1 },
                        px: { xs: 2 },
                        fontSize: { xs: "1rem" },
                    }}
                >
                    sign up
                    <GoogleIcon sx={{ ml: { xs: 2 } }} />
                </Button>
            </Stack>
        </Stack>
    );
}
