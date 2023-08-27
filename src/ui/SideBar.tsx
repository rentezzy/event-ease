import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Avatar,
  Button,
  Divider,
  Grid,
  IconButton,
  Stack,
  SwipeableDrawer,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../hooks/firebase/useAuth";

const navLinkStyles = ({ isActive }: { isActive: boolean }) => ({
  color: isActive ? "#fe7f2d" : "black",
  textDecoration: "none",
  fontSize: "20px",
  cursor: "pointer",
});
export const SideBar = () => {
  const [opened, setOpened] = useState(false);
  const auth = useAuth();
  if (!auth || !auth.user) return null;

  return (
    <div>
      <IconButton
        onClick={() => setOpened(true)}
        sx={{
          position: "fixed",
          top: "10px",
          left: "10px",
        }}
      >
        <MenuIcon color="primary" />
      </IconButton>
      <SwipeableDrawer
        key={"left"}
        onOpen={() => setOpened(true)}
        onClose={() => setOpened(false)}
        open={opened}
      >
        <Stack sx={{ minWidth: "300px", height: "100%", gap: "20px" }}>
          <Grid
            container
            alignItems="center"
            sx={{
              bgcolor: "primary.main",
              padding: "20px",
              gap: "20px",
              borderRadius: "0 0 10px 10px",
            }}
          >
            <Grid item>
              <Avatar src={auth.user.photoURL || undefined} />
            </Grid>
            <Grid item>
              <Typography variant="body1">
                {auth.user.displayName || "Guest"}
              </Typography>
            </Grid>
          </Grid>
          <Stack style={{ height: "100%", padding: "0 20px", gap: "10px" }}>
            <NavLink to={"/calendar"} style={navLinkStyles}>
              Calendar
            </NavLink>
            <Divider />
            <NavLink to={"/my-events"} style={navLinkStyles}>
              My Events
            </NavLink>
            <NavLink to={"/new-event"} style={navLinkStyles}>
              New Event
            </NavLink>
            <NavLink to={"/invitations"} style={navLinkStyles}>
              Invitations
            </NavLink>
            <Divider />
            <NavLink to={"/contacts"} style={navLinkStyles}>
              Contacts
            </NavLink>
            <NavLink to={"/chat"} style={navLinkStyles}>
              Messages
            </NavLink>
          </Stack>
          <Stack>
            <Divider />
            <Button
              startIcon={<LogoutIcon />}
              onClick={() => auth.signout()}
              sx={{ height: "60px" }}
            >
              LogOut
            </Button>
          </Stack>
        </Stack>
      </SwipeableDrawer>
    </div>
  );
};
