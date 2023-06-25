import TitleBox from "@/components/shared/titleBox";
import useUserData from "@/hooks/useUserData";
import { Stack, Typography } from "@mui/material";

interface Props {}

export default function Admin({}: Props) {
    const user = useUserData();

    return !user ? (
        <Stack
            width="100%"
            alignItems="center"
            justifyContent="center"
            height="70vh"
            spacing={10}
        >
            <Typography fontSize="2rem">
                Unauthorized, go to the main page.
            </Typography>
        </Stack>
    ) : (
        <Stack pt={10} px={5} alignItems="center">
            <TitleBox title="Admin Side" subTitle="" />
        </Stack>
    );
}
