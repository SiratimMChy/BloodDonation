import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { updateProfile } from "firebase/auth";
import auth from "../../Firebase/firebase.config";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";
import axios from "axios";

const Profile = () => {
    const { setUser, user } = useContext(AuthContext);
    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const axiosSecure = useAxiosSecure();

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
        setUploading(true);
        
        const form = e.target;
        const name = form.name.value;
        const photoUrlInput = form.photoUrl;
        const district = form.district.value;
        const upazila = form.upazila.value;
        const bloodGroup = form.bloodGroup.value;

        try {
            let imageUrl = user?.photoURL || profileData?.imageUrl;

          
            if (photoUrlInput.files && photoUrlInput.files[0]) {
                const file = photoUrlInput.files[0];
                
              
                const res = await axios.post(
                    `https://api.imgbb.com/1/upload?key=d6d69d6d3d1835a58c3edf001ecc0c25`,
                    { image: file },
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                );

                if (res.data.success) {
                    imageUrl = res.data.data.display_url;
                } else {
                    throw new Error("Image upload failed");
                }
            }

         
            await updateProfile(auth.currentUser, {
                displayName: name,
                photoURL: imageUrl
            });

            await axiosSecure.patch('/users/update/profile', {
                name,
                imageUrl: imageUrl,
                district,
                upazila,
                bloodGroup
            });

           
            setUser({
                ...user,
                displayName: name,
                photoURL: imageUrl
            });

            setProfileData({
                ...profileData,
                name,
                imageUrl: imageUrl,
                district,
                upazila,
                bloodGroup
            });

            setIsEditing(false);
            setUploading(false);
            toast.success("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating profile:", error);
            setUploading(false);
            toast.error("Failed to update profile. Please try again.");
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="flex justify-center items-center min-h-screen px-4 py-10 md:py-20 bg-linear-to-br from-gray-50 to-gray-100">
            <div className="card w-full max-w-2xl bg-white shadow-2xl rounded-2xl p-6 md:p-8 border border-gray-100">
                
                
                <div className="flex flex-col items-center mb-8 pb-6 border-b border-gray-200">
                    <div className="relative mb-4">
                        <div className="w-24 h-24 rounded-full ring-4 ring-red-500 ring-offset-4 ring-offset-white overflow-hidden shadow-lg">
                            <img
                                src={user?.photoURL || profileData?.imageUrl}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="absolute bottom-0 right-0 w-7 h-7 bg-green-500 rounded-full border-4 border-white"></div>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">Profile Information</h2>
                    <p className="text-sm text-gray-500 mt-1">Manage your personal information</p>
                </div>

               
                {!isEditing && (
                    <div className="flex justify-end mb-4">
                        <button
                            onClick={handleEdit}
                            className="btn bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 border-0"
                        >
                            Edit Profile
                        </button>
                    </div>
                )}

           
                <form onSubmit={handleUpdate} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                     
                        <div>
                            <label className="label">
                                <span className="label-text text-gray-700 font-semibold">Full Name</span>
                            </label>
                            <input
                                defaultValue={user?.displayName || profileData?.name}
                                name="name"
                                type="text"
                                placeholder="Enter your name"
                                className={`input input-bordered w-full rounded-lg ${isEditing ? 'focus:ring-2 focus:ring-red-500 focus:border-transparent' : 'bg-gray-50 cursor-not-allowed'}`}
                                disabled={!isEditing}
                                required
                            />
                        </div>

                        {/* Email (Always Disabled) */}
                        <div>
                            <label className="label">
                                <span className="label-text text-gray-700 font-semibold">Email Address</span>
                            </label>
                            <input
                                defaultValue={user?.email}
                                name="email"
                                type="email"
                                className="input input-bordered w-full bg-gray-100 rounded-lg cursor-not-allowed"
                                disabled
                            />
                        </div>

                        {/* District */}
                        <div>
                            <label className="label">
                                <span className="label-text text-gray-700 font-semibold">District</span>
                            </label>
                            <input 
                                defaultValue={profileData?.district} 
                                name="district" 
                                type="text" 
                                placeholder="Enter your district" 
                                className={`input input-bordered w-full rounded-lg ${isEditing ? 'focus:ring-2 focus:ring-red-500 focus:border-transparent' : 'bg-gray-50 cursor-not-allowed'}`}
                                disabled={!isEditing} 
                                required 
                            />
                        </div>

                        {/* Upazila */}
                        <div>
                            <label className="label">
                                <span className="label-text text-gray-700 font-semibold">Upazila</span>
                            </label>
                            <input
                                defaultValue={profileData?.upazila} 
                                name="upazila" 
                                type="text" 
                                placeholder="Enter your upazila" 
                                className={`input input-bordered w-full rounded-lg ${isEditing ? 'focus:ring-2 focus:ring-red-500 focus:border-transparent' : 'bg-gray-50 cursor-not-allowed'}`}
                                disabled={!isEditing} 
                                required
                            />
                        </div>

                       
                        <div>
                            <label className="label">
                                <span className="label-text text-gray-700 font-semibold">Blood Group</span>
                            </label>
                            <select 
                                defaultValue={profileData?.bloodGroup} 
                                name="bloodGroup" 
                                className={`select select-bordered w-full rounded-lg ${isEditing ? 'focus:ring-2 focus:ring-red-500 focus:border-transparent' : 'bg-gray-50 cursor-not-allowed'}`}
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

                       
                        {isEditing && (
                            <div>
                                <label className="label">
                                    <span className="label-text text-gray-700 font-semibold">Profile Photo</span>
                                </label>
                                <input 
                                    name="photoUrl" 
                                    type="file" 
                                    className="file-input file-input-bordered w-full rounded-lg focus:ring-2 focus:ring-red-500" 
                                    accept="image/*"
                                />
                                <p className="text-xs text-gray-500 mt-1">Leave empty to keep current photo</p>
                            </div>
                        )}
                    </div>

                  
                    {isEditing && (
                        <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-gray-200">
                            <button 
                                type="button"
                                onClick={handleCancel}
                                className="btn bg-gray-500 hover:bg-gray-600 text-white font-semibold px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 border-0"
                            >
                                Cancel
                            </button>
                            <button 
                                className="btn bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 border-0" 
                                type="submit"
                                disabled={uploading}
                            >
                                {uploading ? (
                                    <>
                                        <span className="loading loading-spinner loading-sm"></span>
                                        Saving...
                                    </>
                                ) : (
                                    "📄 Save"
                                )}
                            </button>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default Profile;