import { Outlet } from "react-router-dom"
import HeaderUser from "../HeaderUser";
import FooterUser from "../FooterUser";
const LayoutWebsite = () => {
    return <div>
        <HeaderUser />
        <Outlet />
        <FooterUser />
    </div>;
};

export default LayoutWebsite;
