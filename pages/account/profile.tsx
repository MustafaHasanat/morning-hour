import DeleteButton from "@/components/profile/deleteButton";
import DetailsSection from "@/components/profile/detailsSection";
import InfoSection from "@/components/profile/infoSection";
import PreferencesSection from "@/components/profile/preferencesSection";
import { PageVarsContext } from "@/context/pageVars/pageVarsContext";
import useUserData from "@/hooks/useUserData";
import { changeDetails } from "@/utils/sanity/user";
import { Stack } from "@mui/material";
import { ChangeEvent, useContext, useEffect, useState } from "react";

export type UserFieldProps =
    | "userName"
    | "email"
    | "password"
    | "phoneNumber"
    | "gender"
    | "address"
    | "pricingRange";

export type UserDataProps = {
    userName: string;
    email: string;
    password: string;
    phoneNumber: string;
    gender: "male" | "female";
    address: string;
    pricingRange: number[];
};

export type FormDataProps = UserDataProps & {
    currentPassword: string;
    confirmedPassword: string;
};

export default function Profile() {
    const user = useUserData();
    const [updated, setUpdated] = useState(false);
    const { setSnackbarMsg, setSnackbarSeverity, setIsSnackbarOpen } =
        useContext(PageVarsContext);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const initialFormData = {
        userName: `${user?.userName || ""}`,
        email: `${user?.email || ""}`,
        phoneNumber: `${user?.phoneNumber || ""}`,
        gender: user?.gender || "male",
        address: `${user?.address || ""}`,
        pricingRange: [
            user?.pricingRange?.min || 0,
            user?.pricingRange?.max || 100,
        ],
        currentPassword: "",
        password: "",
        confirmedPassword: "",
    };

    const [formData, setFormData] = useState<FormDataProps>(initialFormData);

    useEffect(() => {
        if (user && !updated) {
            setFormData(initialFormData);
            setUpdated(true);
        }
    }, [initialFormData, updated, user]);

    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSliderChange = (
        event: Event,
        newValue: number | number[],
        activeThumb: number
    ) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (activeThumb === 0) {
            setFormData((prev) => {
                return {
                    ...prev,
                    pricingRange: [
                        Math.min(newValue[0], prev.pricingRange[1] - 10),
                        prev.pricingRange[1],
                    ],
                };
            });
        } else {
            setFormData((prev) => {
                return {
                    ...prev,
                    pricingRange: [
                        prev.pricingRange[0],
                        Math.max(newValue[1], prev.pricingRange[0] + 10),
                    ],
                };
            });
        }
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
        <Stack
            direction={{ xs: "column", lg: "row" }}
            spacing={{ xs: 10 }}
            alignItems={{ xs: "center", lg: "start" }}
            py={10}
            px={{ xs: 3, lg: 20 }}
        >
            <InfoSection user={user} />

            <Stack
                width={{ xs: "100%", lg: "70%" }}
                spacing={10}
                alignItems="center"
            >
                <PreferencesSection
                    user={user}
                    formData={formData}
                    handleSliderChange={handleSliderChange}
                    handleSave={handleSave}
                />
                <DetailsSection
                    user={user}
                    formData={formData}
                    handleInputChange={handleInputChange}
                    handleSave={handleSave}
                />
                <DeleteButton user={user} />
            </Stack>
        </Stack>
    );
}
