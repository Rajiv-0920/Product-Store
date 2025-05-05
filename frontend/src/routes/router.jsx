import { createBrowserRouter, Navigate } from "react-router-dom";
import "../main.css";
import { RootLayout } from "../layouts/RootLayout";
import { homePageRoute } from "../pages/HomePage";
import { createPageRoute } from "../pages/CreatePage";
import { updatePageRoute } from "../pages/UpdatePage";

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
