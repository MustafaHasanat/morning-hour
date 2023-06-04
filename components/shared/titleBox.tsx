import { Stack, Typography } from "@mui/material";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const TitleBox = ({ title, subTitle }: { title: string; subTitle: string }) => {
    const boxRef = useRef(null);
    const boxInView = useInView(boxRef);

    return (
        <Stack
            component={motion.div}
            ref={boxRef}
            initial={{
                y: 100,
                opacity: 0,
            }}
            animate={{
                y: boxInView ? 0 : 80,
                opacity: boxInView ? 1 : 0,
                transition: {
                    duration: 1,
                },
            }}
            mb={{ xs: 10 }}
            alignItems="center"
        >
            <Typography
                textTransform="capitalize"
                fontSize={{ xs: "3rem" }}
                color="primary"
            >
                {title}
            </Typography>

            <Typography fontSize={{ xs: "1.3rem" }} color="secondary">
                {subTitle}
            </Typography>
        </Stack>
    );
};

export default TitleBox;
