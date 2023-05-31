import { Button, Stack } from "@mui/material";
import { signIn } from "next-auth/react";

export default function Login() {
    const handleLogIn = () => {
        signIn("google", { callbackUrl: "http://localhost:3000" })
            .then(() => {
                console.log("Login succeeded");
            })
            .catch(() => {
                console.log("Login failed");
            });
    };

    return (
        <Stack height={{ xs: "70vh" }}>
            <Button onClick={handleLogIn}>sign in</Button>
        </Stack>
    );
}
