import { ThemeProvider } from "@mui/material/styles";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { AuthProvider } from "./services/Auth.tsx";
import { FirebaseProvider } from "./services/Firebase.tsx";
import { router } from "./services/routes.tsx";
import { theme } from "./services/theme.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <FirebaseProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </FirebaseProvider>
    </ThemeProvider>
  </StrictMode>
);
