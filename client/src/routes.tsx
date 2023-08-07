import { createBrowserRouter } from "react-router-dom";
import LayoutWebsite from "./components/layouts/LayoutWebsite";
import LayoutAdmin from "./components/layouts/LayoutAdmin";
import { Navigate } from "react-router-dom";
import AdminProduct from "./pages/admin/product";
import AdminProductAdd from "./pages/admin/product/add";
import AdminProductEdit from "./pages/admin/product/edit";

export const routers = createBrowserRouter([
    { path: "/", element: <LayoutWebsite /> },
    {
        path: "/admin",
        element: <LayoutAdmin />,
        children: [
            { index: true, element: <Navigate to="dashboard" /> },
            { path: "dashboard", element: <div>Dashboard</div> },
            { path: "product", element: <AdminProduct /> },
            { path: "product/add", element: <AdminProductAdd /> },
            { path: "product/:idProduct/edit", element: <AdminProductEdit /> },
        ],
    },
]);
