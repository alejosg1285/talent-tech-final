import { createBrowserRouter, type RouteObject } from "react-router-dom";
import Activities from "../pages/Activities";
import Study from "../pages/Studies";
import App from "../App";
import NewStudy from "../pages/NewStudy";
import NewActivity from "../pages/NewActivity";

export const routes:RouteObject[] = [{
    path: '/',
    element: <App />,
    children: [
        { path: '/', element: <Study /> },
        { path: 'activities/:studyId', element: <Activities /> },
        { path: '/study/new', element: <NewStudy /> },
        { path: '/activity/new/:studyId', element: <NewActivity /> },
    ]
}]

export const router = createBrowserRouter(routes);