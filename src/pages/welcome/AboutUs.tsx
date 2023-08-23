import { Button, Container, Grid, Stack, Typography } from "@mui/material";
import woman_2 from "../../assets/woman_2.svg";
import woman_3 from "../../assets/woman_3.svg";
import woman_4 from "../../assets/woman_4.svg";
import woman_5 from "../../assets/woman_5.svg";

import { withSignInButton } from "../../ui/withSignInButton";

const StartPlanningButton = withSignInButton(
  () => (
    <Button variant="contained" size="large" sx={{ borderRadius: "0" }}>
      Start Planning
    </Button>
  ),
  { to: "/calendar" }
);
const ArrowButton = withSignInButton(
  () => (
    <Typography variant="body1" marginRight="20px">
      &#62;
    </Typography>
  ),
  { to: "/calendar" }
);

export const AboutUs = () => {
  return (
    <Container sx={{ padding: "100px 0px" }}>
      <Grid container gap="40px" marginBottom="100px">
        <Grid item width="400px">
          <img src={woman_2} style={{ width: "80%" }} alt="" />
        </Grid>
        <Grid item xs>
          <Typography variant="h2" marginBottom="40px">
            Simplifying Event Planning
          </Typography>
          <Typography variant="body2">
            EventEase is your one-stop web application for organizing stunning
            events and sending captivating digital invitations. Be it a birthday
            bash, a lovely wedding, a game-changing conference, or a chill
            hangout, we’ve got your back - streamlining your journey from the
            moment you create your event to managing RSVPs and keeping your
            guests updated.
          </Typography>
        </Grid>
      </Grid>
      <Stack margin="100px 0px" gap="20px">
        <Grid
          container
          alignItems="center"
          bgcolor="#F2F2F2"
          padding="20px"
          borderRadius="20px"
          gap="40px"
        >
          <Grid
            item
            width="100px"
            height="100px"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <img src={woman_3} height="100%" alt="" />
          </Grid>
          <Grid item xs>
            <Typography variant="subtitle1">1000+</Typography>
            <Typography variant="subtitle2">Events Planned</Typography>
          </Grid>
          <Grid item>
            <ArrowButton />
          </Grid>
        </Grid>
        <Grid
          container
          alignItems="center"
          bgcolor="#F2F2F2"
          padding="20px"
          borderRadius="20px"
          gap="40px"
        >
          <Grid
            item
            width="100px"
            height="100px"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <img src={woman_4} height="100%" alt="" />
          </Grid>
          <Grid item xs>
            <Typography variant="subtitle1">99.9%</Typography>
            <Typography variant="subtitle2">Satisfied Users</Typography>
          </Grid>
          <Grid item>
            <ArrowButton />
          </Grid>
        </Grid>
        <Grid
          container
          alignItems="center"
          bgcolor="#F2F2F2"
          padding="20px"
          borderRadius="20px"
          gap="40px"
        >
          <Grid
            item
            width="100px"
            height="100px"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <img src={woman_5} height="100%" alt="" />
          </Grid>
          <Grid item xs>
            <Typography variant="subtitle1">5000+</Typography>
            <Typography variant="subtitle2">Invitations Sent</Typography>
          </Grid>
          <Grid item>
            <ArrowButton />
          </Grid>
        </Grid>
      </Stack>
      <Stack marginTop="100px">
        <Typography variant="h2" maxWidth="800px" marginBottom="60px">
          Join the party, and let the magic unfold! Sign up for EventEase now!
        </Typography>
        <Grid container gap="20px">
          <StartPlanningButton />
          <Button
            color="secondary"
            variant="contained"
            sx={{ borderRadius: "0" }}
          >
            Learn More
          </Button>
        </Grid>
      </Stack>
    </Container>
  );
};
