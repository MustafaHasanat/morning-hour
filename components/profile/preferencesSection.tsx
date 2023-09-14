import { User } from "@/typess/user";
import { Stack, Typography } from "@mui/material";
import { ChangeEvent } from "react";
import { FormDataProps, UserFieldProps } from "@/pages/account/profile";
import SubFormTemplate from "./subFormTemplate";

interface Props {
  user: User | null;
  formData: FormDataProps;
  handleSliderChange: (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => void;
  handleSave: (field: UserFieldProps) => Promise<void>;
}

const PreferencesSection = ({
  user,
  formData,
  handleSliderChange,
  handleSave,
}: Props) => {
  return (
    <Stack spacing={{ xs: 3 }} width="100%">
      <Typography fontSize={{ xs: "2.5rem" }} textAlign="left">
        Change your preferences
      </Typography>

      <SubFormTemplate
        user={user}
        title="Pricing Range:"
        subTitle="we will only show you books within this range"
        name="pricingRange"
        label="Pricing Range"
        placeholder=""
        type="text"
        formData={formData}
        handleInputChange={handleSliderChange}
        handleSave={handleSave}
      />
    </Stack>
  );
};

export default PreferencesSection;
