import BookPage from "@/components/product";
import YouMayAlsoLike from "@/components/shared/youMayAlsoLike";
import { Item } from "@/types/item";
import { Stack } from "@mui/material";
import { getAllItems, getItemByCondition } from "@/utils/sanity/item";
import itemTitleSerializer from "@/utils/helpers/itemTitleSerializer";
import { Review } from "@/types/review";
import { getReviewsForItem } from "@/utils/sanity/review";

export const getStaticPaths = async () => {
    const items = await getAllItems();

    const paths = items.map((item) => {
        return {
            params: { title: itemTitleSerializer(item.title, "underscored") },
        };
    });

    return {
        paths,
        fallback: false,
    };
};

export const getStaticProps = async (context: {
    params: { title: string };
}): Promise<{
    props: { item: Item; reviews: Review[] };
}> => {
    const title = itemTitleSerializer(context.params.title, "normal");
    const item = await getItemByCondition({ title });
    const reviews = await getReviewsForItem(item._id);

    return {
        props: { item, reviews },
    };
};

export default function Product({
    item,
    reviews,
}: {
    item: Item;
    reviews: Review[];
}) {
    return (
        <Stack alignItems="center">
            <BookPage item={item} reviews={reviews} />
            <YouMayAlsoLike />

            {/* <Stack p={5} alignItems="center" height="70vh">
                <Typography
                    mt={2}
                    fontSize={{ xs: "3rem" }}
                    color="primary"
                    textTransform="capitalize"
                >
                    wrong gateway
                </Typography>

                <Typography
                    fontSize={{ xs: "1.5rem" }}
                    color="secondary"
                    mt={{ xs: 1 }}
                    mb={{ xs: 8 }}
                >
                    redirecting to home page ...
                </Typography>

                <AssistantDirectionIcon
                    color="primary"
                    sx={{
                        width: "5rem",
                        height: "5rem",
                    }}
                />
            </Stack> */}
        </Stack>
    );
}