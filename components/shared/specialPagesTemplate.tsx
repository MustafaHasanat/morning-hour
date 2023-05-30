import { Stack, Typography, useTheme } from "@mui/material";

const SpecialPagesTemplate = ({
    text,
    statusCode,
}: {
    text: string;
    statusCode: string;
}) => {
    const theme = useTheme();

    return (
        <Stack
            spacing={3}
            justifyContent="center"
            alignItems="center"
            bgcolor={theme.palette.secondary.main}
            sx={{
                height: "100vh",
            }}
        >
            <Typography>{statusCode}</Typography>
            <Typography>{text}</Typography>
        </Stack>
    );
};

export default SpecialPagesTemplate;
