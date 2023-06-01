import {
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    List,
    Radio,
    RadioGroup,
    Stack,
    Switch,
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import CustomDivider from "../shared/customDivider";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import { LocalUser } from "@/types/user";

const MenuContents = () => {
    const [language, setLanguage] = useState("english");
    const router = useRouter();

    const [user, setUser] = useState<LocalUser | null>(null);

    useEffect(() => {
        const user = window.localStorage.getItem("user");
        if (user) {
            const userObj: LocalUser = JSON.parse(user);
            setUser(userObj);
        }
    }, []);

    return (
        <List
            sx={{
                zIndex: 11,
            }}
        >
            <Stack
                direction="row"
                alignItems="center"
                textTransform="capitalize"
            >
                <Typography>dark mode</Typography>
                <Switch />
            </Stack>

            <CustomDivider />

            <FormControl sx={{ width: "100%" }}>
                <FormLabel>Language</FormLabel>
                <RadioGroup
                    sx={{
                        alignItems: "center",
                    }}
                    value={language}
                    onChange={(event) => {
                        setLanguage((event.target as HTMLInputElement).value);
                    }}
                >
                    <FormControlLabel
                        value="english"
                        control={<Radio />}
                        label="English"
                    />
                    <FormControlLabel
                        value="arabic"
                        control={<Radio />}
                        label="Arabic"
                    />
                </RadioGroup>
            </FormControl>

            <CustomDivider />

            <Button
                variant="contained"
                endIcon={<FavoriteIcon />}
                sx={{ my: 2, width: "100%" }}
                onClick={() => {
                    router.push("/wishlist");
                }}
            >
                whish list
            </Button>

            <CustomDivider />

            {user ? (
                <Button
                    variant="outlined"
                    endIcon={<LogoutIcon />}
                    sx={{ my: 1, textTransform: "lowercase", width: "100%" }}
                    onClick={() => {
                        window.localStorage.removeItem("user");
                        signOut();
                        router.push("/");
                    }}
                >
                    logout
                </Button>
            ) : (
                <Stack>
                    <Button
                        variant="outlined"
                        endIcon={<LoginIcon />}
                        sx={{ my: 1, textTransform: "lowercase" }}
                        onClick={() => {
                            router.push("/account/login");
                        }}
                    >
                        login
                    </Button>

                    <Button
                        variant="outlined"
                        endIcon={<PersonAddAltIcon />}
                        sx={{ my: 1, textTransform: "lowercase" }}
                        onClick={() => {
                            router.push("/account/signup");
                        }}
                    >
                        sign-up
                    </Button>
                </Stack>
            )}
        </List>
    );
};

export default MenuContents;
