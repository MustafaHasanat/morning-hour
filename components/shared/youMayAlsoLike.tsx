import { Divider, Stack } from "@mui/material";
import TitleBox from "./titleBox";
import BestSellingSlider from "./bestSellingSlider";

const YouMayAlsoLike = () => {
    return (
        <Stack width="90%">
            <Divider
                sx={{
                    mt: 5,
                    mb: 10,
                }}
            />

            <TitleBox
                title="you may also like"
                subTitle="check out some of our popular books"
            />

            <BestSellingSlider />
        </Stack>
    );
};

export default YouMayAlsoLike;
