import React, { useContext, useState } from 'react';
import { Home, Users, FileText, LogOut, ChevronLeft, ChevronRight } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router';
import { AuthContext } from '../../Provider/AuthProvider';
import { signOut } from 'firebase/auth';
import auth from '../../Firebase/firebase.config';

const Aside = () => {
  const { role } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLogout = () => {
    signOut(auth);
    navigate('/login');
  }

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
    <aside className={`min-h-screen ${isCollapsed ? 'w-20' : 'w-max-xl'} bg-linear-to-b from-white to-gray-50 border-r border-gray-200 flex flex-col shadow-lg transition-all duration-300 relative`}>
      {/* Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className={`absolute top-1 ${isCollapsed ? 'left-1/2 -translate-x-1/2' : 'right-4'} bg-white border border-gray-200 rounded-full p-1.5 shadow-md hover:bg-red-50 hover:border-red-200 transition-all duration-200 z-10`}
      >
        {isCollapsed ? <ChevronRight size={16} className="text-gray-600" /> : <ChevronLeft size={16} className="text-gray-600" />}
      </button>

      <div className="px-6 pt-8 pb-6 border-b border-gray-200 bg-white">
        <div className={`flex items-center gap-3 mb-2 ${isCollapsed ? 'justify-center' : ''}`}>
          <div className=" mt-1.5 w-8 h-8 lg:w-12 lg:h-12 bg-linear-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center shadow-md shrink-0">
            <span className="text-white font-bold text-xl">🩸</span>
          </div>
          {!isCollapsed && (
            <div>
              <h1 className="text-lg font-bold tracking-tight text-gray-800">
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
                    ? 'bg-linear-to-r from-red-500 to-red-600 text-white shadow-md'
                    : 'text-gray-700 hover:bg-red-50 hover:text-red-600'
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
                    ? 'bg-linear-to-r from-red-500 to-red-600 text-white shadow-md'
                    : 'text-gray-700 hover:bg-red-50 hover:text-red-600'
                  } ${isCollapsed ? 'justify-center' : ''}`
                }
                title={isCollapsed ? 'Profile' : ''}
              >
                <Users className='w-5 h-5' />
                {!isCollapsed && <span className="font-medium text-sm">Profile</span>}
              </NavLink>
              <NavLink
                to="/dashboard/all-users"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive
                    ? 'bg-linear-to-r from-red-500 to-red-600 text-white shadow-md'
                    : 'text-gray-700 hover:bg-red-50 hover:text-red-600'
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
                    ? 'bg-linear-to-r from-red-500 to-red-600 text-white shadow-md'
                    : 'text-gray-700 hover:bg-red-50 hover:text-red-600'
                  } ${isCollapsed ? 'justify-center' : ''}`
                }
                title={isCollapsed ? 'All Requests' : ''}
              >
                <FileText className='w-5 h-5' />
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
                    ? 'bg-linear-to-r from-red-500 to-red-600 text-white shadow-md'
                    : 'text-gray-700 hover:bg-red-50 hover:text-red-600'
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
                    ? 'bg-linear-to-r from-red-500 to-red-600 text-white shadow-md'
                    : 'text-gray-700 hover:bg-red-50 hover:text-red-600'
                  } ${isCollapsed ? 'justify-center' : ''}`
                }
                title={isCollapsed ? 'Profile' : ''}
              >
                <Users className='w-5 h-5' />
                {!isCollapsed && <span className="font-medium text-sm">Profile</span>}
              </NavLink>
              <NavLink
                to="/dashboard/all-users"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive
                    ? 'bg-linear-to-r from-red-500 to-red-600 text-white shadow-md'
                    : 'text-gray-700 hover:bg-red-50 hover:text-red-600'
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
                    ? 'bg-linear-to-r from-red-500 to-red-600 text-white shadow-md'
                    : 'text-gray-700 hover:bg-red-50 hover:text-red-600'
                  } ${isCollapsed ? 'justify-center' : ''}`
                }
                title={isCollapsed ? 'All Requests' : ''}
              >
                <FileText className='w-5 h-5' />
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
                    ? 'bg-linear-to-r from-red-500 to-red-600 text-white shadow-md'
                    : 'text-gray-700 hover:bg-red-50 hover:text-red-600'
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
                    ? 'bg-linear-to-r from-red-500 to-red-600 text-white shadow-md'
                    : 'text-gray-700 hover:bg-red-50 hover:text-red-600'
                  } ${isCollapsed ? 'justify-center' : ''}`
                }
                title={isCollapsed ? 'Profile' : ''}
              >
                <Users className='w-5 h-5' />
                {!isCollapsed && <span className="font-medium text-sm">Profile</span>}
              </NavLink>
              <NavLink
                to="/dashboard/addRequest"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive
                    ? 'bg-linear-to-r from-red-500 to-red-600 text-white shadow-md'
                    : 'text-gray-700 hover:bg-red-50 hover:text-red-600'
                  } ${isCollapsed ? 'justify-center' : ''}`
                }
                title={isCollapsed ? 'Add Requests' : ''}
              >
                <FileText className='w-5 h-5' />
                {!isCollapsed && <span className="font-medium text-sm">Add Requests</span>}
              </NavLink>
              <NavLink
                to="/dashboard/myRequest"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive
                    ? 'bg-linear-to-r from-red-500 to-red-600 text-white shadow-md'
                    : 'text-gray-700 hover:bg-red-50 hover:text-red-600'
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

      {/* Footer / Logout */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <button
          onClick={handleLogout}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-red-600 border border-gray-200 hover:border-red-200 transition-all duration-200 ${isCollapsed ? 'justify-center' : ''}`}
          title={isCollapsed ? 'Logout' : ''}
        >
          <LogOut size={18} />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Aside;