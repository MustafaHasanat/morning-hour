import { Button, Stack } from "@mui/material";
import Link from "next/link";

const Navbar = () => {
    const navButton = (text: string) => {
        return (
            <Link href={`/${text === "home" ? "" : text}`}>
                <Button variant="contained" sx={{ bgcolor: "secondary.main" }}>
                    {text}
                </Button>
            </Link>
        );
    };

    return (
        <Stack direction="row" spacing={2}>
            {navButton("home")}
            {navButton("authors")}
            {navButton("categories")}
        </Stack>
    );
};

export default Navbar;
