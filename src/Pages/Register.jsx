import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider';
import { updateProfile } from 'firebase/auth';
import auth from '../Firebase/firebase.config';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { FaUser, FaEnvelope, FaLock, FaImage, FaTint, FaMapMarkerAlt } from 'react-icons/fa';

const Register = () => {
    const { registrationWithEmailAndPassword, setUser } = useContext(AuthContext);
    const [upazilas, setUpazilas] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [district, setDistrict] = useState('');
    const [upazila, setUpazila] = useState('');

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

    const navigate = useNavigate();
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
        <div className='flex items-center justify-center min-h-screen px-4 py-10'>
            <title>Registration</title>
            <form onSubmit={handleSubmit} className="fieldset bg-linear-to-r from-red-100 to-orange-100 border border-blue-100 rounded-box w-full max-w-2xl p-4 sm:p-6 md:p-8">
                <h2 className="text-2xl md:text-3xl font-bold text-black text-center mb-1">Registration</h2>
                
                <fieldset className="fieldset space-y-4">
                    {/* Name */}
                    <div>
                        <label className="label">
                            <span className="label-text text-black text-lg font-semibold flex items-center gap-2">
                                <FaUser className="text-gray-500" /> Name
                            </span>
                        </label>
                        <input 
                            name='name' 
                            type="text" 
                            className="input input-bordered w-full" 
                            placeholder="Enter Your Name" 
                            required 
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="label">
                            <span className="label-text text-black text-lg font-semibold flex items-center gap-2">
                                <FaEnvelope className="text-gray-500" /> Email
                            </span>
                        </label>
                        <input 
                            name='email' 
                            type="email" 
                            className="input input-bordered w-full" 
                            placeholder="Enter Your Email" 
                            required 
                        />
                    </div>

                    {/* Photo and Blood Group */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="label">
                                <span className="label-text text-black text-lg font-semibold flex items-center gap-2">
                                    <FaImage className="text-gray-500" /> Photo
                                </span>
                            </label>
                            <input 
                                name="photoUrl" 
                                type="file" 
                                className="file-input file-input-bordered w-full" 
                                required
                            />
                        </div>

                        <div>
                            <label className="label">
                                <span className="label-text text-black text-lg font-semibold flex items-center gap-2">
                                    <FaTint className="text-red-500" /> Blood Group
                                </span>
                            </label>
                            <select
                                name="bloodGroup"
                                defaultValue=""
                                className="select select-bordered w-full"
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
                            <label className="label">
                                <span className="label-text text-black text-lg font-semibold flex items-center gap-2">
                                    <FaMapMarkerAlt className="text-gray-500" /> District
                                </span>
                            </label>
                            <select 
                                value={district} 
                                onChange={(e) => setDistrict(e.target.value)} 
                                className="select select-bordered w-full"
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
                            <label className="label">
                                <span className="label-text text-black text-lg font-semibold flex items-center gap-2">
                                    <FaMapMarkerAlt className="text-gray-500" /> Upazila
                                </span>
                            </label>
                            <select 
                                value={upazila} 
                                onChange={(e) => setUpazila(e.target.value)} 
                                className="select select-bordered w-full"
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
                            <label className="label">
                                <span className="label-text text-black text-lg font-semibold flex items-center gap-2">
                                    <FaLock className="text-gray-500" /> Password
                                </span>
                            </label>
                            <input 
                                name='password' 
                                type="password" 
                                className="input input-bordered w-full" 
                                placeholder="Enter Your Password" 
                                required 
                            />
                        </div>
                        <div>
                            <label className="label">
                                <span className="label-text text-black text-lg font-semibold flex items-center gap-2">
                                    <FaLock className="text-gray-500" /> Confirm Password
                                </span>
                            </label>
                            <input 
                                name="confirmPassword" 
                                type="password" 
                                className="input input-bordered w-full" 
                                placeholder="Confirm Your Password" 
                                required 
                            />
                        </div>
                    </div>
                </fieldset>

                <button 
                    type="submit" 
                    className="btn bg-linear-to-r from-red-600 to-orange-600 text-white font-semibold w-full mt-6 mb-4"
                >
                    Register
                </button>

                <div className="flex gap-1 text-sm justify-center">
                    <span className='text-black'>Already have an account?</span>
                    <Link className='text-red-600 link link-hover' to="/login">Login</Link>
                </div>
            </form>
        </div>
    );
};

export default Register;
