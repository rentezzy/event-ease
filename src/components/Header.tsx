import { Container } from "@mui/material";
import { BreadcrumbsPage } from "../ui/Breadcrumbs";

export const Header = () => {
  return (
    <header style={{ borderBottom: "1px solid #fe7f2d", height: "60px" }}>
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          height: "100%",
        }}
      >
        <BreadcrumbsPage />
      </Container>
    </header>
  );
};
