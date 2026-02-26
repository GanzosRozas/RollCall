import { createBrowserRouter } from "react-router";
import App from "../App.tsx";
import HomePage from "@/pages/public/Home.tsx";
import Access from "@/pages/public/Registration.tsx";
import Scanner from "@/pages/private/Scanner.tsx";
import Matriculation from "@/pages/private/Matriculation.tsx";
import CreateSchool from "@/pages/private/FirstSteps/CreateSchool.tsx";
import JoinSchool from "@/pages/private/FirstSteps/JoinSchool.tsx";
import ShowSchoolBelonging from "@/pages/private/FirstSteps/ShowSchoolBelonging.tsx";
import QrGenerator from "@/pages/private/QrGenerator.tsx";
import Calender from "@/pages/private/Calender.tsx";
import Graphs from "@/pages/private/Graphs.tsx";
import Contents from "@/pages/private/Contents.tsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/acceso",
        element: <Access />,
      },
      {
        path: '/crear-escuela',
        element: <CreateSchool />,
      },
      {
        path: '/unirse-escuela',
        element: <JoinSchool />,
      },
      {
        path: '/escuela-perteneciente',
        element: <ShowSchoolBelonging />,
      },
      {
        path: "/scanner",
        element: <Scanner />,
      },
      {
        path: "/matriculation",
        element: <Matriculation />,
      },
      {
        path: "/QRgenerator",
        element: <QrGenerator />,
      },
      {
        path:'/calender',
        element: <Calender />
      },
      {
        path:'/graphs',
        element: <Graphs />
      },
      {
        path:'/contents',
        element: <Contents/>
      }

    ],
  },
]);
export default router;
