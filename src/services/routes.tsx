import { createBrowserRouter } from "react-router-dom";
import { App } from "../App";
import { Calendar } from "../pages/calendar/Calendar";
import { Welcome } from "../pages/welcome/Welcome";
import { Protect } from "../utils/Protect";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "welcome", element: <Welcome /> },
      {
        path: "calendar",
        element: (
          <Protect>
            <Calendar />
          </Protect>
        ),
      },
    ],
  },
]);
