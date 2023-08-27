import { Avatar, Chip, Grid, Typography } from "@mui/material";
import { memo } from "react";
import { useGetUser } from "../hooks/firestore/useGetUser";

export const UserNameAndAvatar = memo(({ uid }: { uid: string }) => {
  const { user } = useGetUser(uid);
  return (
    <Grid container alignItems="center" gap="20px">
      <Grid item>
        <Avatar src={user.avatar} />
      </Grid>
      <Grid item>
        <UserName uid={uid} />
      </Grid>
    </Grid>
  );
});
export const UserName = memo(({ uid }: { uid: string }) => {
  const { user } = useGetUser(uid);
  return <Typography variant="subtitle2">{user.displayName}</Typography>;
});
export const UserNameAndAvatarChip = memo(({ uid }: { uid: string }) => {
  const { user } = useGetUser(uid);
  return (
    <Chip
      avatar={<Avatar alt="ava" src={user.avatar} />}
      label={user.displayName}
    />
  );
});
