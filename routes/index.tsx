import { createBrowserRouter } from "react-router";
import App from "../src/App.tsx";
import HomePage from "../pages/public/home.tsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
            index: true,
            element: <HomePage />
        }
    ]

  }]);
export default router;