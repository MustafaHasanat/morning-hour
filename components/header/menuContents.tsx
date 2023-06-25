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
import { useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import CustomDivider from "../shared/customDivider";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import useUserData from "@/hooks/useUserData";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

const MenuContents = () => {
    const [language, setLanguage] = useState("english");
    const router = useRouter();
    const user = useUserData();

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

            {user && (
                <>
                    <Button
                        variant="contained"
                        endIcon={<AssignmentIndIcon />}
                        sx={{ my: 2, width: "100%" }}
                        onClick={() => {
                            router.push("/account/profile");
                        }}
                    >
                        profile
                    </Button>

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

                    {user.isAdmin && (
                        <Button
                            variant="contained"
                            endIcon={<AdminPanelSettingsIcon />}
                            sx={{ my: 2, width: "100%" }}
                            onClick={() => {
                                router.push("/admin");
                            }}
                        >
                            admin dashboard
                        </Button>
                    )}

                    <CustomDivider />
                </>
            )}

            {user ? (
                <Button
                    variant="outlined"
                    endIcon={<LogoutIcon />}
                    sx={{ my: 1, textTransform: "lowercase", width: "100%" }}
                    onClick={() => {
                        localStorage.removeItem("userId");
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
