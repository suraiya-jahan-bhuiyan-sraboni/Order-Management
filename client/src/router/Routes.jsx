import {
    createBrowserRouter,
    Link,
} from "react-router";
import Root from "../root/Root";
import Dashboard from "../pages/Dashboard";
import OrderDetails from "../pages/OrderDetails";
import CreateOrder from "../pages/CreateOrder";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                index: true,
                path: "/",
                element: <Dashboard />
            },
            {
                path:"/create",
                element:<CreateOrder/>
            },
            {
                path: "/order-details/:id",
                element: <OrderDetails />
            }
        ]
    },
    {
        path: "/*",
        element: <div className="text-2xl min-h-screen flex flex-col items-center justify-center p-4 text-center">Page not found! <br />Go back to Dashboard!
            <Link to={"/"} className="text-red-500 underline">click</Link></div>
    }
]);