import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout.jsx";
import PersonsList from "../components/PersonsList.jsx";
import PersonDetail from "../components/PersonDetail.jsx";
import PersonCreate from "../components/PersonCreate.jsx";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",     
        element: <PersonsList />
      },
      {
        path: "persons/create",
        element: <PersonCreate />
      },
      {
        path: "persons/:id",        
        element: <PersonDetail />
      },
    ]
  }
]);
