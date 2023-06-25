import { User } from "@/types/user";
import { deleteUser } from "@/utils/sanity/user";
import { Button, useTheme } from "@mui/material";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";

interface Props {
    user: User | null;
}

const DeleteButton = ({ user }: Props) => {
    const router = useRouter();
    const theme = useTheme();

    return (
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
    );
};

export default DeleteButton;
