import { signInWithEmailAndPassword } from 'firebase/auth';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import auth from '../Firebase/firebase.config';
import { AuthContext } from '../Provider/AuthProvider';
import { useLocation } from 'react-router';
import { toast } from 'react-toastify';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaUser, FaUserShield } from 'react-icons/fa';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { Card, Button, Input } from '../Components/UI';
import { COLORS, SPACING, BORDER_RADIUS, TYPOGRAPHY, LAYOUT } from '../styles/designSystem';

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
                    <h1 className={`${TYPOGRAPHY.heading.h1} ${SPACING.marginMd} tracking-tight`}>
                        Welcome <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">Back</span>
                    </h1>
                    <p className={TYPOGRAPHY.body.large}>
                        Sign in to continue your life-saving journey
                    </p>
                </div>

                <Card variant="elevated">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <fieldset className="space-y-6">
                            {/* Email Field */}
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                label="Email Address"
                                placeholder="Enter your email address"
                                icon={FaEnvelope}
                                autoComplete="email"
                                required
                            />

                            {/* Password Field */}
                            <div>
                                <label className="block text-sm font-semibold text-base-content mb-2">
                                    <FaLock className="inline mr-2 text-base-content/60" /> Password
                                </label>
                                <div className="relative">
                                    <input 
                                        id="password"
                                        name='password' 
                                        type={showPassword ? "text" : "password"}
                                        autoComplete="current-password"
                                        className="w-full px-4 py-3 border-2 border-base-300 rounded-xl bg-base-100 text-base-content focus:border-red-500 focus:outline-none transition-all duration-300 pr-12" 
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
                                    className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 text-sm font-medium hover:underline transition-colors"
                                >
                                    Forgot password?
                                </button>
                            </div>

                            {/* Login Button */}
                            <Button type="submit" className="w-full">
                                Sign In
                            </Button>

                            {/* Demo Login Button */}
                            <Button 
                                type="button"
                                variant="secondary"
                                onClick={handleDemoButtonClick}
                                className="w-full"
                            >
                                Try Demo Login
                            </Button>
                        </fieldset>

                        {/* Register Link */}
                        <div className="text-center mt-6 pt-6 border-t border-base-300">
                            <p className="text-base-content/60">
                                Don't have an account?{' '}
                                <Link 
                                    className='text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-semibold hover:underline transition-colors' 
                                    to="/Signup"
                                >
                                    Create Account
                                </Link>
                            </p>
                        </div>
                    </form>
                </Card>
            </div>

            {/* Demo Login Modal */}
            {showDemoModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <Card variant="elevated" className="w-full max-w-md">
                        <div className="text-center mb-6">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl shadow-lg mb-4">
                                <FaUser className="w-8 h-8 text-white" />
                            </div>
                            <h3 className={TYPOGRAPHY.heading.h3}>
                                Choose Demo Login Type
                            </h3>
                            <p className={`${TYPOGRAPHY.body.default} mt-2`}>
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
                                    <Button
                                        key={demoUser._id}
                                        onClick={() => handleDemoLogin(demoUser)}
                                        variant={(demoUser.role === 'admin' || demoUser.role === 'demoadmin') ? 'accent' : 'secondary'}
                                        className="w-full justify-start"
                                    >
                                        {(demoUser.role === 'admin' || demoUser.role === 'demoadmin') ? 
                                            <FaUserShield className="w-5 h-5" /> : 
                                            <FaUser className="w-5 h-5" />
                                        }
                                        <div className="text-left">
                                            <div className="font-bold">Demo {(demoUser.role === 'admin' || demoUser.role === 'demoadmin') ? 'Admin' : 'Donor'}</div>
                                            <div className="text-xs opacity-90">{demoUser.email}</div>
                                        </div>
                                    </Button>
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
                        <Button
                            onClick={() => setShowDemoModal(false)}
                            variant="secondary"
                            className="w-full"
                        >
                            Cancel
                        </Button>
                    </Card>
                </div>
            )}
        </div>
    );
};

export default Login;