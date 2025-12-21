import { createBrowserRouter } from "react-router";
import RootLayout from "../RootLayout/RootLayout";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import MainDashboard from "../Dashboard/MainDashboard/MainDashboard";
import DashboardLayout from "../DashboardLayout/DashboardLayout";
import AddRequest from "../Dashboard/AddRequest/AddRequest";
import AllUsers from "../Dashboard/AllUsers/AllUsers";
import PrivateRoute from "./PrivateRoute";
import MyRequest from "../Dashboard/MyRequest/MyRequest";
import AllRequest from "../Dashboard/AllRequest/AllRequest";
import Profile from "../Dashboard/Profile/Profile";
import AdminDashboard from "../Dashboard/AdminDashboard/AdminDashboard";
import DonorDashboard from "../Dashboard/DonorDashboard/DonorDashboard";
import Donate from "../Donate/Donate";
import PaymentSuccess from "../Pages/PaymentSuccess/PaymentSuccess";
import PaymentCancelled from "../Pages/PaymentCancelled/PaymentCancelled";
import DonationRequests from "../Pages/DonationRequests/DonationRequests";
import EditRequest from "../Pages/EditRequest";
import ViewRequest from "../Pages/ViewRequest";
import VolunteerDashboard from "../Dashboard/VolunteerDashboard/VolunteerDashboard";
import Search from "../Pages/search";


const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                path: '/',
                Component: Home
            },
            {
                path: '/login',
                Component: Login
            },
            {
                path: '/Signup',
                Component: Register
            },
            {
                path: '/donate',
                Component: Donate
            },
            {
                path: '/payment-success',
                Component: PaymentSuccess
            },
            {
                path: '/payment-cancelled',
                Component: PaymentCancelled
            },
            {
                path: '/donation-requests',
                Component: DonationRequests
            },
            {
                path: '/search',
                Component: Search
            }

        ]
    },
    {
        path: "/dashboard",
        element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
        children: [
            {
                path: "addRequest",
                element: <AddRequest />
            },
            {
                path: "myRequest",
                element: <MyRequest />
            },
            {
                path: "allRequest",
                element: <AllRequest />
            },
            {
                path: "all-users",
                element: <AllUsers />
            },
            {
                path: "profile",
                element: <Profile />
            },
            {
                path: "admindashboard",
                element: <AdminDashboard />
            },
            {
                path: "volunteerdashboard",
                element:< VolunteerDashboard/>
            },
            {
                path: "donordashboard",
                element: <DonorDashboard />
            },
            {
                path: "edit-request/:id",
                element: <EditRequest />
            },
            {
                path: "view-request/:id",
                element: <ViewRequest />
            }
        ]
    }


]);
export default router;
