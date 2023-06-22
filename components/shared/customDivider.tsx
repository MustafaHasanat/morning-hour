import { Divider } from "@mui/material";

const CustomDivider = ({
    orientation = "horizontal",
}: {
    orientation?: "vertical" | "horizontal";
}) => {
    return orientation === "horizontal" ? (
        <Divider orientation={orientation} sx={{ width: "100%", my: 1 }} />
    ) : (
        <Divider
            orientation={orientation}
            sx={{ height: "100%", width: "3px", mx: 1 }}
        />
    );
};

export default CustomDivider;
