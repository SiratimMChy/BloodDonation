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


  return (
    <aside className={`min-h-screen ${isCollapsed ? 'w-20' : 'w-max-xl'} bg-base-200 border-r-2 border-base-300 flex flex-col shadow-lg transition-all duration-300 relative`}>
      {/* Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className={`absolute top-1 ${isCollapsed ? 'left-1/2 -translate-x-1/2' : 'right-4'} bg-base-100 border-2 border-base-300 rounded-full p-1.5 shadow-md hover:bg-red-50 dark:hover:bg-base-300 hover:border-red-200 transition-all duration-200 z-10`}
      >
        {isCollapsed ? <ChevronRight size={16} className="text-base-content/60" /> : <ChevronLeft size={16} className="text-base-content/60" />}
      </button>

      <div className="px-6 pt-8 pb-6 border-b-2 border-base-300 bg-base-100">
        <div className={`flex items-center gap-3 mb-2 ${isCollapsed ? 'justify-center' : ''}`}>
          <div className="mt-1.5 w-8 h-8 lg:w-12 lg:h-12 bg-red-500 rounded-lg flex items-center justify-center shadow-md shrink-0">
            <MdBloodtype className="text-white" size={18} />
          </div>
          {!isCollapsed && (
            <div>
              <h1 className="text-lg font-bold tracking-tight text-base-content">
                {getDashboardTitle()}
              </h1>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-1.5 px-4 py-6">

        {
          role === 'admin' && (
            <>
              <NavLink
                to="/dashboard/admindashboard"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive
                    ? 'bg-red-500 hover:bg-red-600 text-white shadow-md'
                    : 'text-base-content hover:bg-red-50 dark:hover:bg-base-300 hover:text-red-600'
                  } ${isCollapsed ? 'justify-center' : ''}`
                }
                title={isCollapsed ? 'Dashboard' : ''}
              >
                <Activity className='w-5 h-5' />
                {!isCollapsed && <span className="font-medium text-sm">Dashboard</span>}
              </NavLink>
              <NavLink
                to="/dashboard/profile"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive
                    ? 'bg-red-500 hover:bg-red-600 text-white shadow-md'
                    : 'text-base-content hover:bg-red-50 dark:hover:bg-base-300 hover:text-red-600'
                  } ${isCollapsed ? 'justify-center' : ''}`
                }
                title={isCollapsed ? 'Profile' : ''}
              >
                <User className='w-5 h-5' />
                {!isCollapsed && <span className="font-medium text-sm">Profile</span>}
              </NavLink>
              <NavLink
                to="/dashboard/all-users"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive
                    ? 'bg-red-500 hover:bg-red-600 text-white shadow-md'
                    : 'text-base-content hover:bg-red-50 dark:hover:bg-base-300 hover:text-red-600'
                  } ${isCollapsed ? 'justify-center' : ''}`
                }
                title={isCollapsed ? 'All Users' : ''}
              >
                <Users className='w-5 h-5' />
                {!isCollapsed && <span className="font-medium text-sm">All Users</span>}
              </NavLink>

              <NavLink
                to="/dashboard/allRequest"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive
                    ? 'bg-red-500 hover:bg-red-600 text-white shadow-md'
                    : 'text-base-content hover:bg-red-50 dark:hover:bg-base-300 hover:text-red-600'
                  } ${isCollapsed ? 'justify-center' : ''}`
                }
                title={isCollapsed ? 'All Requests' : ''}
              >
                <VscRequestChanges className='w-5 h-5' />
                {!isCollapsed && <span className="font-medium text-sm">All Requests</span>}
              </NavLink>
            </>

          )}
              {
          role === 'volunteer' && (
            <>
              <NavLink
                to="/dashboard/volunteerdashboard"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive
                    ? 'bg-red-500 hover:bg-red-600 text-white shadow-md'
                    : 'text-base-content hover:bg-red-50 dark:hover:bg-base-300 hover:text-red-600'
                  } ${isCollapsed ? 'justify-center' : ''}`
                }
                title={isCollapsed ? 'Dashboard' : ''}
              >
                <Heart className='w-5 h-5' />
                {!isCollapsed && <span className="font-medium text-sm">Dashboard</span>}
              </NavLink>
              <NavLink
                to="/dashboard/profile"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive
                    ? 'bg-red-500 hover:bg-red-600 text-white shadow-md'
                    : 'text-base-content hover:bg-red-50 dark:hover:bg-base-300 hover:text-red-600'
                  } ${isCollapsed ? 'justify-center' : ''}`
                }
                title={isCollapsed ? 'Profile' : ''}
              >
                <User className='w-5 h-5' />
                {!isCollapsed && <span className="font-medium text-sm">Profile</span>}
              </NavLink>
              <NavLink
                to="/dashboard/all-users"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive
                    ? 'bg-red-500 hover:bg-red-600 text-white shadow-md'
                    : 'text-base-content hover:bg-red-50 dark:hover:bg-base-300 hover:text-red-600'
                  } ${isCollapsed ? 'justify-center' : ''}`
                }
                title={isCollapsed ? 'All Users' : ''}
              >
                <Users className='w-5 h-5' />
                {!isCollapsed && <span className="font-medium text-sm">All Users</span>}
              </NavLink>

              <NavLink
                to="/dashboard/allRequest"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive
                    ? 'bg-red-500 hover:bg-red-600 text-white shadow-md'
                    : 'text-base-content hover:bg-red-50 dark:hover:bg-base-300 hover:text-red-600'
                  } ${isCollapsed ? 'justify-center' : ''}`
                }
                title={isCollapsed ? 'All Requests' : ''}
              >
                <VscRequestChanges className='w-5 h-5' />
                {!isCollapsed && <span className="font-medium text-sm">All Requests</span>}
              </NavLink>
            </>

          )}

        {
          role === 'donor' && (
            <>
              <NavLink
                to="/dashboard/donordashboard"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive
                    ? 'bg-red-500 hover:bg-red-600 text-white shadow-md'
                    : 'text-base-content hover:bg-red-50 dark:hover:bg-base-300 hover:text-red-600'
                  } ${isCollapsed ? 'justify-center' : ''}`
                }
                title={isCollapsed ? 'Dashboard' : ''}
              >
                <Home className='w-5 h-5' />
                {!isCollapsed && <span className="font-medium text-sm">Dashboard</span>}
              </NavLink>
              <NavLink
                to="/dashboard/profile"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive
                    ? 'bg-red-500 hover:bg-red-600 text-white shadow-md'
                    : 'text-base-content hover:bg-red-50 dark:hover:bg-base-300 hover:text-red-600'
                  } ${isCollapsed ? 'justify-center' : ''}`
                }
                title={isCollapsed ? 'Profile' : ''}
              >
                <User className='w-5 h-5' />
                {!isCollapsed && <span className="font-medium text-sm">Profile</span>}
              </NavLink>
              <NavLink
                to="/dashboard/addRequest"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive
                    ? 'bg-red-500 hover:bg-red-600 text-white shadow-md'
                    : 'text-base-content hover:bg-red-50 dark:hover:bg-base-300 hover:text-red-600'
                  } ${isCollapsed ? 'justify-center' : ''}`
                }
                title={isCollapsed ? 'Add Requests' : ''}
              >
                <Plus className='w-5 h-5' />
                {!isCollapsed && <span className="font-medium text-sm">Add Requests</span>}
              </NavLink>
              <NavLink
                to="/dashboard/myRequest"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive
                    ? 'bg-red-500 hover:bg-red-600 text-white shadow-md'
                    : 'text-base-content hover:bg-red-50 dark:hover:bg-base-300 hover:text-red-600'
                  } ${isCollapsed ? 'justify-center' : ''}`
                }
                title={isCollapsed ? 'My Requests' : ''}
              >
                <FileText className='w-5 h-5' />
                {!isCollapsed && <span className="font-medium text-sm">My Requests</span>}
              </NavLink>
            </>
          )
        }

      </nav>

      {/* Footer / Theme Toggle & Home */}
      <div className="p-4 border-t-2 border-base-300 bg-base-100 space-y-2">
        {/* Theme Toggle */}
        <button
          onClick={handleThemeToggle}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-base-content hover:bg-base-200 hover:text-red-600 border-2 border-base-300 hover:border-red-200 transition-all duration-200 ${isCollapsed ? 'justify-center' : ''}`}
          title={isCollapsed ? (isDark ? 'Switch to Light' : 'Switch to Dark') : ''}
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
          {!isCollapsed && <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>}
        </button>
        
        {/* Home Button */}
        <button
          onClick={() => navigate('/')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-base-content hover:bg-red-50 dark:hover:bg-base-300 hover:text-red-600 border-2 border-base-300 hover:border-red-200 transition-all duration-200 ${isCollapsed ? 'justify-center' : ''}`}
          title={isCollapsed ? 'Go to Home' : ''}
        >
          <Home size={18} />
          {!isCollapsed && <span>Go to Home</span>}
        </button>
      </div>
    </aside>
  );
};

export default Aside;