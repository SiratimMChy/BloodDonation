import { signInWithEmailAndPassword } from 'firebase/auth';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import auth from '../Firebase/firebase.config';
import { AuthContext } from '../Provider/AuthProvider';
import { useLocation } from 'react-router';
import { toast } from 'react-toastify';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaUser, FaUserShield } from 'react-icons/fa';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const Login = () => {
    const { setUser } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const path = location.state ? location.state : '/';
    const [showPassword, setShowPassword] = useState(false);
    const [showDemoModal, setShowDemoModal] = useState(false);
    const [demoUsers, setDemoUsers] = useState([]);
    const [loadingDemo, setLoadingDemo] = useState(false);
    const axiosSecure = useAxiosSecure();

    const handleSubmit = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                setUser(user)
                toast.success('Login successful!');
                navigate(path);
            })
            .catch((error) => {
                console.log(error);
                toast.error(error.message);
            });
    }

    const fetchDemoUsers = async () => {
        setLoadingDemo(true);
        try {
            // Use axiosSecure hook to fetch demo users
            console.log('Fetching demo users using axiosSecure...');
            
            const response = await axiosSecure.get('/demo-users');
            console.log('API Response:', response.data);
            
            const demoUsers = response.data.users || response.data;
            console.log('Demo users:', demoUsers);
            
            if (!demoUsers || demoUsers.length === 0) {
                throw new Error('No demo users found');
            }
            
            setDemoUsers(demoUsers);
        } catch (error) {
            console.error('Error fetching demo users:', error);
            toast.error(`Failed to load demo users: ${error.message}`);
        } finally {
            setLoadingDemo(false);
        }
    };

    const handleDemoButtonClick = () => {
        setShowDemoModal(true);
        fetchDemoUsers();
    };

    const handleDemoLogin = (demoUser) => {
        // Auto-fill the form fields
        const emailInput = document.querySelector('input[name="email"]');
        const passwordInput = document.querySelector('input[name="password"]');
        
        if (emailInput && passwordInput) {
            emailInput.value = demoUser.email;
            
            // Use the correct password based on the user from database
            let password = 'Demo@123'; // Default
            if (demoUser.email === 'donor@hemovia.com') {
                password = 'Donor@123'; // From your database screenshot
            } else if (demoUser.email === 'admin@hemovia.com') {
                password = 'Admin@123'; // Standard admin password
            }
            
            passwordInput.value = password;
            console.log(`Auto-filled credentials: ${demoUser.email} / ${password}`);
        }
        
        setShowDemoModal(false);
    };

    const hanldeforget = (e) => {
        e.preventDefault();
        const emailInput = e.target.form.email.value;
        if (!emailInput) {
            toast.error('Please enter your email first');
            return;
        }
        navigate(`/forgetpassword/${emailInput}`);
    }

    return (
        <div className='min-h-screen bg-base-100 flex items-center justify-center px-4 py-10'>
            <title>Login</title>
            <div className="w-full max-w-lg">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-black text-base-content mb-4 tracking-tight">
                        Welcome <span className="bg-gradient-to-r from-red-500 to-rose-600 bg-clip-text text-transparent">Back</span>
                    </h1>
                    <p className="text-base-content/60 text-base">
                        Sign in to continue your life-saving journey
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="bg-base-200 border-2 border-base-300 rounded-2xl shadow-xl p-6 md:p-8">
                    <fieldset className="space-y-6">
                        {/* Email Field */}
                        <div>
                            <label className="label" htmlFor="email">
                                <span className="label-text text-base-content font-semibold flex items-center gap-2">
                                    <FaEnvelope className="text-base-content/60" /> Email Address
                                </span>
                            </label>
                            <input 
                                id="email"
                                name='email' 
                                type="email" 
                                autoComplete="email"
                                className="input input-bordered w-full bg-base-100 text-base-content border-base-300 focus:border-red-500 focus:outline-none" 
                                placeholder="Enter your email address" 
                                required 
                            />
                        </div>

                        {/* Password Field */}
                        <div>
                            <label className="label" htmlFor="password">
                                <span className="label-text text-base-content font-semibold flex items-center gap-2">
                                    <FaLock className="text-base-content/60" /> Password
                                </span>
                            </label>
                            <div className="relative">
                                <input 
                                    id="password"
                                    name='password' 
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="current-password"
                                    className="input input-bordered w-full bg-base-100 text-base-content border-base-300 focus:border-red-500 focus:outline-none pr-12" 
                                    placeholder="Enter your password" 
                                    required 
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-base-content/60 hover:text-base-content transition-colors"
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>

                        {/* Forgot Password */}
                        <div className="text-right">
                            <button 
                                type="button" 
                                onClick={hanldeforget} 
                                className="text-red-500 hover:text-red-600 text-sm font-medium hover:underline transition-colors"
                            >
                                Forgot password?
                            </button>
                        </div>

                        {/* Login Button */}
                        <button 
                            type="submit" 
                            className="btn w-full bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white font-bold border-0 shadow-lg hover:shadow-xl transition-all duration-200"
                        >
                            Sign In
                        </button>

                        {/* Demo Login Button */}
                        <button 
                            type="button"
                            onClick={handleDemoButtonClick}
                            className="btn w-full bg-base-300 hover:bg-base-200 text-base-content font-semibold border-2 border-base-300 hover:border-red-200 transition-all duration-200"
                        >
                            Try Demo Login
                        </button>
                    </fieldset>

                    {/* Register Link */}
                    <div className="text-center mt-6 pt-6 border-t border-base-300">
                        <p className="text-base-content/60">
                            Don't have an account?{' '}
                            <Link 
                                className='text-red-500 hover:text-red-600 font-semibold hover:underline transition-colors' 
                                to="/Signup"
                            >
                                Create Account
                            </Link>
                        </p>
                    </div>
                </form>
            </div>

            {/* Demo Login Modal */}
            {showDemoModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-base-100/90 backdrop-blur-xl border border-base-300/50 rounded-3xl shadow-2xl w-full max-w-md relative">
                        {/* Glassmorphism effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-3xl"></div>
                        
                        <div className="relative z-10 p-6 sm:p-8">
                            <div className="text-center mb-6">
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-500 to-rose-600 rounded-2xl shadow-lg mb-4">
                                    <FaUser className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-xl sm:text-2xl font-bold text-base-content mb-2">
                                    Choose Demo Login Type
                                </h3>
                                <p className="text-sm sm:text-base text-base-content/70">
                                    Select which type of demo user you want to login as
                                </p>
                            </div>

                            {loadingDemo ? (
                                <div className="text-center py-8">
                                    <div className="loading loading-spinner loading-lg text-red-500"></div>
                                    <p className="text-base-content/70 mt-2">Loading demo users...</p>
                                </div>
                            ) : (
                                <div className="space-y-4 mb-6">
                                    {demoUsers.map((demoUser) => (
                                        <button
                                            key={demoUser._id}
                                            onClick={() => handleDemoLogin(demoUser)}
                                            className={`w-full ${demoUser.role === 'admin' ? 'bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700' : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700'} text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-3`}
                                        >
                                            {demoUser.role === 'admin' ? <FaUserShield className="w-5 h-5" /> : <FaUser className="w-5 h-5" />}
                                            <div className="text-left">
                                                <div className="font-bold">Demo {demoUser.role === 'admin' ? 'Admin' : 'Donor'}</div>
                                                <div className="text-xs opacity-90">{demoUser.email}</div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* Warning Message */}
                            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-900/50 rounded-xl p-4 mb-6">
                                <div className="flex items-start gap-3">
                                    <div className="w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center mt-0.5">
                                        <span className="text-white text-xs font-bold">!</span>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold text-yellow-800 dark:text-yellow-400 mb-1">
                                            Demo User Limitations
                                        </h4>
                                        <p className="text-xs text-yellow-700 dark:text-yellow-300 leading-relaxed">
                                            As a demo user, you can view all features but cannot make any changes or add new data.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Cancel Button */}
                            <button
                                onClick={() => setShowDemoModal(false)}
                                className="w-full bg-base-300 hover:bg-base-400 text-base-content font-semibold py-3 px-6 rounded-xl transition-all duration-200"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;