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
    useTheme,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
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
import { PageVarsContext } from "@/context/pageVars/pageVarsContext";

const MenuContents = () => {
    const router = useRouter();
    const { locale } = router;
    const user = useUserData();
    const theme = useTheme();
    const { toggleColorMode, themeMode } = useContext(PageVarsContext);

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
                <Switch
                    onClick={() => {
                        if (themeMode === "light") {
                            localStorage.setItem("colorMode", "dark");
                        } else {
                            localStorage.setItem("colorMode", "light");
                        }
                        toggleColorMode();
                    }}
                />
            </Stack>

            <CustomDivider />

            <FormControl sx={{ width: "100%" }}>
                <FormLabel
                    sx={{
                        color: theme.palette.primary.main,
                    }}
                >
                    Language
                </FormLabel>

                <RadioGroup
                    sx={{
                        alignItems: "center",
                    }}
                    value={locale}
                    onChange={(event) => {
                        router.push("/", "/", { locale: event.target.value });
                    }}
                >
                    <FormControlLabel
                        value="en"
                        control={<Radio />}
                        label="English"
                    />
                    <FormControlLabel
                        value="ar"
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
