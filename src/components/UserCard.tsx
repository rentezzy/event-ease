import ClearIcon from "@mui/icons-material/Clear";
import { Avatar, Grid, IconButton, Typography } from "@mui/material";
import { memo } from "react";
import { useGetUser } from "../hooks/firestore/useGetUser";
import { useMeHelpers } from "../hooks/firestore/useMe";

export const UserCard = memo(
  ({ uid, isEditing }: { uid: string; isEditing: boolean }) => {
    const { user } = useGetUser(uid);
    const { removeContact } = useMeHelpers();
    return (
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item xs>
          <Grid container alignItems="center" gap="10px">
            <Grid item>
              <Avatar src={user.avatar}></Avatar>
            </Grid>
            <Grid>
              <Typography variant="subtitle2" fontSize="16px">
                {user.displayName}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        {isEditing && (
          <Grid item>
            <IconButton onClick={() => removeContact(uid, "friends")}>
              <ClearIcon />
            </IconButton>
          </Grid>
        )}
      </Grid>
    );
  }
);
