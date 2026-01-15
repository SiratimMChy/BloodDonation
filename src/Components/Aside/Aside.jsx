import { useContext, useState, useEffect } from 'react';
import { 
  Home, 
  Users, 
  FileText, 
  ChevronLeft, 
  ChevronRight,
  User,
  Plus,
  Heart,
  Activity,
  Sun,
  Moon
} from 'lucide-react';
import { NavLink, useNavigate } from 'react-router';
import { AuthContext } from '../../Provider/AuthProvider';
import { MdBloodtype } from 'react-icons/md';
import { VscRequestChanges } from 'react-icons/vsc';

const Aside = () => {
  const { role } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  // Theme state management
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark";
  });

  const handleThemeToggle = () => {
    setIsDark(prev => {
      const newState = !prev;
      const theme = newState ? "dark" : "light";
      localStorage.setItem("theme", theme);
      document.documentElement.setAttribute("data-theme", theme);
      
      // Dispatch custom event for other components to listen
      window.dispatchEvent(new CustomEvent('themeChange', { 
        detail: { theme } 
      }));
      
      return newState;
    });
  };

  // Listen for theme changes from other components
  useEffect(() => {
    // Set initial theme
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
    
    const handleThemeChange = (e) => {
      setIsDark(e.detail.theme === 'dark');
    };

    const handleStorageChange = (e) => {
      if (e.key === 'theme') {
        setIsDark(e.newValue === 'dark');
        document.documentElement.setAttribute("data-theme", e.newValue);
      }
    };

    window.addEventListener('themeChange', handleThemeChange);
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('themeChange', handleThemeChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const getDashboardTitle = () => {
    switch (role) {
      case 'admin':
        return 'Admin Dashboard';
      case 'donor':
        return 'Donor Dashboard';
      case 'volunteer':
        return 'Volunteer Dashboard';
      default:
        return 'Dashboard';
    }
  }

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-2 sm:gap-3 px-2 sm:px-4 py-3 rounded-xl transition-all duration-200 ${isActive
      ? 'bg-red-500 hover:bg-red-600 text-white shadow-md'
      : 'text-base-content hover:bg-red-50 dark:hover:bg-base-300 hover:text-red-600'
    } ${isCollapsed ? 'justify-center' : ''}`;

  return (
    <aside className={`min-h-screen ${isCollapsed ? 'w-16 sm:w-20' : 'w-48 sm:w-56 md:w-64 lg:w-72'} bg-base-200 border-r-2 border-base-300 flex flex-col shadow-lg transition-all duration-300 relative`}>
      {/* Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className={`absolute top-1 ${isCollapsed ? 'left-1/2 -translate-x-1/2' : 'right-4'} bg-base-100 border-2 border-base-300 rounded-full p-1.5 shadow-md hover:bg-red-50 dark:hover:bg-base-300 hover:border-red-200 transition-all duration-200 z-10`}
      >
        {isCollapsed ? <ChevronRight size={16} className="text-base-content/60" /> : <ChevronLeft size={16} className="text-base-content/60" />}
      </button>

      <div className="px-3 sm:px-6 pt-8 pb-6 border-b-2 border-base-300 bg-base-100">
        <div className={`flex items-center gap-2 sm:gap-3 mb-2 ${isCollapsed ? 'justify-center' : ''}`}>
          <div className="mt-1.5 w-6 h-6 sm:w-8 sm:h-8 lg:w-12 lg:h-12 bg-red-500 rounded-lg flex items-center justify-center shadow-md shrink-0">
            <MdBloodtype className="text-white" size={14} />
          </div>
          {!isCollapsed && (
            <div>
              <h1 className="text-sm sm:text-lg font-bold tracking-tight text-base-content">
                {getDashboardTitle()}
              </h1>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-1.5 px-2 sm:px-4 py-6">

        {
          role === 'admin' && (
            <>
              <NavLink
                to="/dashboard/admindashboard"
                className={navLinkClass}
                title={isCollapsed ? 'Dashboard' : ''}
              >
                <Activity className='w-4 h-4 sm:w-5 sm:h-5' />
                {!isCollapsed && <span className="font-medium text-xs sm:text-sm">Dashboard</span>}
              </NavLink>
              <NavLink
                to="/dashboard/profile"
                className={navLinkClass}
                title={isCollapsed ? 'Profile' : ''}
              >
                <User className='w-4 h-4 sm:w-5 sm:h-5' />
                {!isCollapsed && <span className="font-medium text-xs sm:text-sm">Profile</span>}
              </NavLink>
              <NavLink
                to="/dashboard/all-users"
                className={navLinkClass}
                title={isCollapsed ? 'All Users' : ''}
              >
                <Users className='w-4 h-4 sm:w-5 sm:h-5' />
                {!isCollapsed && <span className="font-medium text-xs sm:text-sm">All Users</span>}
              </NavLink>
              <NavLink
                to="/dashboard/allRequest"
                className={navLinkClass}
                title={isCollapsed ? 'All Requests' : ''}
              >
                <VscRequestChanges className='w-4 h-4 sm:w-5 sm:h-5' />
                {!isCollapsed && <span className="font-medium text-xs sm:text-sm">All Requests</span>}
              </NavLink>
            </>
          )}

        {
          role === 'volunteer' && (
            <>
              <NavLink
                to="/dashboard/volunteerdashboard"
                className={navLinkClass}
                title={isCollapsed ? 'Dashboard' : ''}
              >
                <Heart className='w-4 h-4 sm:w-5 sm:h-5' />
                {!isCollapsed && <span className="font-medium text-xs sm:text-sm">Dashboard</span>}
              </NavLink>
              <NavLink
                to="/dashboard/profile"
                className={navLinkClass}
                title={isCollapsed ? 'Profile' : ''}
              >
                <User className='w-4 h-4 sm:w-5 sm:h-5' />
                {!isCollapsed && <span className="font-medium text-xs sm:text-sm">Profile</span>}
              </NavLink>
              <NavLink
                to="/dashboard/all-users"
                className={navLinkClass}
                title={isCollapsed ? 'All Users' : ''}
              >
                <Users className='w-4 h-4 sm:w-5 sm:h-5' />
                {!isCollapsed && <span className="font-medium text-xs sm:text-sm">All Users</span>}
              </NavLink>
              <NavLink
                to="/dashboard/allRequest"
                className={navLinkClass}
                title={isCollapsed ? 'All Requests' : ''}
              >
                <VscRequestChanges className='w-4 h-4 sm:w-5 sm:h-5' />
                {!isCollapsed && <span className="font-medium text-xs sm:text-sm">All Requests</span>}
              </NavLink>
            </>
          )}

        {
          role === 'donor' && (
            <>
              <NavLink
                to="/dashboard/donordashboard"
                className={navLinkClass}
                title={isCollapsed ? 'Dashboard' : ''}
              >
                <Home className='w-4 h-4 sm:w-5 sm:h-5' />
                {!isCollapsed && <span className="font-medium text-xs sm:text-sm">Dashboard</span>}
              </NavLink>
              <NavLink
                to="/dashboard/profile"
                className={navLinkClass}
                title={isCollapsed ? 'Profile' : ''}
              >
                <User className='w-4 h-4 sm:w-5 sm:h-5' />
                {!isCollapsed && <span className="font-medium text-xs sm:text-sm">Profile</span>}
              </NavLink>
              <NavLink
                to="/dashboard/addRequest"
                className={navLinkClass}
                title={isCollapsed ? 'Add Requests' : ''}
              >
                <Plus className='w-4 h-4 sm:w-5 sm:h-5' />
                {!isCollapsed && <span className="font-medium text-xs sm:text-sm">Add Requests</span>}
              </NavLink>
              <NavLink
                to="/dashboard/myRequest"
                className={navLinkClass}
                title={isCollapsed ? 'My Requests' : ''}
              >
                <FileText className='w-4 h-4 sm:w-5 sm:h-5' />
                {!isCollapsed && <span className="font-medium text-xs sm:text-sm">My Requests</span>}
              </NavLink>
            </>
          )
        }

      </nav>

      {/* Footer / Theme Toggle & Home */}
      <div className="p-2 sm:p-4 border-t-2 border-base-300 bg-base-100 space-y-2">
        {/* Theme Toggle */}
        <button
          onClick={handleThemeToggle}
          className={`w-full flex items-center gap-2 sm:gap-3 px-2 sm:px-4 py-3 rounded-xl text-xs sm:text-sm font-medium text-base-content hover:bg-base-200 hover:text-red-600 border-2 border-base-300 hover:border-red-200 transition-all duration-200 ${isCollapsed ? 'justify-center' : ''}`}
          title={isCollapsed ? (isDark ? 'Switch to Light' : 'Switch to Dark') : ''}
        >
          {isDark ? <Sun size={16} className="sm:w-[18px] sm:h-[18px]" /> : <Moon size={16} className="sm:w-[18px] sm:h-[18px]" />}
          {!isCollapsed && <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>}
        </button>
        
        {/* Home Button */}
        <button
          onClick={() => navigate('/')}
          className={`w-full flex items-center gap-2 sm:gap-3 px-2 sm:px-4 py-3 rounded-xl text-xs sm:text-sm font-medium text-base-content hover:bg-red-50 dark:hover:bg-base-300 hover:text-red-600 border-2 border-base-300 hover:border-red-200 transition-all duration-200 ${isCollapsed ? 'justify-center' : ''}`}
          title={isCollapsed ? 'Go to Home' : ''}
        >
          <Home size={16} className="sm:w-[18px] sm:h-[18px]" />
          {!isCollapsed && <span>Go to Home</span>}
        </button>
      </div>
    </aside>
  );
};

export default Aside;