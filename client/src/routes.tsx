import { createBrowserRouter } from "react-router-dom";
import LayoutWebsite from "./layouts/LayoutWebsite";
import LayoutAdmin from "./layouts/LayoutAdmin";
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
import IntroductionPage from "./pages/user/IntroductionPage/IntroductionPage";
import MylearningPageLayout from "./pages/user/MyLearningPage/MylearningPage";
import InProgress from "./pages/user/MyLearningPage/ChildrenMyLearning/InProgress/InProgress";
import Collection from "./pages/user/MyLearningPage/ChildrenMyLearning/Collections/Collections";
import Saved from "./pages/user/MyLearningPage/ChildrenMyLearning/Saved/Saved";
import History from "./pages/user/MyLearningPage/ChildrenMyLearning/History/History";
import CourseContentPage from "./pages/user/CourseContentPage/CourseContentPage";
import OverViewPage from "./pages/user/CourseContentPage/ChildrenContentPages/OverviewPage";
import NotePage from "./pages/user/CourseContentPage/ChildrenContentPages/NotePage";
import Defaultpage from "./pages/user/DefaultPage/DefaultPage";
import SigninPage from "./pages/user/SignInPage/SigninPage";
import SignupPage from "./pages/user/SignUpPage/SignupPage";
import BecomeMentor from "./pages/mentor/BecomeMentor/BecomeMentor";
import AdminCategory from "./pages/admin/categories";
import AdminCategoryAdd from "./pages/admin/categories/add";
import ErrorPage from "./pages/404/404page";
import AdminCategoryEdit from "./pages/admin/categories/edit";
import AdminVideo from "./pages/admin/videos";
import AdminVideoAdd from "./pages/admin/videos/add";
import AdminVideoEdit from "./pages/admin/videos/edit";
import { ContactUs } from "./pages/user/SendEmail/sendEmail";
import Certificate from "./pages/user/Certificate/Certificate";
import Dashboard from "./pages/admin/dashboard/dashboard";
import AdminUser from "./pages/admin/users";
import AdminUserAdd from "./pages/admin/users/add";
import AdminUserEdit from "./pages/admin/users/edit";
import AdminRole from "./pages/admin/roles";
import AdminRoleAdd from "./pages/admin/roles/add";
import AdminRoleEdit from "./pages/admin/roles/edit";
import Profile from "./pages/user/ProfilePage/ProfilePage";
import React from 'react';
import Chats from "./pages/user/ChatsPage/ChatsPage";
import Post from "./pages/user/PostPage/PostPage";
import ConfirmEmail from "./pages/user/ConfirmEmail/confirmEmail";
import AdminPostpage from "./pages/admin/postpage";
import AdminPostAdd from "./pages/admin/postpage/add";
import ConfirmLoading from "./pages/user/ConfirmLoading/confirmLoading";
import ListCourse from "./pages/user/ListCourse/ListCourse";
import AdminPayment from "./pages/admin/payment";
import AdminReview from "./pages/admin/reviews";
import ResetPasswordConfirmation from "./pages/user/ConfirmEmail/resetpass";
import Quiz from "./pages/admin/quizmanager/quiz";
import { getCookie } from "./components/Cookie/cookieUtils";
import Uploadtest from "./pages/404/Uploadtest";
import Quizfor from "./pages/user/QuizPage/quiz";
import AdminVideoAddINcourse from "./pages/admin/videos/addincourse";
import CouponManagement from "./pages/admin/coupons/Coupons";
import EmailButton from "./pages/user/IntroductionPage/sendemailtest";

let userRole = 0
const roleCookie = getCookie('role');
if (roleCookie) {
    userRole = parseInt(roleCookie, 10);
}

const withAuthorization = (allowedRoles: number[], WrappedComponent: React.ComponentType) => {
    return class WithAuthorization extends React.Component {
        hasPermission = () => {
            return allowedRoles.includes(userRole);
        };
        render() {
            const isAuthorized = this.hasPermission();
            return isAuthorized ? <WrappedComponent {...this.props} /> : <Navigate to="/signup/404" />;
        }
    };
};

const AdminDashboardWithAuthorization = withAuthorization([1], Dashboard);
const AdminProductWithAuthorization = withAuthorization([1], AdminProduct);
const AdminProductEditWithAuthorization = withAuthorization([1], AdminProductEdit);
const AdminProductAddWithAuthorization = withAuthorization([1], AdminProductAdd);
const AdminCategoryWithAuthorization = withAuthorization([1], AdminCategory);
const AdminCategoryAddWithAuthorization = withAuthorization([1], AdminCategoryAdd);
const AdminCategoryEditWithAuthorization = withAuthorization([1], AdminCategoryEdit);
const AdminVideoWithAuthorization = withAuthorization([1], AdminVideo);
const AdminVideoAddWithAuthorization = withAuthorization([1], AdminVideoAdd);
const AdminVideoEditWithAuthorization = withAuthorization([1], AdminVideoEdit);
const AdminUserWithAuthorization = withAuthorization([1], AdminUser);
const AdminUserAddWithAuthorization = withAuthorization([1], AdminUserAdd);
const AdminUserEditWithAuthorization = withAuthorization([1], AdminUserEdit);
const AdminRoleWithAuthorization = withAuthorization([1], AdminRole);
const AdminRoleAddWithAuthorization = withAuthorization([1], AdminRoleAdd);
const AdminRoleEditWithAuthorization = withAuthorization([1], AdminRoleEdit);

