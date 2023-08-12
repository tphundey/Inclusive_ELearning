import { createBrowserRouter } from "react-router-dom";
import LayoutWebsite from "./components/layouts/LayoutWebsite";
import LayoutAdmin from "./components/layouts/LayoutAdmin";
import { Navigate } from "react-router-dom";
import AdminProduct from "./pages/admin/product";
import AdminProductAdd from "./pages/admin/product/add";
import AdminProductEdit from "./pages/admin/product/edit";
import Homepage from "./pages/user/HomePage/Homepage";
import Browsepage from "./pages/user/BrowsePage/BrowsePage";
import Businesspage from "./pages/user/BrowsePage/ChildrenBrowsePages/BusinessPage";
import Creativepage from "./pages/user/BrowsePage/ChildrenBrowsePages/Certifications";
import Technologypage from "./pages/user/BrowsePage/ChildrenBrowsePages/Technology";
import Certificationpage from "./pages/user/BrowsePage/ChildrenBrowsePages/CreativePage";
import LearningPathpage from "./pages/user/LearningPathsPages/LearningPathPages";
export const routers = createBrowserRouter([
    {
        path: "/",
        element: <LayoutWebsite />,
        children: [
            { index: true, element: <Navigate to="homepage" /> },
            { path: "homepage", element: <Homepage /> },
            { path: "learningpath", element: <LearningPathpage /> },
            {
                path: "/browsepage",
                element: <Browsepage />,
                children: [
                    { index: true, element: <Navigate to="business" /> },
                    { path: "business", element: <Businesspage /> },
                    { path: "creative", element: <Creativepage /> },
                    { path: "technology", element: <Technologypage /> },
                    { path: "certifications", element: <Certificationpage /> }
                ]
            },
        ],
    },
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
