import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Hem } from "./pages/Hem";
import { Djuren } from "./pages/Djuren";
import { DjurInformation } from "./pages/DjurInformation";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [

            {
                path: "/",
                element: <Hem />,
            },
            {
                path: "/djuren",
                element: <Djuren />,
            },
            {
                path: "/djuren/:id",
                element: <DjurInformation />,
            },
        ],
        errorElement: <NotFound />
    }
])