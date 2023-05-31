import {
    Alert,
    Button,
    Snackbar,
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

interface ReviewsBoxProps {
    item: Item;
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

const ReviewsBox = ({ item }: ReviewsBoxProps) => {
    const fieldRef = useRef<HTMLInputElement | null>(null);
    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

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

    const mapStartsToReview = (stars: number): string => {
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

    const handleAddingReview = () => {
        if (starsState.selectedStar !== 0 && fieldRef.current?.value !== "") {
            if (fieldRef.current)
                createReview({
                    text: fieldRef.current.value,
                    rating: starsState.selectedStar,
                    itemId: item._id,
                    userId: "",
                });
        } else {
            setIsSnackbarOpen(true);
        }
    };

    return (
        <Stack alignItems="center">
            <Typography
                mb={{ xs: 10 }}
                fontSize={{ xs: "2rem" }}
                textTransform="capitalize"
            >
                reviews
            </Typography>

            {[].map((review, index) => {
                return <Stack key={`${index}`}></Stack>;
            })}

            <Stack width="100%" px={{ xs: 30 }}>
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
                        {mapStartsToReview(starsState.selectedStar)}
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

                <Snackbar
                    open={isSnackbarOpen}
                    autoHideDuration={5000}
                    onClose={() => {
                        setIsSnackbarOpen(false);
                    }}
                >
                    <Alert
                        severity="error"
                        variant="filled"
                        sx={{ width: "100%" }}
                    >
                        You have to fill the field and rating!
                    </Alert>
                </Snackbar>
            </Stack>
        </Stack>
    );
};

export default ReviewsBox;
