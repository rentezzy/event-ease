import { Container, Stack } from "@mui/material";

import { AboutUs } from "./AboutUs";
import { Body } from "./Body";
import { Header } from "./Header";
import { Info } from "./Info";

import { Footer } from "../../components/Footer";

export const Welcome = () => {
  return (
    <div>
      <div
        style={{
          backgroundColor: "#FE7F2D",
          height: "800px",
          width: "100%",
        }}
      >
        <Container sx={{ padding: "100px 0px", height: "100%" }}>
          <Stack justifyContent="space-between" height="100%">
            <Header />
            <Body />
          </Stack>
        </Container>
      </div>
      <Info />
      <AboutUs />
      <hr
        style={{
          height: "1px",
          border: "none",
          backgroundColor: "#F2F2F2",
          margin: "0",
        }}
      />
      <Footer />
    </div>
  );
};
