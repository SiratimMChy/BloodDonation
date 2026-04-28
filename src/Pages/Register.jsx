import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider';
import { updateProfile } from 'firebase/auth';
import auth from '../Firebase/firebase.config';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { FaUser, FaEnvelope, FaLock, FaImage, FaTint, FaMapMarkerAlt, FaEye, FaEyeSlash } from 'react-icons/fa';
import { TYPOGRAPHY, SPACING, BORDER_RADIUS } from '../styles/designSystem';

const Register = () => {
    const { registrationWithEmailAndPassword, setUser } = useContext(AuthContext);
    const [upazilas, setUpazilas] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [district, setDistrict] = useState('');
    const [upazila, setUpazila] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        axios.get('/upazila.json')
            .then(res => {
                setUpazilas(res.data.upazilas);
            });

        axios.get('/district.json')
            .then(res => {
                setDistricts(res.data.districts);
            });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const confirmPassword = e.target.confirmPassword.value;
        const name = e.target.name.value;
        const photoUrl = e.target.photoUrl;
        const file = photoUrl.files[0];
        const bloodGroup = e.target.bloodGroup.value;

        const uppercase = /[A-Z]/;
        const lowercase = /[a-z]/;

        if (password.length < 6) {
            toast.error('Password must be at least 6 characters long.');
            return;
        }
        if (!uppercase.test(password)) {
            toast.error('Password must contain at least one uppercase letter.');
            return;
        }
        if (!lowercase.test(password)) {
            toast.error('Password must contain at least one lowercase letter.');
            return;
        }
        if (password !== confirmPassword) {
            toast.error('Passwords do not match.');
            return;
        }

        const res = await axios.post(`https://api.imgbb.com/1/upload?&key=d6d69d6d3d1835a58c3edf001ecc0c25`, { image: file },
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        );
        const imageUrl = res.data.data.display_url;

        const formData = {
            email,
            password,
            name,
            imageUrl,
            bloodGroup,
            district,
            upazila
        }

        if (res.data.success === true) {
            registrationWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    updateProfile(auth.currentUser, {
                        displayName: name, photoURL: imageUrl
                    }).then(() => {
                        setUser(userCredential.user)
                        axios.post('https://blood-donation-backend-theta.vercel.app/users', formData)
                            .then(res => {
                                console.log(res.data);
                            })
                            .catch(err => {
                                console.error(err);
                            });
                        toast.success('Registration successful!');
                        navigate('/login');

                    }).catch((error) => {
                        console.log(error);
                    });
                })
                .catch(error => {
                    toast.error(error.message);
                    console.error(error);
                })
        }
    }

    return (
        <div className='min-h-screen bg-base-100 flex items-center justify-center px-4 py-10'>
            <title>Registration</title>
            <div className="w-full max-w-2xl">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-black text-base-content mb-4 tracking-tight">
                        Join Our <span className="bg-gradient-to-r from-red-500 to-rose-600 bg-clip-text text-transparent">Community</span>
                    </h1>
                    <p className="text-base-content/60 text-base">
                        Create your account and start saving lives today
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="bg-base-100 border-2 border-base-300 rounded-xl shadow-lg p-6 md:p-8">
                    <fieldset className="space-y-6">
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-semibold text-base-content mb-2">
                                <FaUser className="inline mr-2 text-base-content/60" /> Full Name
                            </label>
                            <input 
                                id="name"
                                name='name' 
                                type="text" 
                                autoComplete="name"
                                className="w-full px-4 py-3 border-2 border-base-300 rounded-xl bg-base-100 text-base-content focus:border-red-500 focus:outline-none transition-all duration-300" 
                                placeholder="Enter your full name" 
                                required 
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-semibold text-base-content mb-2">
                                <FaEnvelope className="inline mr-2 text-base-content/60" /> Email Address
                            </label>
                            <input 
                                id="email"
                                name='email' 
                                type="email" 
                                autoComplete="email"
                                className="w-full px-4 py-3 border-2 border-base-300 rounded-xl bg-base-100 text-base-content focus:border-red-500 focus:outline-none transition-all duration-300" 
                                placeholder="Enter your email address" 
                                required 
                            />
                        </div>

                        {/* Photo and Blood Group */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-base-content mb-2">
                                    <FaImage className="inline mr-2 text-base-content/60" /> Profile Photo
                                </label>
                                <input 
                                    id="photoUrl"
                                    name="photoUrl" 
                                    type="file" 
                                    className="w-full px-4 py-3 border-2 border-base-300 rounded-xl bg-base-100 text-base-content focus:border-red-500 transition-all duration-300" 
                                    accept="image/*"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-base-content mb-2">
                                    <FaTint className="inline mr-2 text-red-500" /> Blood Group
                                </label>
                                <select
                                    id="bloodGroup"
                                    name="bloodGroup"
                                    defaultValue=""
                                    className="w-full px-4 py-3 border-2 border-base-300 rounded-xl bg-base-100 text-base-content focus:border-red-500 focus:outline-none transition-all duration-300"
                                    required
                                >
                                    <option disabled value="">Choose Blood Group</option>
                                    <option value="A+">A+</option>
                                    <option value="A-">A-</option>
                                    <option value="B+">B+</option>
                                    <option value="B-">B-</option>
                                    <option value="AB+">AB+</option>
                                    <option value="AB-">AB-</option>
                                    <option value="O+">O+</option>
                                    <option value="O-">O-</option>
                                </select>
                            </div>
                        </div>

                        {/* District and Upazila */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-base-content mb-2">
                                    <FaMapMarkerAlt className="inline mr-2 text-base-content/60" /> District
                                </label>
                                <select 
                                    id="district"
                                    value={district} 
                                    onChange={(e) => setDistrict(e.target.value)} 
                                    className="w-full px-4 py-3 border-2 border-base-300 rounded-xl bg-base-100 text-base-content focus:border-red-500 focus:outline-none transition-all duration-300"
                                    required
                                >
                                    <option disabled value="">Choose District</option>
                                    {
                                        districts.map(district => (
                                            <option key={district.id} value={district.name}>
                                                {district.name}
                                            </option>
                                        ))
                                    }
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-base-content mb-2">
                                    <FaMapMarkerAlt className="inline mr-2 text-base-content/60" /> Upazila
                                </label>
                                <select 
                                    id="upazila"
                                    value={upazila} 
                                    onChange={(e) => setUpazila(e.target.value)} 
                                    className="w-full px-4 py-3 border-2 border-base-300 rounded-xl bg-base-100 text-base-content focus:border-red-500 focus:outline-none transition-all duration-300"
                                    required
                                >
                                    <option disabled value="">Choose Upazila</option>
                                    {
                                        upazilas.map(upazila => (
                                            <option key={upazila.id} value={upazila.name}>
                                                {upazila.name}
                                            </option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>

                        {/* Password and Confirm Password */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-base-content mb-2">
                                    <FaLock className="inline mr-2 text-base-content/60" /> Password
                                </label>
                                <div className="relative">
                                    <input 
                                        id="password"
                                        name='password' 
                                        type={showPassword ? "text" : "password"}
                                        autoComplete="new-password"
                                        className="w-full px-4 py-3 border-2 border-base-300 rounded-xl bg-base-100 text-base-content focus:border-red-500 focus:outline-none transition-all duration-300 pr-12" 
                                        placeholder="Enter password" 
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
                            <div>
                                <label className="block text-sm font-semibold text-base-content mb-2">
                                    <FaLock className="inline mr-2 text-base-content/60" /> Confirm Password
                                </label>
                                <div className="relative">
                                    <input 
                                        id="confirmPassword"
                                        name="confirmPassword" 
                                        type={showConfirmPassword ? "text" : "password"}
                                        autoComplete="new-password"
                                        className="w-full px-4 py-3 border-2 border-base-300 rounded-xl bg-base-100 text-base-content focus:border-red-500 focus:outline-none transition-all duration-300 pr-12" 
                                        placeholder="Confirm password" 
                                        required 
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-base-content/60 hover:text-base-content transition-colors"
                                        aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                                    >
                                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Password Requirements */}
                        <div className="bg-base-100 border border-base-300 rounded-xl p-4">
                            <h4 className="text-sm font-semibold text-base-content mb-2">Password Requirements:</h4>
                            <ul className="text-xs text-base-content/70 space-y-1">
                                <li>• At least 6 characters long</li>
                                <li>• Contains at least one uppercase letter</li>
                                <li>• Contains at least one lowercase letter</li>
                            </ul>
                        </div>
                    </fieldset>

                    {/* Register Button */}
                    <button 
                        type="submit" 
                        className="btn w-full bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white font-bold border-0 shadow-lg hover:shadow-xl transition-all duration-200 mt-6 rounded-xl py-3 min-h-12"
                    >
                        Create Account
                    </button>

                    {/* Login Link */}
                    <div className="text-center mt-6 pt-6 border-t border-base-300">
                        <p className="text-base-content/60">
                            Already have an account?{' '}
                            <Link 
                                className='text-red-600 hover:text-red-700 font-bold hover:font-bold transition-colors' 
                                to="/login"
                            >
                                Sign In
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
