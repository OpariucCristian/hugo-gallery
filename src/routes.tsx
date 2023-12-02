import { RouteObject } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import Gallery from "./pages/gallery/Gallery";

export const ROUTES = {
  DASHBOARD: "/",
  GALLERY: "/gallery",
};

export const routes: RouteObject[] = [
  {
    path: ROUTES.DASHBOARD,
    element: <Dashboard />,
  },
  {
    path: ROUTES.GALLERY,
    element: <Gallery />,
  },
];
