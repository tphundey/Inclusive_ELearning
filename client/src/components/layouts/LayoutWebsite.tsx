import { Outlet } from "react-router-dom"
import HeaderUser from "../HeaderUser";

const LayoutWebsite = () => {
    return <div>
        <HeaderUser />
        <Outlet />
    </div>;
};

export default LayoutWebsite;
