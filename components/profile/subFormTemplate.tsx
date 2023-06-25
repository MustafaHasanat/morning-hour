import {
    Button,
    FormControlLabel,
    Radio,
    RadioGroup,
    Slider,
    Stack,
    TextField,
    Typography,
    useTheme,
} from "@mui/material";
import CustomDivider from "../shared/customDivider";
import { FormDataProps, UserFieldProps } from "@/pages/account/profile";
import { User } from "@/types/user";

interface Props {
    title: string;
    subTitle?: string;
    name: UserFieldProps;
    label: string;
    type: string;
    placeholder: string;
    formData: FormDataProps;
    handleInputChange: any;
    handleSave: (field: UserFieldProps) => Promise<void>;
    user: User | null;
}

const SubFormTemplate = ({
    title,
    subTitle,
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

    const theme = useTheme();

    const componentContent = () => {
        switch (name) {
            case "password":
                return passwordArray.map((subName) => {
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
                });

            case "gender":
                return (
                    <RadioGroup
                        defaultValue={`${formData[name]}`}
                        onChange={handleInputChange}
                        name={name}
                        value={`${formData[name]}`}
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            gap: 5,
                        }}
                    >
                        <FormControlLabel
                            value="male"
                            control={<Radio />}
                            label="Male"
                        />
                        <FormControlLabel
                            value="female"
                            control={<Radio />}
                            label="Female"
                        />
                    </RadioGroup>
                );

            case "pricingRange":
                return (
                    <Slider
                        name={name}
                        size="medium"
                        value={formData.pricingRange}
                        valueLabelDisplay="on"
                        onChange={handleInputChange}
                        disableSwap
                        sx={{
                            width: { xs: "100%", lg: "80%" },
                            py: { xs: 10, lg: 5 },
                        }}
                    />
                );

            default:
                return (
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
                );
        }
    };

    return (
        <>
            <Stack>
                <Typography fontSize={{ xs: "1.2rem" }} textAlign="left">
                    {title}
                </Typography>

                {subTitle && (
                    <Typography
                        fontSize={{ xs: "1rem" }}
                        textAlign="left"
                        sx={{
                            opacity: 0.7,
                        }}
                    >
                        {subTitle}
                    </Typography>
                )}
            </Stack>

            {componentContent()}

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
