import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { updateProfile } from "firebase/auth";
import auth from "../../Firebase/firebase.config";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";
import axios from "axios";
import { useDemoRestriction } from "../../Hooks/useDemoRestriction";

const Profile = () => {
    const { setUser, user } = useContext(AuthContext);
    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const { checkDemoRestriction } = useDemoRestriction();
    const axiosSecure = useAxiosSecure();

    // Fetch user profile data
    useEffect(() => {
        if (user?.email) {
            axiosSecure.get(`/users/role/${user.email}`)
                .then(res => {
                    setProfileData(res.data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error("Error fetching profile:", error);
                    setLoading(false);
                });
        }
    }, [user?.email, axiosSecure]);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        
        // Check if user is demo user and restrict action
        if (checkDemoRestriction()) {
            return;
        }

        setUploading(true);
        const form = e.target;
        const name = form.name.value;
        const photoUrlInput = form.photoUrl;
        const district = form.district.value;
        const upazila = form.upazila.value;
        const bloodGroup = form.bloodGroup.value;

        try {
            let imageUrl = user?.photoURL || profileData?.imageUrl;

            // Handle image upload if a new image is selected
            if (photoUrlInput.files && photoUrlInput.files[0]) {
                const imageFile = photoUrlInput.files[0];
                const formData = new FormData();
                formData.append('image', imageFile);

                // Upload to ImgBB
                const imgResponse = await axios.post(
                    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
                    formData
                );
                imageUrl = imgResponse.data.data.display_url;
            }

            // Update Firebase profile
            await updateProfile(auth.currentUser, {
                displayName: name,
                photoURL: imageUrl
            });

            // Update database
            const updatedData = {
                name,
                imageUrl,
                district,
                upazila,
                bloodGroup
            };

            await axiosSecure.put(`/users/${user.email}`, updatedData);

            // Update local state
            setUser({
                ...user,
                displayName: name,
                photoURL: imageUrl
            });

            setProfileData({
                ...profileData,
                ...updatedData
            });

            setIsEditing(false);
            toast.success("Profile updated successfully!");

        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error("Failed to update profile. Please try again.");
        } finally {
            setUploading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-spinner loading-lg text-red-600"></span>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-base-100 p-4 md:p-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-base-content mb-2">
                        My Profile
                    </h1>
                    <p className="text-base-content/70">
                        Manage your account information and preferences
                    </p>
                </div>

                {/* Profile Card */}
                <div className="bg-base-200 border-2 border-base-300 rounded-xl shadow-lg p-6 md:p-8">
                    {/* Profile Header */}
                    <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
                        <div className="avatar">
                            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full ring ring-red-500 ring-offset-base-100 ring-offset-2">
                                <img 
                                    src={user?.photoURL || profileData?.imageUrl || '/default-avatar.png'} 
                                    alt="Profile"
                                    className="rounded-full object-cover"
                                />
                            </div>
                        </div>
                        <div className="text-center md:text-left">
                            <h2 className="text-2xl md:text-3xl font-bold text-base-content">
                                {user?.displayName || profileData?.name || 'User'}
                            </h2>
                            <p className="text-base-content/70 text-lg">
                                {user?.email}
                            </p>
                            <div className="badge badge-lg bg-red-600 text-white font-bold mt-2">
                                {profileData?.role?.toUpperCase() || 'USER'}
                            </div>
                        </div>
                    </div>

                    {/* Profile Form */}
                    <form onSubmit={handleUpdate} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Name Field */}
                            <div>
                                <label className="label">
                                    <span className="label-text text-base-content font-semibold">Full Name</span>
                                </label>
                                <input
                                    defaultValue={user?.displayName || profileData?.name}
                                    name="name"
                                    type="text"
                                    placeholder="Enter your name"
                                    className={`input input-bordered w-full rounded-lg bg-base-100 text-base-content border-base-300 ${isEditing ? 'focus:ring-2 focus:ring-red-500 focus:border-transparent' : 'bg-base-300 cursor-not-allowed'}`}
                                    disabled={!isEditing}
                                    required
                                />
                            </div>

                            {/* Email Field */}
                            <div>
                                <label className="label">
                                    <span className="label-text text-base-content font-semibold">Email Address</span>
                                </label>
                                <input
                                    defaultValue={user?.email}
                                    type="email"
                                    className="input input-bordered w-full rounded-lg bg-base-300 text-base-content border-base-300 cursor-not-allowed"
                                    disabled
                                />
                            </div>

                            {/* Blood Group Field */}
                            <div>
                                <label className="label">
                                    <span className="label-text text-base-content font-semibold">Blood Group</span>
                                </label>
                                <select
                                    name="bloodGroup"
                                    defaultValue={profileData?.bloodGroup}
                                    className={`select select-bordered w-full rounded-lg bg-base-100 text-base-content border-base-300 ${isEditing ? 'focus:ring-2 focus:ring-red-500 focus:border-transparent' : 'bg-base-300 cursor-not-allowed'}`}
                                    disabled={!isEditing}
                                    required
                                >
                                    <option value="">Select Blood Group</option>
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

                            {/* District Field */}
                            <div>
                                <label className="label">
                                    <span className="label-text text-base-content font-semibold">District</span>
                                </label>
                                <input
                                    defaultValue={profileData?.district}
                                    name="district"
                                    type="text"
                                    placeholder="Enter your district"
                                    className={`input input-bordered w-full rounded-lg bg-base-100 text-base-content border-base-300 ${isEditing ? 'focus:ring-2 focus:ring-red-500 focus:border-transparent' : 'bg-base-300 cursor-not-allowed'}`}
                                    disabled={!isEditing}
                                    required
                                />
                            </div>

                            {/* Upazila Field */}
                            <div>
                                <label className="label">
                                    <span className="label-text text-base-content font-semibold">Upazila</span>
                                </label>
                                <input
                                    defaultValue={profileData?.upazila}
                                    name="upazila"
                                    type="text"
                                    placeholder="Enter your upazila"
                                    className={`input input-bordered w-full rounded-lg bg-base-100 text-base-content border-base-300 ${isEditing ? 'focus:ring-2 focus:ring-red-500 focus:border-transparent' : 'bg-base-300 cursor-not-allowed'}`}
                                    disabled={!isEditing}
                                    required
                                />
                            </div>

                            {/* Photo Upload Field */}
                            <div>
                                <label className="label">
                                    <span className="label-text text-base-content font-semibold">Profile Photo</span>
                                </label>
                                <input
                                    name="photoUrl"
                                    type="file"
                                    accept="image/*"
                                    className={`file-input file-input-bordered w-full rounded-lg bg-base-100 text-base-content border-base-300 ${isEditing ? 'focus:ring-2 focus:ring-red-500 focus:border-transparent' : 'bg-base-300 cursor-not-allowed'}`}
                                    disabled={!isEditing}
                                />
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-6">
                            {!isEditing ? (
                                <button
                                    type="button"
                                    onClick={handleEdit}
                                    className="btn bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white border-0 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex-1 min-h-[4rem] py-4 px-8 text-lg font-semibold"
                                >
                                    Edit Profile
                                </button>
                            ) : (
                                <>
                                    <button
                                        type="submit"
                                        disabled={uploading}
                                        className="btn bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white border-0 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex-1 min-h-[4rem] py-4 px-8 text-lg font-semibold"
                                    >
                                        {uploading ? (
                                            <>
                                                <span className="loading loading-spinner loading-sm"></span>
                                                Updating...
                                            </>
                                        ) : (
                                            'Save Changes'
                                        )}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleCancel}
                                        className="btn bg-base-300 hover:bg-base-400 text-base-content border-0 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex-1 min-h-[4rem] py-4 px-8 text-lg font-semibold"
                                    >
                                        Cancel
                                    </button>
                                </>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;