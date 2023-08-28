import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link, { LinkProps } from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { Link as RouterLink, useLocation } from "react-router-dom";
const breadcrumbNameMap: { [key: string]: string } = {
  "/calendar": "Calendar",
  "/new-event": "New Event",
  "/chat": "Messages",
  "/invitations": "Invitations",
  "/contacts": "Сontacts",
  "/my-events": "My events",
};
import logo from "../assets/logo.svg";
interface LinkRouterProps extends LinkProps {
  to: string;
  replace?: boolean;
}

function LinkRouter(props: LinkRouterProps) {
  return <Link {...props} component={RouterLink as React.ElementType} />;
}

export const BreadcrumbsPage = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <Breadcrumbs aria-label="breadcrumb" sx={{ marginLeft: 10 }}>
      <LinkRouter underline="hover" color="inherit" to="/">
        <Typography
          variant="subtitle1"
          sx={{ display: "flex", alignItems: "center" }}
        >
          <img
            style={{ width: "30px", alignSelf: "flex-end" }}
            src={logo}
            alt=""
          />
          Event Ease
        </Typography>
      </LinkRouter>
      {pathnames.map((_value, index) => {
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;

        return last ? (
          <Typography color="primary.main" variant="subtitle1" key={to}>
            {breadcrumbNameMap[to]}
          </Typography>
        ) : (
          <LinkRouter
            underline="hover"
            color="inherit"
            variant="subtitle1"
            to={to}
            key={to}
          >
            {breadcrumbNameMap[to]}
          </LinkRouter>
        );
      })}
    </Breadcrumbs>
  );
};
