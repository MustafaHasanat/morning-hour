import { Stack, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { itemsActions } from "@/utils/store";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import ExpandedWidget from "../shared/expandedWidget";

interface SearchBoxProps {}

const SearchBox = ({}: SearchBoxProps) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [isOpened, setIsOpened] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const searchTerm = useSelector(
        (state: { itemsReducer: { searchTerm: string } }) =>
            state.itemsReducer.searchTerm
    );

    useEffect(() => {
        setIsOpened(false);
        dispatch(itemsActions.setSearchTerm(""));
    }, [dispatch, router.asPath]);

    return (
        <Stack p={1} direction="row" alignItems="center">
            <ExpandedWidget
                isOpened={isOpened}
                content={
                    <TextField
                        inputRef={inputRef}
                        value={searchTerm}
                        onChange={(e) => {
                            dispatch(
                                itemsActions.setSearchTerm(e.target.value)
                            );
                        }}
                        sx={{
                            transition: "0.6s ease",
                            fontSize: "1rem",
                            width: isOpened ? "13rem" : "0px",

                            "& .MuiOutlinedInput-root": {
                                "&.Mui-focused fieldset": {
                                    border: 0,
                                },
                            },

                            input: {
                                p: isOpened ? 1 : 0,
                            },

                            fieldset: {
                                border: 0,
                            },
                        }}
                    />
                }
                icon={
                    <SearchIcon
                        sx={{
                            height: "100%",
                            width: "100%",
                        }}
                    />
                }
                iconOnClick={() => {
                    setIsOpened((prev) => {
                        if (!prev) {
                            inputRef?.current?.focus();
                            document.getElementById("best-selling-section")?.scrollIntoView({
                                behavior: "smooth",
                            });
                        }
                        return !prev;
                    });
                }}
            />
        </Stack>
    );
};

export default SearchBox;
