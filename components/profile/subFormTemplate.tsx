import theme from "@/styles/theme";
import { Autocomplete, Button, TextField, Typography } from "@mui/material";
import CustomDivider from "../shared/customDivider";
import { FormDataProps, UserFieldProps } from "./detailsSection";
import { ChangeEvent } from "react";

interface Props {
    title: string;
    name: UserFieldProps;
    label: string;
    type: string;
    placeholder: string;
    formData: FormDataProps;
    handleInputChange: (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    handleSave: (field: UserFieldProps) => Promise<void>;
}

const SubFormTemplate = ({
    title,
    name,
    label,
    placeholder,
    type,
    formData,
    handleInputChange,
    handleSave,
}: Props) => {
    const passwordArray: (
        | "currentPassword"
        | "password"
        | "confirmedPassword"
    )[] = ["currentPassword", "password", "confirmedPassword"];

    return (
        <>
            <Typography fontSize={{ xs: "1.2rem" }} textAlign="left">
                {title}
            </Typography>

            {name === "password" ? (
                passwordArray.map((subName) => {
                    return (
                        <TextField
                            key={`password text field: ${subName}`}
                            name={subName}
                            label={label}
                            type={type}
                            placeholder={placeholder}
                            value={formData[subName]}
                            onChange={handleInputChange}
                            sx={{
                                label: {
                                    color: theme.palette.primary.main,
                                    opacity: 0.7,
                                },
                            }}
                        />
                    );
                })
            ) : name === "gender" ? (
                <Autocomplete
                    disablePortal
                    options={[{ label: "male" }, { label: "female" }]}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            name={name}
                            label={label}
                            placeholder={placeholder}
                            value={`${formData[name]}`}
                            aria-readonly
                            onChange={handleInputChange}
                            sx={{
                                label: {
                                    color: theme.palette.primary.main,
                                    opacity: 0.7,
                                },
                            }}
                        />
                    )}
                />
            ) : (
                <TextField
                    name={name}
                    label={label}
                    type={type}
                    placeholder={placeholder}
                    value={`${formData[name]}`}
                    onChange={handleInputChange}
                    sx={{
                        label: {
                            color: theme.palette.primary.main,
                            opacity: 0.7,
                        },
                    }}
                />
            )}

            <Button
                variant="contained"
                onClick={() => {
                    handleSave(name);
                }}
                sx={{ width: "fit-content", alignSelf: "end" }}
            >
                save
            </Button>

            <CustomDivider />
        </>
    );
};

export default SubFormTemplate;
