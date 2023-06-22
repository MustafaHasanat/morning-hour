import theme from "@/styles/theme";
import { User } from "@/types/user";
import { Avatar, Button, Stack, Typography } from "@mui/material";
import { ChangeEvent, useContext, useState } from "react";
import { changeDetails, deleteUser } from "@/utils/sanity/user";
import { PageVarsContext } from "@/context/pageVars/pageVarsContext";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import SubFormTemplate from "./subFormTemplate";
import CustomDivider from "../shared/customDivider";

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

const PreferencesSection = ({ user }: Props) => {
    const router = useRouter();

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
                Change your preferences
            </Typography>

            <CustomDivider />
        </Stack>
    );
};

export default PreferencesSection;
