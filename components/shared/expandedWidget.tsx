import { Box, Stack } from "@mui/material";
import { ReactNode } from "react";

interface ExpandedWidgetProps {
    icon: ReactNode;
    iconOnClick: () => void;
    content: ReactNode;
    isOpened: boolean;
    iconSize?: string;
    height?: string;
    colorHovered?: string;
    extraSX?: any;
}

const ExpandedWidget = ({
    icon,
    iconOnClick,
    content,
    isOpened,
    iconSize = "3rem",
    height = "48px",
    colorHovered = "background.paper",
    extraSX,
}: ExpandedWidgetProps) => {
    return (
        <Stack p={1} direction="row">
            <Stack
                component="div"
                sx={{
                    p: 1,
                    height: iconSize,
                    width: iconSize,
                    cursor: "pointer",
                    bgcolor: "background.paper",
                    color: "secondary.main",
                    borderRadius: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 5,
                    transition: "0.3s ease",

                    "&:hover": {
                        color: colorHovered,
                    },

                    ...extraSX,
                }}
                onClick={iconOnClick}
            >
                {icon}
            </Stack>

            <Stack
                justifyContent="center"
                sx={{
                    bgcolor: "background.paper",
                    height: height,
                    transform: `translateX(calc(-1 * (${iconSize} / 2)))`,
                    pl: isOpened ? `calc(${iconSize} / 2)` : 0,
                    zIndex: 4,
                    transition: "0.3s ease",
                    borderTopRightRadius: height,
                    borderBottomRightRadius: height,
                }}
            >
                {content}
            </Stack>
        </Stack>
    );
};

export default ExpandedWidget;
