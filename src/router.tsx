import { createBrowserRouter } from "react-router-dom";
import Main from "./Main";
import Work from "./Work";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "/work",
    element: <Work />,
  },
]);
