import { User } from "@/types/user";
import { Stack, Typography } from "@mui/material";
import { ChangeEvent } from "react";
import SubFormTemplate from "./subFormTemplate";
import { FormDataProps, UserFieldProps } from "@/pages/account/profile";

interface Props {
    user: User | null;
    formData: FormDataProps;
    handleInputChange: (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    handleSave: (field: UserFieldProps) => Promise<void>;
}

const DetailsSection = ({
    user,
    formData,
    handleInputChange,
    handleSave,
}: Props) => {
    return (
        <Stack spacing={{ xs: 3 }} width="100%">
            <Typography fontSize={{ xs: "2.5rem" }} textAlign="left">
                Change your details
            </Typography>

            <SubFormTemplate
                user={user}
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
                user={user}
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
                user={user}
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
                user={user}
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
                user={user}
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
                user={user}
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
