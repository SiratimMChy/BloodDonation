import { Droplet, User, MapPin, Phone, Calendar, Clock, Heart, ArrowLeft, Edit, CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../Provider/AuthProvider';
import { useNavigate, useParams } from 'react-router';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { useDemoRestriction } from '../Hooks/useDemoRestriction';

const ViewRequest = () => {
    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const navigate = useNavigate();
    const [requestData, setRequestData] = useState(null);
    const [showDonateModal, setShowDonateModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const { checkDemoRestriction } = useDemoRestriction();
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        if (!id) return;

        let isMounted = true;
        
        const fetchRequestData = () => {
            if (isMounted) {
                setLoading(true);
            }
            
            axiosSecure.get(`/requests/${id}`)
                .then(res => {
                    if (isMounted) {
                        setRequestData(res.data);
                        setLoading(false);
                    }
                })
                .catch(err => {
                    if (isMounted) {
                        console.log(err);
                        setLoading(false);
                        Swal.fire("Error", "Failed to load request data", "error");
                    }
                });
        };

        fetchRequestData();

        return () => {
            isMounted = false;
        };
    }, [id, axiosSecure]);

    const handleConfirmDonate = async () => {
        // Check if user is demo user and restrict action
        if (checkDemoRestriction()) {
            return;
        }
        
        try {
            await axiosSecure.put(`/requests/${id}`, {
                donation_status: 'inprogress',
                donorName: user.displayName,
                donorEmail: user.email
            });

            Swal.fire({
                title: "Success!",
                text: "Thank you for confirming your donation. The requester will be notified.",
                icon: "success",
                confirmButtonColor: "#dc2626"
            });
            setShowDonateModal(false);

            const res = await axiosSecure.get(`/requests/${id}`);
            setRequestData(res.data);

        } catch (error) {
            console.error(error);
            Swal.fire("Error", "Failed to confirm donation", "error");
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'pending':
                return <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5" />;
            case 'inprogress':
                return <Clock className="w-4 h-4 sm:w-5 sm:h-5" />;
            case 'done':
                return <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />;
            case 'canceled':
                return <XCircle className="w-4 h-4 sm:w-5 sm:h-5" />;
            default:
                return <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5" />;
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-base-100 flex items-center justify-center px-4">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-b-2 border-red-600 mx-auto mb-4"></div>
                    <p className="text-base-content/70 text-sm sm:text-base">Loading request details...</p>
                </div>
            </div>
        );
    }

    if (!requestData) {
        return (
            <div className="min-h-screen bg-base-100 flex items-center justify-center px-4">
                <div className="text-center">
                    <XCircle className="w-16 h-16 sm:w-20 sm:h-20 text-red-500 mx-auto mb-4" />
                    <h2 className="text-xl sm:text-2xl font-bold text-base-content mb-2">Request Not Found</h2>
                    <p className="text-base-content/70 mb-6">The requested donation request could not be found.</p>
                    <button
                        onClick={() => navigate(-1)}
                        className="btn bg-gradient-to-r from-red-600 to-red-700 text-white border-0 hover:from-red-700 hover:to-red-800"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-base-100 py-4 sm:py-6 lg:py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-6 sm:mb-8">
                    <button
                        onClick={() => navigate(-1)}
                        className="btn btn-ghost btn-sm mb-4 text-base-content hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        <span className="hidden sm:inline">Back</span>
                    </button>
                    
                    <div className="text-center">
                        <div className="inline-flex items-center gap-2 sm:gap-3  px-3 sm:px-4 py-2 rounded-full mb-4 add border-2 border-red-600">
                            <Droplet className="text-red-600 dark:text-red-500 fill-red-600 dark:fill-red-400" size={16} />
                            <span className="text-red-600 dark:text-red-500 font-bold text-xs sm:text-sm">BLOOD REQUEST</span>
                        </div>
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-base-content mb-2">
                            Donation Request Details
                        </h1>
                        <p className="text-base-content/70 text-sm sm:text-base">
                            Help save a life by responding to this urgent request
                        </p>
                    </div>
                </div>

                {/* Status Badge */}
                <div className="mb-6 sm:mb-8 flex justify-center">
                    <div className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl border-2 border-base-300 font-bold text-sm sm:text-base text-green-600 dark:text-green-400">
                        {getStatusIcon(requestData.donation_status)}
                        <span>Status: {requestData.donation_status?.toUpperCase()}</span>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
                    {/* Left Column - Request Details */}
                    <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                        {/* Blood Type Card */}
                        <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-white shadow-lg">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-red-100 text-sm sm:text-base font-medium mb-1">Blood Type Needed</p>
                                    <p className="text-2xl sm:text-3xl lg:text-4xl font-black">{requestData.bloodGroup}</p>
                                </div>
                                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 rounded-full flex items-center justify-center">
                                    <Droplet className="w-8 h-8 sm:w-10 sm:h-10 text-white fill-white" />
                                </div>
                            </div>
                        </div>

                        {/* Recipient Information */}
                        <div className="bg-base-200 border-2 border-base-300 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg">
                            <h3 className="text-lg sm:text-xl font-bold text-base-content mb-4 flex items-center gap-2">
                                <User className="text-red-600 dark:text-red-400" size={20} />
                                Recipient Information
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-xs sm:text-sm text-base-content/60 font-semibold mb-1">Full Name</p>
                                        <p className="text-sm sm:text-base text-base-content font-medium">{requestData.recipientName}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs sm:text-sm text-base-content/60 font-semibold mb-1">Blood Group</p>
                                        <div className="inline-flex items-center gap-2 text-red-600 border border-red-600 px-3 py-1 rounded-full">
                                            <Droplet className="w-3 h-3 text-red-600 dark:text-red-500 fill-red-600 dark:fill-red-400" />
                                            <span className="text-red-600 dark:text-red-500 font-bold text-sm">{requestData.bloodGroup}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-xs sm:text-sm text-base-content/60 font-semibold mb-1">Contact Number</p>
                                        <div className="flex items-center gap-2">
                                            <Phone className="w-4 h-4 text-base-content/40" />
                                            <p className="text-sm sm:text-base text-base-content font-medium">{requestData.mobile}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-xs sm:text-sm text-base-content/60 font-semibold mb-1">Location</p>
                                        <div className="flex items-start gap-2">
                                            <MapPin className="w-4 h-4 text-base-content/40 mt-0.5 shrink-0" />
                                            <p className="text-sm sm:text-base text-base-content font-medium">
                                                {requestData.recipientUpazila}, {requestData.recipientDistrict}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Full Address */}
                            {requestData.fullAddress && (
                                <div className="mt-4 pt-4 border-t border-base-300">
                                    <p className="text-xs sm:text-sm text-base-content/60 font-semibold mb-2">Full Address</p>
                                    <p className="text-sm sm:text-base text-base-content/80 leading-relaxed">{requestData.fullAddress}</p>
                                </div>
                            )}
                        </div>

                        {/* Donation Details */}
                        <div className="bg-base-200 border-2 border-base-300 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg">
                            <h3 className="text-lg sm:text-xl font-bold text-base-content mb-4 flex items-center gap-2">
                                <Calendar className="text-red-600 dark:text-red-400" size={20} />
                                Donation Schedule
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="flex items-center gap-3 p-3 bg-base-100 rounded-lg border border-base-300">
                                    <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                    <div>
                                        <p className="text-xs text-base-content/60 font-semibold">Date</p>
                                        <p className="text-sm sm:text-base text-base-content font-medium">{requestData.donationDate}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-base-100 rounded-lg border border-base-300">
                                    <Clock className="w-5 h-5 text-green-600 dark:text-green-400" />
                                    <div>
                                        <p className="text-xs text-base-content/60 font-semibold">Time</p>
                                        <p className="text-sm sm:text-base text-base-content font-medium">{requestData.donationTime}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Hospital/Message */}
                        {(requestData.hospitalName || requestData.requestMessage) && (
                            <div className="bg-base-200 border-2 border-base-300 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg">
                                <h3 className="text-lg sm:text-xl font-bold text-base-content mb-4">Additional Information</h3>
                                {requestData.hospitalName && (
                                    <div className="mb-4">
                                        <p className="text-xs sm:text-sm text-base-content/60 font-semibold mb-2">Hospital/Location</p>
                                        <p className="text-sm sm:text-base text-base-content/80">{requestData.hospitalName}</p>
                                    </div>
                                )}
                                {requestData.requestMessage && (
                                    <div>
                                        <p className="text-xs sm:text-sm text-base-content/60 font-semibold mb-2">Message</p>
                                        <p className="text-sm sm:text-base text-base-content/80 leading-relaxed">{requestData.requestMessage}</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Right Column - Requester Info & Actions */}
                    <div className="space-y-4 sm:space-y-6">
                        {/* Requester Information */}
                        <div className="bg-base-200 border-2 border-base-300 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg">
                            <h3 className="text-lg sm:text-xl font-bold text-base-content mb-4 flex items-center gap-2">
                                <User className="text-blue-600 dark:text-blue-400" size={20} />
                                Requester
                            </h3>
                            <div className="space-y-3">
                                <div>
                                    <p className="text-xs sm:text-sm text-base-content/60 font-semibold mb-1">Name</p>
                                    <p className="text-sm sm:text-base text-base-content font-medium">{requestData.requesterName}</p>
                                </div>
                                <div>
                                    <p className="text-xs sm:text-sm text-base-content/60 font-semibold mb-1">Email</p>
                                    <p className="text-sm sm:text-base text-base-content/80 break-all">{requestData.requesterEmail}</p>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-3 sm:space-y-4">
                            {requestData.donation_status === 'pending' && user?.email !== requestData.requesterEmail && (
                                <>
                                    <button
                                        onClick={() => setShowDonateModal(true)}
                                        className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-xl font-bold text-sm sm:text-base transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2"
                                    >
                                        <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
                                        <span>Confirm Donation</span>
                                    </button>
                                    <button
                                        onClick={() => navigate(-1)}
                                        className="w-full bg-base-300 hover:bg-base-400 text-base-content py-3 sm:py-4 px-4 sm:px-6 rounded-xl font-bold text-sm sm:text-base transition-all duration-300 flex items-center justify-center gap-2"
                                    >
                                        <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                                        <span>Go Back</span>
                                    </button>
                                </>
                            )}

                            {user?.email === requestData.requesterEmail && (
                                <>
                                    <button
                                        onClick={() => navigate(`/dashboard/edit-request/${id}`)}
                                        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-xl font-bold text-sm sm:text-base transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2"
                                    >
                                        <Edit className="w-4 h-4 sm:w-5 sm:h-5" />
                                        <span>Edit Request</span>
                                    </button>
                                    <button
                                        onClick={() => navigate('/dashboard/myRequest')}
                                        className="w-full bg-base-300 hover:bg-base-400 text-base-content py-3 sm:py-4 px-4 sm:px-6 rounded-xl font-bold text-sm sm:text-base transition-all duration-300 flex items-center justify-center gap-2"
                                    >
                                        <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                                        <span>My Requests</span>
                                    </button>
                                </>
                            )}

                            {requestData.donation_status !== 'pending' && user?.email !== requestData.requesterEmail && (
                                <button
                                    onClick={() => navigate(-1)}
                                    className="w-full bg-base-300 hover:bg-base-400 text-base-content py-3 sm:py-4 px-4 sm:px-6 rounded-xl font-bold text-sm sm:text-base transition-all duration-300 flex items-center justify-center gap-2"
                                >
                                    <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                                    <span>Go Back</span>
                                </button>
                            )}
                        </div>

                        {/* Donor Info (if in progress) */}
                        {requestData.donation_status === 'inprogress' && requestData.donorName && (
                            <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-900/50 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                                <h3 className="text-lg font-bold text-green-800 dark:text-green-400 mb-3 flex items-center gap-2">
                                    <CheckCircle className="w-5 h-5" />
                                    Donor Confirmed
                                </h3>
                                <div className="space-y-2">
                                    <p className="text-sm text-green-700 dark:text-green-300">
                                        <span className="font-semibold">Name:</span> {requestData.donorName}
                                    </p>
                                    <p className="text-sm text-green-700 dark:text-green-300">
                                        <span className="font-semibold">Email:</span> {requestData.donorEmail}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Donate Modal */}
                {showDonateModal && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <div className="bg-base-200 border-2 border-base-300 rounded-xl sm:rounded-2xl w-full max-w-md shadow-2xl">
                            <div className="p-4 sm:p-6">
                                <div className="text-center mb-6">
                                    <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Heart className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-xl sm:text-2xl font-bold text-base-content mb-2">
                                        Confirm Your Donation
                                    </h3>
                                    <p className="text-sm sm:text-base text-base-content/70">
                                        You're about to save a life. Please confirm your details.
                                    </p>
                                </div>

                                <div className="space-y-4 mb-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-base-content mb-2">Your Name</label>
                                        <input
                                            readOnly
                                            value={user?.displayName || user?.name || ''}
                                            className="w-full px-4 py-3 rounded-lg border-2 border-base-300 bg-base-100 text-base-content font-medium"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-base-content mb-2">Your Email</label>
                                        <input
                                            readOnly
                                            value={user?.email || ''}
                                            className="w-full px-4 py-3 rounded-lg border-2 border-base-300 bg-base-100 text-base-content font-medium"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-3">
                                    <button
                                        onClick={handleConfirmDonate}
                                        className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-3 px-4 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                                    >
                                        <Heart className="w-4 h-4" />
                                        <span>Confirm Donation</span>
                                    </button>
                                    <button
                                        onClick={() => setShowDonateModal(false)}
                                        className="flex-1 bg-base-300 hover:bg-base-400 text-base-content py-3 px-4 rounded-lg font-bold transition-all duration-300"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ViewRequest;