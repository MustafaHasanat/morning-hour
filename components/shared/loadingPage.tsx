import { CircularProgress, Stack, Typography } from "@mui/material";

const LoadingPage = ({
    message,
    height = "70vh",
}: {
    message: string;
    height?: string;
}) => {
    return (
        <Stack
            height={height}
            justifyContent="center"
            alignItems="center"
            spacing={10}
        >
            <CircularProgress size={150} />
            <Typography fontSize="2rem">{message}</Typography>
        </Stack>
    );
};

export default LoadingPage;
