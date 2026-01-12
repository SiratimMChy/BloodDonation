import { useEffect } from 'react';
import { Outlet } from 'react-router';
import Aside from '../Components/Aside/Aside';
import DemoUserBadge from '../Components/DemoUserBadge/DemoUserBadge';

const DashboardLayout = () => {
    // Initialize theme on component mount and listen for changes
    useEffect(() => {
        // Set initial theme from localStorage
        const savedTheme = localStorage.getItem("theme") || "light";
        document.documentElement.setAttribute("data-theme", savedTheme);

        // Listen for theme changes in localStorage (from other components)
        const handleStorageChange = (e) => {
            if (e.key === 'theme') {
                document.documentElement.setAttribute("data-theme", e.newValue);
            }
        };

        // Listen for custom theme change events
        const handleThemeChange = (e) => {
            document.documentElement.setAttribute("data-theme", e.detail.theme);
        };

        window.addEventListener('storage', handleStorageChange);
        window.addEventListener('themeChange', handleThemeChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('themeChange', handleThemeChange);
        };
    }, []);

    return (
        <div className='min-h-screen flex bg-base-100 overflow-hidden'>
            <Aside />
           <div className='flex-1 p-5 bg-base-100'>
             <Outlet />
           </div>
           <DemoUserBadge />
        </div>
    );
};

export default DashboardLayout;