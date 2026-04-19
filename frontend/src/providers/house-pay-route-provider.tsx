import {createBrowserRouter, Navigate, RouterProvider} from "react-router";
import * as React from "react";
import RootLayout from "@/pages/layout.tsx";
import DirectoryPage from "@/pages/directory/page.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout/>,
        children: [
            {
                index: true,
                element: <Navigate to="/dashboard" replace/>
            },
            {
                path: "dashboard",
                element: <div>Dashboard</div>
            },
            {
                path: "directory",
                element: <DirectoryPage/>
            },
            {
                path: "expenses",
                element: <div>Expenses</div>
            }
        ]
    }
]);

export default function HousePayRouteProvider(): React.ReactElement {
    return <RouterProvider router={router}/>;
}