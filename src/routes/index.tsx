import { createBrowserRouter } from "react-router";
import App from "../App.tsx";
import HomePage from "@/pages/public/Home.tsx";
import Access from "@/pages/public/Registration.tsx";
import Scanner from "@/pages/private/Scanner.tsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
            index: true,
            element: <HomePage />

        },
        {
            path: "/acceso",
            element: <Access />
        },
        {
          path: "/scanner",
          element: <Scanner />
        }
    ]

  }]);
export default router;