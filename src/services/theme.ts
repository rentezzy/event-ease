import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#fe7f2d",
    },
    secondary: {
      main: "#f50004",
    },
  },
  typography: {
    fontFamily: "Golos Text",
    h1: {
      fontFamily: "Unbounded",
      fontSize: "80px",
      fontWeight: "bold",
      textAlign: "left",
      lineHeight: "1.1em",
    },
    h2: {
      fontFamily: "Unbounded",
      fontSize: "50px",
      fontWeight: "bold",
      textAlign: "left",
      lineHeight: "1.2em",
    },
    h3: {
      fontFamily: "Roboto",
    },
    h4: {
      fontFamily: "Roboto",
    },
    body1: {
      fontFamily: "Golos Text",
      fontSize: "16px",
      lineHeight: "1.3em",
      letterSpacing: "-0.05em",
    },
    body2: {
      fontFamily: "Golos Text",
      fontSize: "32px",
      lineHeight: "1.3em",
      letterSpacing: "-0.05em",
    },
    subtitle1: {
      fontFamily: "Golos Text",
      fontSize: "20px",
      lineHeight: "1.5em",
      letterSpacing: "-0.05em",
      color: "#233D4D",
    },
    subtitle2: {
      fontFamily: "Golos Text",
      fontSize: "14px",
      lineHeight: "1.5em",
      color: "#233D4D",
    },
  },
});
