import { createBrowserRouter, Navigate } from "react-router-dom";
import "../main.css";
import { RootLayout } from "../layouts/RootLayout.jsx";
import { homePageRoute } from "../pages/HomePage.jsx";
import { createPageRoute } from "../pages/CreatePage.jsx";
import { updatePageRoute } from "../pages/UpdatePage.jsx";

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        ...homePageRoute,
      },
      {
        path: "/create",
        ...createPageRoute,
      },
      {
        path: "/update/:id",
        ...updatePageRoute,
      },
      { path: "*", element: <Navigate to="/" /> },
    ],
  },
]);
