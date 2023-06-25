import { Avatar, Stack, Typography, useTheme } from "@mui/material";
import { useRouter } from "next/router";
import itemTitleSerializer from "@/utils/helpers/itemTitleSerializer";
import { Author } from "@/types/author";

interface Props {
    author: Author;
}

const AuthorCard = ({ author }: Props) => {
    const router = useRouter();
    const theme = useTheme();

    return (
        <Stack
            p={{ xs: "1rem" }}
            width={{ xs: "15rem" }}
            bgcolor="background.default"
            borderRadius={2}
            alignItems="center"
            boxShadow={`5px 5px 15px 1px ${theme.palette.primary.main}`}
            sx={{
                cursor: "pointer",
                transition: "0.3s ease",
                "&:hover": {
                    transform: "scale(1.1)",
                    opacity: 0.5,
                },
            }}
            onClick={() => {
                router.push(
                    author
                        ? `/authors/${itemTitleSerializer(
                              author.name,
                              "underscored"
                          )}`
                        : "/"
                );
            }}
        >
            <Avatar
                variant="rounded"
                src={author ? author.image.asset.url : ""}
                alt={`main card: ${author && author.name}`}
                sx={{
                    width: "10rem",
                    height: "10rem",
                }}
            />

            <Typography
                mt={{ xs: 2 }}
                fontSize={{ xs: "1.2rem" }}
                textAlign="center"
            >
                {author?.name}
            </Typography>
        </Stack>
    );
};

export default AuthorCard;
