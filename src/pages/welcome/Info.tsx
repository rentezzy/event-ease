import { Container, Stack, Typography } from "@mui/material";

export const Info = () => {
  return (
    <div
      style={{
        backgroundColor: "#000",
        height: "auto",
        width: "100%",
      }}
    >
      <Container sx={{ padding: "100px 0px" }}>
        <Stack gap="40px">
          <p
            style={{
              fontSize: "16px",
              fontFamily: "Golos Text",
              color: "#A1C181",
            }}
          >
            Welcome to
          </p>
          <Typography variant="h2" color="#FFF">
            EventEase – plan,
            <br /> invite, impress!
          </Typography>
        </Stack>
      </Container>
    </div>
  );
};
