import DetailsSection from "@/components/profile/detailsSection";
import InfoSection from "@/components/profile/infoSection";
import PreferencesSection from "@/components/profile/preferencesSection";
import useUserData from "@/hooks/useUserData";
import theme from "@/styles/theme";
import { deleteUser } from "@/utils/sanity/user";
import { Avatar, Button, Stack, Typography } from "@mui/material";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";

export default function Profile() {
    const user = useUserData();
    const router = useRouter();

    return (
        <Stack px={20} py={10} alignItems="center">
            <Stack direction={{ xs: "column", lg: "row" }} spacing={{ xs: 10 }}>
                <InfoSection user={user} />

                <Stack width={{ xs: "100%", md: "70%" }} spacing={10}>
                    <PreferencesSection user={user} />
                    <DetailsSection user={user} />

                    <Button
                        variant="contained"
                        onClick={async () => {
                            if (user && user?._id) {
                                try {
                                    await deleteUser({ userId: user._id });
                                    localStorage.removeItem("userId");
                                    signOut();
                                    router.push("/");
                                } catch {}
                            }
                        }}
                        sx={{
                            width: "fit-content",
                            bgcolor: theme.palette.error.main,
                            alignSelf: "center",
                            fontSize: "1.5rem",
                            px: 10,
                        }}
                    >
                        delete account
                    </Button>
                </Stack>
            </Stack>
        </Stack>
    );
}
