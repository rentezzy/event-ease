import { createBrowserRouter } from "react-router-dom";
import { App } from "../App";
import { Calendar } from "../pages/calendar/Calendar";
import { Contacts } from "../pages/contacts/Contacts";
import { Welcome } from "../pages/welcome/Welcome";
import { Protect } from "../utils/Protect";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Welcome />,
    index: true,
  },
  {
    path: "/",
    element: (
      <Protect>
        <App />
      </Protect>
    ),
    children: [
      {
        path: "calendar",
        element: <Calendar />,
      },
      {
        path: "new-event",
        element: <h1></h1>,
      },
      {
        path: "contacts",
        element: <Contacts />,
      },
    ],
  },
]);
