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

// TODO: change the sign-out icon and text depending on the state of the user

const MenuContents = () => {
    const [language, setLanguage] = useState("english");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();

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
                onClick={() => {router.push("/wishlist")}}
            >
                whish list
            </Button>

            <CustomDivider />

            {isLoggedIn ? (
                <Button
                    variant="outlined"
                    endIcon={<LogoutIcon />}
                    sx={{ my: 1, textTransform: "lowercase" }}
                >
                    logout
                </Button>
            ) : (
                <Stack>
                    <Button
                        variant="outlined"
                        endIcon={<LoginIcon />}
                        sx={{ my: 1, textTransform: "lowercase" }}
                    >
                        login
                    </Button>

                    <Button
                        variant="outlined"
                        endIcon={<PersonAddAltIcon />}
                        sx={{ my: 1, textTransform: "lowercase" }}
                    >
                        sign-up
                    </Button>
                </Stack>
            )}
        </List>
    );
};

export default MenuContents;
