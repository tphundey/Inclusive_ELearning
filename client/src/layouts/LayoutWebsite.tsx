import { Outlet } from "react-router-dom"
import HeaderUser from "../components/LayoutUser/HeaderUser";
import FooterUser from "../components/LayoutUser/FooterUser";
const LayoutWebsite = () => {
    return <div>
        <HeaderUser />
        <Outlet />
        <FooterUser />
    </div>;
};

export default LayoutWebsite;
