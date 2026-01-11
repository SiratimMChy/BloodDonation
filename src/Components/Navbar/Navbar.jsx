import { useContext } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import { Link } from 'react-router';
import { signOut } from 'firebase/auth';
import auth from '../../Firebase/firebase.config';
import { MdBloodtype } from 'react-icons/md';
import { useNavigate } from 'react-router';
import { NavLink } from 'react-router';


const Navbar = () => {
    const { user, role } = useContext(AuthContext);
    const navigate = useNavigate();
    
    const handleSignOut = () => {
        signOut(auth);
        navigate("/signup");
    }
    
    const getDashboardPath = () => {
        if (role === 'admin') {
            return '/dashboard/admindashboard';
        }
        if (role === 'donor') {
            return '/dashboard/donordashboard';
        }
        if (role === 'volunteer') {
            return '/dashboard/volunteerdashboard';
        }
    }
    
    return (
        <div className="navbar bg-white shadow-sm border border-gray-200 h-20 px-4">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> 
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> 
                        </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-white rounded-box z-1 mt-3 w-52 p-2 shadow border border-gray-200">
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                "font-bold text-lg leading-none " +
                                (isActive
                                    ? "bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent"
                                    : "text-gray-900 hover:text-red-500")
                            }
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to="/donation-requests"
                            className={({ isActive }) =>
                                "font-bold text-lg leading-none " +
                                (isActive
                                    ? "bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent"
                                    : "text-gray-900 hover:text-red-500")
                            }
                        >
                            Donation Requests
                        </NavLink>
                        <NavLink
                            to="/center"
                            className={({ isActive }) =>
                                "font-bold text-lg leading-none " +
                                (isActive
                                    ? "bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent"
                                    : "text-gray-900 hover:text-red-500")
                            }
                        >
                            Donation Centers
                        </NavLink>
                        <NavLink
                            to="/about"
                            className={({ isActive }) =>
                                "font-bold text-lg leading-none " +
                                (isActive
                                    ? "bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent"
                                    : "text-gray-900 hover:text-red-500")
                            }
                        >
                            About
                        </NavLink>
                        {user && (
                            <NavLink
                                to="/donate"
                                className={({ isActive }) =>
                                    "font-bold text-lg leading-none " +
                                    (isActive
                                        ? "bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent"
                                        : "text-gray-900 hover:text-red-500")
                                }
                            >
                                Donate Now
                            </NavLink>
                        )}
                    </ul>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-md">
                        <MdBloodtype className="text-white" size={18} />
                    </div>
                    <span className="text-xl md:text-2xl font-extrabold tracking-tight text-gray-900">
                        Hemovia
                    </span>
                </div>
            </div>
            
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 space-x-6">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            "font-bold text-lg leading-none " +
                            (isActive
                                ? "bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent"
                                : "text-gray-900 hover:text-red-500")
                        }
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/donation-requests"
                        className={({ isActive }) =>
                            "font-bold text-lg leading-none " +
                            (isActive
                                ? "bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent"
                                : "text-gray-900 hover:text-red-500")
                        }
                    >
                        Donation Requests
                    </NavLink>
                    <NavLink
                        to="/center"
                        className={({ isActive }) =>
                            "font-bold text-lg leading-none " +
                            (isActive
                                ? "bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent"
                                : "text-gray-900 hover:text-red-500")
                        }
                    >
                        Donation Centers
                    </NavLink>
                    <NavLink
                        to="/about"
                        className={({ isActive }) =>
                            "font-bold text-lg leading-none " +
                            (isActive
                                ? "bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent"
                                : "text-gray-900 hover:text-red-500")
                        }
                    >
                        About
                    </NavLink>
                    {user && (
                        <NavLink
                            to="/donate"
                            className={({ isActive }) =>
                                "font-bold text-lg leading-none " +
                                (isActive
                                    ? "bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent"
                                    : "text-gray-900 hover:text-red-500")
                            }
                        >
                            Donate Now
                        </NavLink>
                    )}
                </ul>
            </div>
            
            <div className="navbar-end flex items-center gap-2">
                {user ? (
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full ring ring-red-500 ring-offset-white ring-offset-2">
                                <img
                                    alt="User Avatar"
                                    src={user?.photoURL || user?.imageUrl || "https://via.placeholder.com/150"}
                                />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-white rounded-box z-1 mt-3 w-52 p-2 shadow-lg border border-gray-200">
                            <li className="menu-title px-4 py-2">
                                <span className="text-xs font-semibold text-gray-900">{user?.displayName || user?.name || 'User'}</span>
                                <span className="text-xs text-gray-500">{user?.email}</span>
                            </li>
                            <div className="divider my-0"></div>
                            <li>
                                <Link to={getDashboardPath()} className="hover:bg-red-50 text-gray-900">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                    </svg>
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <button onClick={handleSignOut} className="hover:bg-red-50 text-red-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                ) : (
                    <Link to="/login" className="btn text-white bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 border-none shadow-lg hover:shadow-xl transition-all duration-300">
                        Login
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Navbar;