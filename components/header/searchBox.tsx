import { Stack, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import ExpandedWidget from "../shared/expandedWidget";
import { ItemsContext } from "@/context/items/itemsContext";

interface SearchBoxProps {}

const SearchBox = ({}: SearchBoxProps) => {
    const router = useRouter();
    const [isOpened, setIsOpened] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const { searchTerm, setSearchTerm } = useContext(ItemsContext);

    useEffect(() => {
        setIsOpened(false);
        setSearchTerm("");
    }, [router.asPath, setSearchTerm]);

    return (
        <Stack p={1} direction="row" alignItems="center">
            <ExpandedWidget
                isOpened={isOpened}
                content={
                    <TextField
                        inputRef={inputRef}
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
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
                            document
                                .getElementById("discover-items-section")
                                ?.scrollIntoView({
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
