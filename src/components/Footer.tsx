import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Container, Grid, Stack, Typography } from "@mui/material";

export const Footer = () => {
  return (
    <Container>
      <Stack padding="100px 40px 100px 0" gap="60px">
        <Grid
          container
          width="100%"
          justifyContent="space-between"
          maxWidth="1000px"
        >
          <Grid item>
            <Stack gap="15px">
              <Typography variant="subtitle2" marginBottom="10px">
                Features
              </Typography>
              <Typography variant="subtitle2">Planning</Typography>
              <Typography variant="subtitle2">Invites</Typography>
              <Typography variant="subtitle2">RSVPs</Typography>
            </Stack>
          </Grid>
          <Grid item>
            <Stack gap="15px">
              <Typography variant="subtitle2" marginBottom="10px">
                Resources
              </Typography>
              <Typography variant="subtitle2">Blog</Typography>
              <Typography variant="subtitle2">FAQ</Typography>
              <Typography variant="subtitle2">Contact</Typography>
            </Stack>
          </Grid>
          <Grid item>
            <Stack gap="15px">
              <Typography variant="subtitle2" marginBottom="10px">
                Social
              </Typography>
              <Typography variant="subtitle2">Facebook</Typography>
              <Typography variant="subtitle2">Twitter</Typography>
              <Typography variant="subtitle2">Instagram</Typography>
            </Stack>
          </Grid>
        </Grid>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="subtitle2">
              © 2023 EventEase – All Rights Reserved.
            </Typography>
          </Grid>
          <Grid item>
            <Grid container gap="10px">
              <Grid>
                <InstagramIcon />
              </Grid>
              <Grid>
                <FacebookIcon />
              </Grid>
              <Grid>
                <TwitterIcon />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Stack>
    </Container>
  );
};
