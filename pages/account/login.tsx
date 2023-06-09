import {
    Button,
    Divider,
    Stack,
    TextField,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import { signIn } from "next-auth/react";
import { ChangeEvent, FormEvent, useContext, useState } from "react";
import GoogleIcon from "@mui/icons-material/Google";
import { getUserByCondition } from "@/utils/sanity/user";
import { useRouter } from "next/router";
import { PageVarsContext } from "@/context/pageVars/pageVarsContext";
import sanityUserToLocalUser from "@/utils/helpers/sanityUserToLocalUser";

interface FormData {
    email: string;
    password: string;
}

export default function Login() {
    const lgScreen = useMediaQuery("(min-width:1440px)");
    const router = useRouter();
    const theme = useTheme();
    const { setIsSnackbarOpen, setSnackbarMsg } = useContext(PageVarsContext);

    const [formData, setFormData] = useState<FormData>({
        email: "",
        password: "",
    });

    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogIn = () => {
        window.localStorage.setItem("google-process", "login");
        signIn("google", { callbackUrl: "/account/splash" });
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // check if user exists
        const sanityUser = await getUserByCondition({
            email: formData.email,
        });

        if (!sanityUser) {
            setIsSnackbarOpen(true);
            setSnackbarMsg("This account doesn't exist!");
            return;
        }

        if (sanityUser.password !== formData.password) {
            setIsSnackbarOpen(true);
            setSnackbarMsg("Wrong password");
            return;
        }

        localStorage.setItem("userId", sanityUser._id);
        router.push("/account/splash");
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
                    Login with your account
                </Typography>

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

                <Button
                    type="submit"
                    variant="contained"
                    sx={{
                        width: "100%",
                        p: { xs: 1 },
                        fontSize: { xs: "1rem" },
                    }}
                >
                    login
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
                    or login with google
                </Typography>

                <Button
                    onClick={handleLogIn}
                    variant="contained"
                    sx={{
                        display: "flex",
                        py: { xs: 1 },
                        px: { xs: 2 },
                        fontSize: { xs: "1rem" },
                    }}
                >
                    login
                    <GoogleIcon sx={{ ml: { xs: 2 } }} />
                </Button>
            </Stack>
        </Stack>
    );
}
