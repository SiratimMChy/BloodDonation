import { Outlet } from 'react-router';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';

const RootLayout = () => {
    return (
        <div className="bg-white text-gray-900 min-h-screen">
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
};

export default RootLayout;