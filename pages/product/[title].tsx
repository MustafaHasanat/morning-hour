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
        </Stack>
    );
}
