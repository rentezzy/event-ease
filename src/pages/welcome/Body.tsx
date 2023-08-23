import { Typography } from "@mui/material";
import woman from "../../assets/woman_1.svg";
export const Body = () => {
  return (
    <div style={{ position: "relative", height: "100%" }}>
      <Typography
        variant="h1"
        sx={{
          backgroundImage: `url(${woman})`,
          backgroundPosition: "bottom right",
          backgroundRepeat: "no-repeat",
          backgroundSize: "45%",
          height: "100%",
          display: "flex",
          alignItems: "flex-end",
        }}
      >
        Simplify your
        <br /> events like never before.
      </Typography>
    </div>
  );
};
