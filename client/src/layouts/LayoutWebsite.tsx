import { Outlet } from "react-router-dom"
import HeaderUser from "../components/HeaderUser";
import FooterUser from "../components/FooterUser";
const LayoutWebsite = () => {
    return <div>
        <HeaderUser />
        <Outlet />
        <FooterUser />
    </div>;
};

export default LayoutWebsite;
