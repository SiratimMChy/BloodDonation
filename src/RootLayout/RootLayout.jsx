import { Outlet } from 'react-router';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';
import DemoUserBadge from '../Components/DemoUserBadge/DemoUserBadge';

const RootLayout = () => {
    return (
        <div className="bg-base-100 text-base-content min-h-screen">
            <Navbar />
            <Outlet />
            <Footer />
            <DemoUserBadge />
        </div>
    );
};

export default RootLayout;