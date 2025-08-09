import { createBrowserRouter, type RouteObject } from "react-router-dom";
import Activities from "../pages/Activities";
import Study from "../pages/Studies";

export const routes: RouteObject[] = [
    { path: '/', element: <Study /> },
    { path: 'activities/:studyId', element: <Activities /> }
];

export const router = createBrowserRouter(routes);