export const routers = createBrowserRouter([

    {
        path: "/",
        element: <LayoutWebsite />,
        children: [
            { index: true, element: <Navigate to="homepage" /> },
            { path: "homepage", element: <Homepage /> },
            { path: "default", element: <Defaultpage /> },
            { path: "contact", element: <ContactUs /> },
            { path: "emailbutton", element: <EmailButton /> },
            { path: "listcourse/:id", element: <ListCourse /> },
            { path: "getcertificate/:id", element: <Certificate /> },
            { path: "learningpath", element: <LearningPathpage /> },
            { path: "introduction/:id", element: <IntroductionPage /> },
            { path: "confirm-email", element: <ResetPasswordConfirmation /> },
            { path: "content/:id", element: <CourseContentPage /> },
            { path: "error", element: <ErrorPage /> },
            { path: "quizfor/:id", element: <Quizfor /> },
            { path: "chats", element: <Chats /> },
            { path: "uploadtest", element: <Uploadtest /> },
            { path: "postpage", element: <Post /> },
            { path: "profile/:id", element: <Profile /> },
            {
                path: "content/:id",
                element: <CourseContentPage />,
                children: [
                    { index: true, element: <Navigate to="overview" /> },
                    { path: "overview", element: <OverViewPage /> },
                    { path: "notepage", element: <NotePage /> },
                ]
            },
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
            {
                path: "/mylearning",
                element: <MylearningPageLayout />,
                children: [
                    { index: true, element: <Navigate to="progress" /> },
                    { path: "progress", element: <InProgress /> },
                    { path: "saved", element: <Saved /> },
                    { path: "collections", element: <Collection /> },
                    { path: "history", element: <History /> }
                ]
            },
        ],
    },
    {
        path: "/",
        children: [
            { index: true, element: <Navigate to="signin" /> },
            { path: "signin", element: <SigninPage /> },
            { path: "", element: <ConfirmEmail /> },
            { path: "confirm-loading", element: <ConfirmLoading /> },
            { path: "signup/404", element: <ErrorPage /> },
            {
                path: "signup",
                element: (
                    localStorage.getItem('isLoggedIn') ? (
                        <Navigate to="404" />
                    ) : (
                        <SignupPage />
                    )
                ),
            },
            { path: "instructors", element: <BecomeMentor /> }
        ],
    },
    {
        path: "/admin",
        element: <LayoutAdmin />,
        children: [
            { index: true, element: <Navigate to="dashboard" /> },
            { path: "dashboard", element: <AdminDashboardWithAuthorization /> },
            { path: "product", element: <AdminProductWithAuthorization /> },
            { path: "product/:idProduct/edit", element: <AdminProductEditWithAuthorization /> },
            { path: "product/add", element: <AdminProductAddWithAuthorization /> },
            { path: "categorys", element: <AdminCategoryWithAuthorization /> },
            { path: "category/add", element: <AdminCategoryAddWithAuthorization /> },
            { path: "category/:idCategory/edit", element: <AdminCategoryEditWithAuthorization /> },
            { path: "videos", element: <AdminVideoWithAuthorization /> },
            { path: "video/add", element: <AdminVideoAddWithAuthorization /> },
            { path: "video/add/:id", element: <AdminVideoAddINcourse /> },
            { path: "video/:idVideo/edit", element: <AdminVideoEditWithAuthorization /> },
            { path: "users", element: <AdminUserWithAuthorization /> },
            { path: "user/add", element: <AdminUserAddWithAuthorization /> },
            { path: "user/:idUser/edit", element: <AdminUserEditWithAuthorization /> },
            { path: "roles", element: <AdminRoleWithAuthorization /> },
            { path: "role/add", element: <AdminRoleAddWithAuthorization /> },
            { path: "role/:idRole/edit", element: <AdminRoleEditWithAuthorization /> },
            { path: "postpage", element: <AdminPostpage /> },
            { path: "post/add", element: <AdminPostAdd /> },
            { path: "payment", element: <AdminPayment /> },
            { path: "coupon", element: <CouponManagement /> },
            { path: "reviews", element: <AdminReview /> },
            { path: "reviews/:id", element: <AdminPostAdd /> },
        ],
    },
    {
        path: "/adminnonelayout",
        children: [
            { path: "quiz/:id", element: <Quiz /> },        
        ],
    },
]);
