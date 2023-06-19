import { Box } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { Dispatch } from "react";
import { motion } from "framer-motion";
import { ReducerActionProps, ReducerProps } from "./reviewsBox";

interface ReviewStarProps {
    index: number;
    starsState: ReducerProps;
    dispatchStars: Dispatch<ReducerActionProps>;
}

const ReviewStar = ({ index, starsState, dispatchStars }: ReviewStarProps) => {
    return (
        <Box
            component={motion.div}
            animate={{
                color:
                    starsState.hoveredStar >= index + 1 ||
                    starsState.selectedStar >= index + 1
                        ? "#ffd700"
                        : "#808080",
                opacity:
                    starsState.hoveredStar >= index + 1 ||
                    starsState.selectedStar >= index + 1
                        ? 1
                        : 0.2,
            }}
            whileHover={{
                scale: 1.3,
            }}
            whileTap={{
                scale: 0.8,
            }}
            sx={{
                width: "2.5rem",
                height: "2.5rem",
                cursor: "pointer",
            }}
            onMouseEnter={() => {
                dispatchStars({ type: "hoveredStar", payload: index + 1 });
            }}
            onMouseLeave={() => {
                dispatchStars({ type: "hoveredStar", payload: 0 });
            }}
            onClick={() => {
                dispatchStars({
                    type: "selectedStar",
                    payload:
                        starsState.selectedStar === index + 1 ? 0 : index + 1,
                });
            }}
        >
            <StarIcon
                sx={{
                    width: "100%",
                    height: "100%",
                }}
            />
        </Box>
    );
};

export default ReviewStar;
