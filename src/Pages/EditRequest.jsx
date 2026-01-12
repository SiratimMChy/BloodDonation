import { Droplet } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../Provider/AuthProvider';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';
import useAxiosSecure from '../Hooks/useAxiosSecure';

const EditRequest = () => {
    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const navigate = useNavigate();
    const [upazilas, setUpazilas] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [district, setDistrict] = useState('');
    const [upazila, setUpazila] = useState('');
    const [requestData, setRequestData] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const axiosSecure = useAxiosSecure();

    // fetch user role
    useEffect(() => {
        if (user?.email) {
            axiosSecure.get(`/users/role/${user.email}`)
                .then(res => {
                    setUserRole(res.data.role);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }, [user, axiosSecure]);

    useEffect(() => {
        axios.get('/upazila.json')
            .then(res => setUpazilas(res.data.upazilas));
        axios.get('/district.json')
            .then(res => setDistricts(res.data.districts));
    }, []);

    // load request data
    useEffect(() => {
        if (!id || !user?.email || !userRole) return;

        axiosSecure.get(`/requests/${id}`)
            .then(res => {
                const isOwner = res.data.requesterEmail.toLowerCase() === user.email.toLowerCase();
                const isAdmin = userRole === 'admin';

                if (!isOwner && !isAdmin) {
                    Swal.fire({
                        title: "Unauthorized",
                        text: "You are not authorized to edit this request",
                        icon: "error"
                    }).then(() => {
                        if (isAdmin) {
                            navigate('/dashboard/allRequest');
                        } else {
                            navigate('/dashboard/myRequest');
                        }
                    });
                }
                setRequestData(res.data);
                setDistrict(res.data.recipientDistrict);
                setUpazila(res.data.recipientUpazila);
            })
            .catch(err => {
                console.log(err);
                Swal.fire({
                    title: "Error",
                    text: "Failed to load request data",
                    icon: "error"
                });
            });
    }, [id, user, userRole, axiosSecure, navigate]);

    // update request
    const handleUpdateRequest = (e) => {
        e.preventDefault();
        const form = e.target;

        const updatedData = {
            requesterName: form.requesterName.value,
            requesterEmail: form.requesterEmail.value,
            recipientName: form.recipientName.value,
            recipientDistrict: form.recipientDistrict.value,
            recipientUpazila: form.recipientUpazila.value,
            hospitalName: form.hospitalName.value,
            fullAddress: form.fullAddress.value,
            bloodGroup: form.bloodGroup.value,
            donationDate: form.donationDate.value,
            donationTime: form.donationTime.value,
            requestMessage: form.requestMessage.value,
            mobile: form.mobile.value,
            donation_status: requestData.donation_status,
            createdAt: requestData.createdAt
        };

        axiosSecure.put(`/requests/${id}`, updatedData)
            .then(() => {
                Swal.fire({
                    title: "Successfully Updated",
                    icon: "success"
                });
                navigate('/dashboard/myRequest');
            })
            .catch(err => {
                console.log(err);
                Swal.fire({
                    title: "Error",
                    text: "Failed to update request",
                    icon: "error"
                });
            });
    };

    // loading guard
    if (!requestData) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-base-100 flex items-start sm:items-center justify-center px-3 sm:px-6 py-6">
            <div className="w-full max-w-3xl bg-base-200 rounded-xl sm:rounded-2xl shadow-lg border border-base-300 p-4 sm:p-6 md:p-8">
                <h2 className="flex items-center justify-center gap-1 text-sm sm:text-2xl font-semibold text-red-600 dark:text-red-400 mb-6 text-center">
                    <Droplet className="text-red-600 dark:text-red-400" size={28} />
                    Edit Blood Donation Request
                </h2>

                <form onSubmit={handleUpdateRequest} className="space-y-4 sm:space-y-5">
                    {/* Requester Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-base-content mb-1">Requester Name</label>
                            <input
                                name='requesterName'
                                type="text"
                                readOnly
                                defaultValue={requestData.requesterName}
                                className="w-full rounded-lg border border-base-300 bg-base-100 px-3 sm:px-4 py-2 text-base-content/70 cursor-not-allowed text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-base-content mb-1">Requester Email</label>
                            <input
                                name='requesterEmail'
                                type="email"
                                readOnly
                                defaultValue={requestData.requesterEmail}
                                className="w-full rounded-lg border border-base-300 bg-base-100 px-3 sm:px-4 py-2 text-base-content/70 cursor-not-allowed text-sm"
                            />
                        </div>
                    </div>

                    {/* Recipient Info */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col">
                            <label className="block text-sm font-medium text-base-content mb-1">Recipient Name</label>
                            <input
                                required
                                name='recipientName'
                                type="text"
                                defaultValue={requestData.recipientName}
                                placeholder="Enter recipient name"
                                className="input w-full rounded-lg border border-base-300 bg-base-100 text-base-content px-3 sm:px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="block text-sm font-medium text-base-content mb-1">Recipient Mobile No</label>
                            <input
                                required
                                name='mobile'
                                type="text"
                                defaultValue={requestData.mobile}
                                placeholder="Enter recipient Mobile No"
                                className="input w-full rounded-lg border border-base-300 bg-base-100 text-base-content px-3 sm:px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-base-content mb-1">Recipient District</label>
                            <select
                                required
                                name='recipientDistrict'
                                value={district}
                                onChange={(e) => setDistrict(e.target.value)}
                                className="select w-full rounded-lg border border-base-300 bg-base-100 text-base-content px-3 sm:px-4 py-2 focus:ring-2 focus:ring-red-500 text-sm"
                            >
                                <option value="">Select district</option>
                                {
                                    districts.map(d => (
                                        <option key={d.id} value={d.name}>
                                            {d.name}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-base-content mb-1">Recipient Upazila</label>
                            <select
                                required
                                name='recipientUpazila'
                                value={upazila}
                                onChange={(e) => setUpazila(e.target.value)}
                                className="select w-full rounded-lg border border-base-300 bg-base-100 text-base-content px-3 sm:px-4 py-2 focus:ring-2 focus:ring-red-500 text-sm"
                            >
                                <option value="">Select upazila</option>
                                {
                                    upazilas.map(u => (
                                        <option key={u.id} value={u.name}>
                                            {u.name}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>

                    {/* Hospital Info */}
                    <div>
                        <label className="block text-sm font-medium text-base-content mb-1">Hospital Name</label>
                        <input
                            required
                            type="text"
                            name='hospitalName'
                            defaultValue={requestData.hospitalName}
                            placeholder="e.g. Dhaka Medical College Hospital"
                            className="input w-full rounded-lg border border-base-300 bg-base-100 text-base-content px-3 sm:px-4 py-2 focus:ring-2 focus:ring-red-500 text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-base-content mb-1">Full Address</label>
                        <input
                            name='fullAddress'
                            type="text"
                            defaultValue={requestData.fullAddress}
                            placeholder="e.g. Zahir Raihan Rd, Dhaka"
                            required
                            className="input w-full rounded-lg border border-base-300 bg-base-100 text-base-content px-3 sm:px-4 py-2 focus:ring-2 focus:ring-red-500 text-sm"
                        />
                    </div>

                    {/* Blood Group */}
                    <div>
                        <label className="block text-sm font-medium text-base-content mb-1">Blood Group</label>
                        <select
                            required
                            name='bloodGroup'
                            defaultValue={requestData.bloodGroup}
                            className="w-full select rounded-lg border border-base-300 bg-base-100 px-3 text-red-600 dark:text-red-400 font-bold sm:px-4 py-2 focus:ring-2 focus:ring-red-500 text-sm"
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

                    {/* Date & Time */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-base-content mb-1">Donation Date</label>
                            <input
                                required
                                name='donationDate'
                                type="date"
                                defaultValue={requestData.donationDate}
                                className="input w-full rounded-lg border border-base-300 bg-base-100 text-base-content px-3 sm:px-4 py-2 focus:ring-2 focus:ring-red-500 text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-base-content mb-1">Donation Time</label>
                            <input
                                name='donationTime'
                                type="time"
                                defaultValue={requestData.donationTime}
                                className="input w-full rounded-lg border border-base-300 bg-base-100 text-base-content px-3 sm:px-4 py-2 focus:ring-2 focus:ring-red-500 text-sm"
                            />
                        </div>
                    </div>

                    {/* Request Message */}
                    <div>
                        <label className="block text-sm font-medium text-base-content mb-1">Request Message</label>
                        <textarea
                            rows="3"
                            name='requestMessage'
                            defaultValue={requestData.requestMessage}
                            placeholder="Write details about why blood is needed..."
                            className="textarea w-full rounded-lg border border-base-300 bg-base-100 text-base-content px-3 sm:px-4 py-2 focus:ring-2 focus:ring-red-500 text-sm"
                        ></textarea>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-2 sm:pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <button
                            type="button"
                            onClick={() => navigate('/dashboard/myRequest')}
                            className="w-full rounded-lg bg-red-500 py-2.5 sm:py-3 text-white font-semibold text-sm sm:text-base hover:bg-red-600 transition duration-200"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="w-full rounded-lg bg-red-600 py-2.5 sm:py-3 text-white font-semibold text-sm sm:text-base hover:bg-red-700 transition duration-200"
                        >
                            Update Request
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditRequest;