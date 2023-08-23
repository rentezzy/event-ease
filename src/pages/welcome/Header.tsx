import { Grid } from "@mui/material";
import { Link as NavLink } from "react-router-dom";
import logo from "../../assets/logo.svg";
import { withSignInButton } from "../../ui/withSignInButton";
const linkStyles = {
  ":visited": {
    color: "black",
    border: "none",
  },
  textDecoration: "none",
  fontSize: "16px",
  color: "black",
  cursor: "pointer",
};

const TryItButton = withSignInButton(() => <p style={linkStyles}>Try it!</p>, {
  to: "/calendar",
});
export const Header = () => {
  return (
    <div>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <NavLink
            to=""
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              ...linkStyles,
            }}
          >
            <img style={{ width: "30px" }} src={logo} alt="" />
          </NavLink>
        </Grid>
        <Grid item>
          <NavLink to="/welcome" style={linkStyles}>
            Home
          </NavLink>
        </Grid>
        <Grid item>
          <NavLink to="/welcome" style={linkStyles}>
            Features
          </NavLink>
        </Grid>
        <Grid item>
          <TryItButton />
        </Grid>
      </Grid>
    </div>
  );
};
