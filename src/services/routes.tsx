import { createBrowserRouter } from "react-router-dom";
import { App } from "../App";
import { Welcome } from "../pages/welcome/Welcome";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [{ path: "welcome", element: <Welcome /> }],
  },
]);
