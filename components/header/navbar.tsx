import { Box, Button, Stack } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";

const Navbar = () => {
    const router = useRouter();

    const navButton = (text: string) => {
        return (
            <Link
                href={`/${text === "home" ? "" : text}`}
                style={{
                    zIndex: 3,
                }}
            >
                <Button
                    variant="text"
                    sx={{
                        position: "relative",

                        "&::after": {
                            content: `""`,
                            position: "absolute",
                            bottom: 0,
                            width: [router.asPath.slice(1)].includes(
                                text === "home" ? "" : text
                            )
                                ? "100%"
                                : "0%",
                            height: "3px",
                            bgcolor: "primary.main",
                            transition: "0.3s ease",
                        },
                    }}
                >
                    {text}
                </Button>
            </Link>
        );
    };

    return (
        <Stack direction="row" spacing={2}>
            {navButton("home")}
            {navButton("categories")}
            {navButton("authors")}
        </Stack>
    );
};

export default Navbar;
