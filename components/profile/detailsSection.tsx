import theme from "@/styles/theme";
import { User } from "@/types/user";
import { Stack, Typography } from "@mui/material";
import { ChangeEvent, useContext, useState } from "react";
import { changeDetails } from "@/utils/sanity/user";
import { PageVarsContext } from "@/context/pageVars/pageVarsContext";
import SubFormTemplate from "./subFormTemplate";

export type UserFieldProps =
    | "userName"
    | "email"
    | "password"
    | "phoneNumber"
    | "gender"
    | "address";

export type UserDataProps = {
    userName: string;
    email: string;
    password: string;
    phoneNumber: string;
    gender: "male" | "female";
    address: string;
};

export type FormDataProps = UserDataProps & {
    currentPassword: string;
    confirmedPassword: string;
};

interface Props {
    user: User | null;
}

const DetailsSection = ({ user }: Props) => {
    const { setSnackbarMsg, setSnackbarSeverity, setIsSnackbarOpen } =
        useContext(PageVarsContext);

    const [formData, setFormData] = useState<FormDataProps>({
        userName: "",
        email: "",
        phoneNumber: "",
        gender: "male",
        address: "",
        currentPassword: "",
        password: "",
        confirmedPassword: "",
    });

    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = async (field: UserFieldProps) => {
        setIsSnackbarOpen(true);

        if (user && user._id) {
            const res = await changeDetails({
                userId: user._id,
                userOldPass: user.password,
                field,
                formData,
            });

            const resData = await res.json();
            setSnackbarSeverity(res.ok ? "success" : "error");
            setSnackbarMsg(resData.message);
        }
    };

    return (
        <Stack spacing={{ xs: 3 }}>
            <Typography fontSize={{ xs: "2.5rem" }} textAlign="left">
                Change your details
            </Typography>

            <SubFormTemplate
                title="Username:"
                name="userName"
                label="New User Name"
                placeholder="John Doe"
                type="text"
                formData={formData}
                handleInputChange={handleInputChange}
                handleSave={handleSave}
            />

            <SubFormTemplate
                title="Email:"
                name="email"
                label="New Email"
                placeholder="example@email.com"
                type="email"
                formData={formData}
                handleInputChange={handleInputChange}
                handleSave={handleSave}
            />

            <SubFormTemplate
                title="Phone Number:"
                name="phoneNumber"
                label="New Phone Number"
                placeholder="0096278..."
                type="number"
                formData={formData}
                handleInputChange={handleInputChange}
                handleSave={handleSave}
            />

            <SubFormTemplate
                title="Gender:"
                name="gender"
                label="gender"
                placeholder="Male or Female"
                type="select"
                formData={formData}
                handleInputChange={handleInputChange}
                handleSave={handleSave}
            />

            <SubFormTemplate
                title="Address:"
                name="address"
                label="New Address"
                placeholder="Jordan, Amman, ..."
                type="text"
                formData={formData}
                handleInputChange={handleInputChange}
                handleSave={handleSave}
            />

            <SubFormTemplate
                title="Password:"
                name="password"
                label="New Password"
                placeholder="******"
                type="password"
                formData={formData}
                handleInputChange={handleInputChange}
                handleSave={handleSave}
            />
        </Stack>
    );
};

export default DetailsSection;
