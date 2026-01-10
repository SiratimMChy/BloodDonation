import { Droplet, User, } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../Provider/AuthProvider';
import { useNavigate, useParams } from 'react-router';
import useAxiosSecure from '../Hooks/useAxiosSecure';

const ViewRequest = () => {
    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const navigate = useNavigate();
    const [requestData, setRequestData] = useState(null);
    const [showDonateModal, setShowDonateModal] = useState(false);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        if (!id) return;

        axiosSecure.get(`/requests/${id}`)
            .then(res => {
                setRequestData(res.data);
            })
            .catch(err => {
                console.log(err);
                Swal.fire("Error", "Failed to load request data", "error");
            });
    }, [id, axiosSecure]);

    const handleConfirmDonate = async () => {
        try {
            await axiosSecure.put(`/requests/${id}`, {
                donation_status: 'inprogress',
                donorName: user.displayName,
                donorEmail: user.email
            });

            Swal.fire("Success", "Donation confirmed", "success");
            setShowDonateModal(false);

            const res = await axiosSecure.get(`/requests/${id}`);
            setRequestData(res.data);

        } catch (error) {
            console.error(error);
            Swal.fire("Error", "Failed to confirm donation", "error");
        }
    };


    if (!requestData) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-start sm:items-center justify-center px-3 sm:px-6 py-6">
            <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-6">

                <div className="flex items-center justify-center gap-2 mb-6">
                    <Droplet className="text-red-600" size={28} />
                    <h2 className="text-2xl font-semibold text-red-600">
                        Blood Donation Request Details
                    </h2>
                </div>

                {/* Status */}
                <div className="mb-6 flex justify-center">
                    <span className={`px-4 py-2 rounded-full text-sm font-semibold ${requestData.donation_status === 'pending'
                        ? 'bg-red-100 text-red-800'
                        : requestData.donation_status === 'inprogress'
                            ? 'bg-blue-100 text-blue-800'
                            : requestData.donation_status === 'done'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                        }`}>
                        Status: {requestData.donation_status?.toUpperCase()}
                    </span>
                </div>

                {/* Requester */}
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                        <User className="text-red-600" size={20} /> Requester Info
                    </h3>
                    <p>Name: {requestData.requesterName}</p>
                    <p>Email: {requestData.requesterEmail}</p>
                </div>

                {/* Recipient */}
                <div className="bg-red-50 p-4 rounded-lg mb-4">
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                        <User className="text-red-600" size={20} /> Recipient Info
                    </h3>
                    <p>Name: {requestData.recipientName}</p>
                    <p>Blood Group: {requestData.bloodGroup}</p>
                    <p>Phone: {requestData.mobile}</p>
                    <p>Location: {requestData.recipientUpazila}, {requestData.recipientDistrict}</p>
                </div>

                {/* Donate Button */}
                {requestData.donation_status === 'pending' &&
                    user?.email !== requestData.requesterEmail && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <button
                                onClick={() => setShowDonateModal(true)}
                                className=" mb-4 bg-red-600 text-white py-3 px-5 rounded-lg font-semibold hover:bg-red-700"
                            >
                                Donate
                            </button>
                            <button
                                onClick={() => navigate(-1)}
                                className=" mb-4 bg-red-500 text-white py-3 px-5 rounded-lg font-semibold hover:bg-red-600"
                            >
                                Cancel
                            </button>
                        </div>

                    )}
                {user?.email == requestData.requesterEmail && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <button
                            onClick={() => navigate('/dashboard/myRequest')}
                            className="bg-gray-500  text-white py-3 px-5 rounded-lg font-semibold"
                        >
                            Back to My Requests
                        </button>
                        <button
                            onClick={() => navigate(`/dashboard/edit-request/${id}`)}
                            className=" bg-blue-500 text-white py-3 px-5 rounded-lg font-semibold hover:bg-blue-700"
                        >
                            Edit Request
                        </button>
                    </div>
                )}


                {/* Donate Modal */}
                {showDonateModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg w-full max-w-md">
                            <h3 className="text-lg font-semibold mb-4 text-center">
                                Confirm Donation
                            </h3>

                            <input
                                readOnly
                                value={user.displayName}
                                className="input input-bordered w-full mb-3"
                            />

                            <input
                                readOnly
                                value={user.email}
                                className="input input-bordered w-full mb-4"
                            />

                            <div className="flex gap-3">
                                <button
                                    onClick={handleConfirmDonate}
                                    className="flex-1 bg-red-600 text-white py-2 rounded"
                                >
                                    Confirm
                                </button>
                                <button
                                    onClick={() => setShowDonateModal(false)}
                                    className="flex-1 bg-gray-400 py-2 rounded"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default ViewRequest;
