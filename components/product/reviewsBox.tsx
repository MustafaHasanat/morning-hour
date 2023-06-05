import {
    Avatar,
    Box,
    Button,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import RateReviewIcon from "@mui/icons-material/RateReview";
import ReviewStar from "./reviewStar";
import { Fragment, useReducer, useRef, useState } from "react";
import theme from "@/styles/theme";
import { createReview } from "@/utils/sanity/review";
import { Item } from "@/types/item";
import { Review } from "@/types/review";
import StarIcon from "@mui/icons-material/Star";
import SnackbarWrapper from "../shared/snackbarWrapper";
import { motion } from "framer-motion";

interface ReviewsBoxProps {
    item: Item;
    reviews: Review[];
}

export interface ReducerProps {
    hoveredStar: number;
    selectedStar: number;
}

export type ReducerActionProps =
    | {
          type: "hoveredStar";
          payload: number;
      }
    | {
          type: "selectedStar";
          payload: number;
      };

const ReviewsBox = ({ item, reviews }: ReviewsBoxProps) => {
    const fieldRef = useRef<HTMLInputElement | null>(null);
    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
    const [snackbarMsg, setSnackbarMsg] = useState("");

    const [maxReviews, setMaxReviews] = useState(5);

    const [starsState, dispatchStars] = useReducer(
        (state: ReducerProps, action: ReducerActionProps) => {
            switch (action.type) {
                case "hoveredStar":
                    return {
                        ...state,
                        hoveredStar: action.payload,
                    };
                case "selectedStar":
                    return {
                        ...state,
                        selectedStar: action.payload,
                    };
            }
        },
        {
            hoveredStar: 0,
            selectedStar: 0,
        }
    );

    const mapStarsToReview = (stars: number): string => {
        switch (stars) {
            case 1:
                return "(very bad)";
            case 2:
                return "(bad)";
            case 3:
                return "(ok)";
            case 4:
                return "(good)";
            case 5:
                return "(very good)";
            default:
                return "";
        }
    };

    const { successMsg, errorMsg } = {
        successMsg:
            "Your review is registered successfully! .. It may take a minute to show up.",
        errorMsg: {
            authenticationError: "You have to sign in to write reviews!",
            dataError: "You have to fill the field and rating!",
        },
    };

    const handleAddingReview = () => {
        const localUser = localStorage.getItem("user");

        if (!!!localUser) {
            setSnackbarMsg(errorMsg.authenticationError);
            setIsSnackbarOpen(true);
            return;
        }

        if (starsState.selectedStar === 0 || fieldRef.current?.value === "") {
            setSnackbarMsg(errorMsg.dataError);
            setIsSnackbarOpen(true);
            return;
        }

        if (fieldRef.current) {
            const userObj = JSON.parse(localUser);

            try {
                createReview({
                    text: fieldRef.current.value,
                    rating: starsState.selectedStar,
                    itemId: item._id,
                    userId: userObj.id,
                });

                setSnackbarMsg(successMsg);
                setIsSnackbarOpen(true);
            } catch (error) {
                console.log("Error creating a review: ", error);
            }
        }
    };

    return (
        <Stack alignItems="center" px={{ xs: 30 }}>
            <Typography
                mb={{ xs: 10 }}
                fontSize={{ xs: "2rem" }}
                textTransform="capitalize"
            >
                reviews
            </Typography>

            <Stack width="100%" mb={{ xs: 10 }} spacing={5}>
                {reviews.slice(0, maxReviews).map((review, index) => {
                    return (
                        <Stack
                            key={`review number ${index} for item ${item.title}`}
                            component={motion.div}
                            initial={{ height: "0px", padding: "0px" }}
                            animate={{
                                height: "fit-content",
                                padding: "32px",
                            }}
                            spacing={5}
                            bgcolor="background.default"
                            borderRadius={2}
                            overflow="hidden"
                        >
                            <Stack
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                            >
                                <Stack
                                    direction="row"
                                    alignItems="center"
                                    spacing={2}
                                >
                                    <Avatar
                                        alt="user avatar"
                                        src={review.user.avatar.asset.url}
                                    />
                                    <Typography>
                                        {review.user.userName}
                                    </Typography>
                                </Stack>

                                <Stack direction="row">
                                    {Array(5)
                                        .fill(0)
                                        .map((val, index) => {
                                            return (
                                                <Box
                                                    key={`review section - rating star for ${item.title} number ${index}`}
                                                    sx={{
                                                        width: "2rem",
                                                        height: "2rem",
                                                    }}
                                                >
                                                    <StarIcon
                                                        sx={{
                                                            width: "100%",
                                                            height: "100%",
                                                            opacity:
                                                                index >=
                                                                Math.floor(
                                                                    review.rating
                                                                )
                                                                    ? 0.2
                                                                    : 1,
                                                            color:
                                                                index >=
                                                                Math.floor(
                                                                    review.rating
                                                                )
                                                                    ? "gray"
                                                                    : "gold",
                                                        }}
                                                    />
                                                </Box>
                                            );
                                        })}
                                </Stack>
                            </Stack>

                            <Typography px={1}>{review.text}</Typography>
                        </Stack>
                    );
                })}
            </Stack>

            {reviews.length > maxReviews && (
                <Button
                    variant="outlined"
                    onClick={() => {
                        setMaxReviews((prev) => prev + 5);
                    }}
                    sx={{ mb: 8 }}
                >
                    load more
                </Button>
            )}
            <Stack width="100%">
                <Typography
                    mb={{ xs: 2 }}
                    fontSize={{ xs: "1.5rem" }}
                    textTransform="capitalize"
                    color="secondary"
                >
                    leave a review:
                </Typography>

                <TextField
                    variant="outlined"
                    inputRef={fieldRef}
                    label={"what did you think of this book?"}
                    error={isSnackbarOpen && fieldRef.current?.value === ""}
                    helperText="This field is required!"
                    multiline
                    type="text"
                    sx={{
                        width: "100%",

                        label: {
                            color: theme.palette.primary.main,
                            opacity: 0.7,
                        },
                    }}
                />

                <Stack direction="row" my={1} alignItems="center">
                    {Array(5)
                        .fill(0)
                        .map((val, index) => {
                            return (
                                <Fragment
                                    key={`rating review start number ${index}`}
                                >
                                    <ReviewStar
                                        index={index}
                                        starsState={starsState}
                                        dispatchStars={dispatchStars}
                                    />
                                </Fragment>
                            );
                        })}

                    <Typography ml={{ xs: 5 }} fontSize={{ xs: "1.3rem" }}>
                        {mapStarsToReview(starsState.selectedStar)}
                    </Typography>

                    {isSnackbarOpen && (
                        <Typography
                            fontSize={{ xs: "0.8rem" }}
                            ml={2}
                            color="error"
                        >
                            You have to pick a rating
                        </Typography>
                    )}
                </Stack>

                <Button
                    variant="contained"
                    endIcon={
                        <RateReviewIcon
                            sx={{ width: "2rem", height: "1.5rem" }}
                        />
                    }
                    onClick={handleAddingReview}
                    sx={{
                        fontSize: { xs: "1.2rem" },
                        my: 2,
                        textTransform: "lowercase",
                        width: "fit-content",
                        alignSelf: "end",
                    }}
                >
                    add the review
                </Button>

                <SnackbarWrapper
                    isOpen={isSnackbarOpen}
                    setIsOpen={setIsSnackbarOpen}
                    severity={snackbarMsg === successMsg ? "success" : "error"}
                    text={snackbarMsg}
                />
            </Stack>
        </Stack>
    );
};

export default ReviewsBox;
