import { Avatar, Stack, Typography, useTheme } from "@mui/material";
import { useRouter } from "next/router";
import itemTitleSerializer from "@/utils/helpers/itemTitleSerializer";
import { Category } from "@/types/category";

interface Props {
    category: Category;
}

const CategoryCard = ({ category }: Props) => {
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
                    category
                        ? `/categories/${itemTitleSerializer(
                              category.title,
                              "underscored"
                          )}`
                        : "/"
                );
            }}
        >
            <Avatar
                variant="rounded"
                src={category ? category.image.asset.url : ""}
                alt={`main card: ${category && category.title}`}
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
                {category?.title}
            </Typography>
        </Stack>
    );
};

export default CategoryCard;
