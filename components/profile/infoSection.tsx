import { User } from "@/typess/user";
import { Avatar, Stack, Typography } from "@mui/material";

interface Props {
  user: User | null;
}

const InfoSection = ({ user }: Props) => {
  return (
    <Stack alignItems="center" width={{ xs: "100%", md: "30%" }}>
      <Avatar
        src={user?.avatar.asset.url}
        alt={user?.userName}
        variant="rounded"
        sx={{
          width: "100%",
          height: "auto",
        }}
      />

      <Typography fontSize={{ xs: "2rem" }} textAlign="center">
        {user?.userName}
      </Typography>
    </Stack>
  );
};

export default InfoSection;
