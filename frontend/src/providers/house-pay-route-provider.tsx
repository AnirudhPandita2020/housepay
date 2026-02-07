import {createBrowserRouter, RouterProvider} from "react-router";
import * as React from "react";

const router = createBrowserRouter([]);

export default function HousePayRouteProvider(): React.ReactElement {
    return <RouterProvider router={router}/>;
}