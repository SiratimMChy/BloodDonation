import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { FileText, Clock, CheckCircle, XCircle, TrendingUp, Calendar } from 'lucide-react';
import { MdBloodtype } from "react-icons/md";

const DonorDashboard = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [userData, setUserData] = useState(null);
    const [myRequests, setMyRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dashboardStats, setDashboardStats] = useState({
        totalRequests: 0,
        pendingRequests: 0,
        completedRequests: 0,
        canceledRequests: 0
    });

    // Format count for display
    const formatCount = (count) => {
        if (count >= 100) return '100+';
        if (count >= 50) return '50+';
        if (count >= 25) return '25+';
        if (count >= 10) return '10+';
        return count.toString();
    };

    useEffect(() => {
        if (user?.email) {
            // Fetch user data
            axiosSecure.get(`/users/role/${user.email}`)
                .then(res => {
                    setUserData(res.data);
                })
                .catch(err => {
                    console.error('Error fetching user data:', err);
                });

            // Fetch user's requests with statistics
            axiosSecure.get('/myRequests?page=0&size=1000')
                .then(response => {
                    const requests = response.data.requests || [];
                    setMyRequests(requests.slice(0, 5)); // Show only recent 5 requests
                    
                    // Calculate statistics
                    const stats = {
                        totalRequests: requests.length,
                        pendingRequests: requests.filter(r => r.donation_status === 'pending').length,
                        completedRequests: requests.filter(r => r.donation_status === 'done').length,
                        canceledRequests: requests.filter(r => r.donation_status === 'canceled').length
                    };
                    setDashboardStats(stats);
                    setLoading(false);
                })
                .catch(err => {
                    console.error('Error fetching requests:', err);
                    setLoading(false);
                });
        }
    }, [user, axiosSecure]);

    // Calculate completion rate
    const completionRate = dashboardStats.totalRequests > 0 
        ? Math.round((dashboardStats.completedRequests / dashboardStats.totalRequests) * 100)
        : 0;

    return (
        <div className='mt-4 mb-3 bg-base-100 p-2 sm:p-4'>
            <h1 className="font-bold text-center text-lg sm:text-xl md:text-2xl lg:text-3xl text-base-content/80 mb-6 sm:mb-8 lg:mb-12 px-2">
                Welcome, <span className='text-base-content font-extrabold'>{userData?.name}</span>! 
                Your kindness helps save lives every day.
            </h1>

            {/* Overview Cards */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-7xl mx-auto mb-6 sm:mb-8 lg:mb-12 px-2'>
                {/* Total Requests Card */}
                <div className='bg-base-200 rounded-lg sm:rounded-xl shadow-lg sm:shadow-xl border-2 border-base-300 p-4 sm:p-6 hover:shadow-xl sm:hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1'>
                    <div className='flex items-start justify-between mb-3 sm:mb-4'>
                        <div className='bg-red-500 p-2 sm:p-3 rounded-lg sm:rounded-xl shadow-lg'>
                            <FileText size={20} className='text-white sm:hidden' />
                            <FileText size={24} className='text-white hidden sm:block' />
                        </div>
                    </div>
                    <div>
                        <p className='text-base-content/60 text-xs font-medium uppercase tracking-wide mb-1 sm:mb-2'>
                            Total Requests
                        </p>
                        <h2 className='text-xl sm:text-2xl md:text-3xl font-bold text-base-content mb-1'>
                            {formatCount(dashboardStats.totalRequests)}
                        </h2>
                        <p className='text-base-content/50 text-xs'>All time requests</p>
                    </div>
                </div>

                {/* Pending Requests Card */}
                <div className='bg-base-200 rounded-lg sm:rounded-xl shadow-lg sm:shadow-xl border-2 border-base-300 p-4 sm:p-6 hover:shadow-xl sm:hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1'>
                    <div className='flex items-start justify-between mb-3 sm:mb-4'>
                        <div className='bg-yellow-500 p-2 sm:p-3 rounded-lg sm:rounded-xl shadow-lg'>
                            <Clock size={20} className='text-white sm:hidden' />
                            <Clock size={24} className='text-white hidden sm:block' />
                        </div>
                    </div>
                    <div>
                        <p className='text-base-content/60 text-xs font-medium uppercase tracking-wide mb-1 sm:mb-2'>
                            Pending
                        </p>
                        <h2 className='text-xl sm:text-2xl md:text-3xl font-bold text-base-content mb-1'>
                            {formatCount(dashboardStats.pendingRequests)}
                        </h2>
                        <p className='text-base-content/50 text-xs'>Awaiting response</p>
                    </div>
                </div>

                {/* Completed Requests Card */}
                <div className='bg-base-200 rounded-lg sm:rounded-xl shadow-lg sm:shadow-xl border-2 border-base-300 p-4 sm:p-6 hover:shadow-xl sm:hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1'>
                    <div className='flex items-start justify-between mb-3 sm:mb-4'>
                        <div className='bg-green-600 p-2 sm:p-3 rounded-lg sm:rounded-xl shadow-lg'>
                            <CheckCircle size={20} className='text-white sm:hidden' />
                            <CheckCircle size={24} className='text-white hidden sm:block' />
                        </div>
                    </div>
                    <div>
                        <p className='text-base-content/60 text-xs font-medium uppercase tracking-wide mb-1 sm:mb-2'>
                            Completed
                        </p>
                        <h2 className='text-xl sm:text-2xl md:text-3xl font-bold text-base-content mb-1'>
                            {formatCount(dashboardStats.completedRequests)}
                        </h2>
                        <p className='text-base-content/50 text-xs'>Successfully done</p>
                    </div>
                </div>

                {/* Success Rate Card */}
                <div className='bg-base-200 rounded-lg sm:rounded-xl shadow-lg sm:shadow-xl border-2 border-base-300 p-4 sm:p-6 hover:shadow-xl sm:hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1'>
                    <div className='flex items-start justify-between mb-3 sm:mb-4'>
                        <div className='bg-red-600 p-2 sm:p-3 rounded-lg sm:rounded-xl shadow-lg'>
                            <TrendingUp size={20} className='text-white sm:hidden' />
                            <TrendingUp size={24} className='text-white hidden sm:block' />
                        </div>
                    </div>
                    <div>
                        <p className='text-base-content/60 text-xs font-medium uppercase tracking-wide mb-1 sm:mb-2'>
                            Success Rate
                        </p>
                        <h2 className='text-xl sm:text-2xl md:text-3xl font-bold text-base-content mb-1'>
                            {completionRate}%
                        </h2>
                        <p className='text-base-content/50 text-xs'>Completion rate</p>
                    </div>
                </div>
            </div>

            {/* Charts Section */}
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto mb-6 sm:mb-8 lg:mb-12 px-2'>
                {/* Request Status Chart */}
                <div className='bg-base-200 rounded-lg sm:rounded-xl shadow-lg sm:shadow-xl border-2 border-base-300 p-4 sm:p-6'>
                    <h3 className='text-base sm:text-lg font-bold text-base-content mb-4 sm:mb-6 flex items-center gap-2'>
                        <MdBloodtype className='text-red-600' size={20} />
                        <span className='hidden sm:inline'>Request Status Distribution</span>
                        <span className='sm:hidden'>Status Distribution</span>
                    </h3>
                    <div className='space-y-3 sm:space-y-4'>
                        <div className='flex items-center justify-between'>
                            <div className='flex items-center gap-2 sm:gap-3'>
                                <div className='w-3 h-3 sm:w-4 sm:h-4 bg-yellow-500 rounded'></div>
                                <span className='text-base-content font-medium text-sm sm:text-base'>Pending</span>
                            </div>
                            <div className='flex items-center gap-2'>
                                <div className='w-20 sm:w-24 lg:w-32 bg-base-300 rounded-full h-2'>
                                    <div 
                                        className='bg-yellow-500 h-2 rounded-full' 
                                        style={{ width: `${dashboardStats.totalRequests > 0 ? (dashboardStats.pendingRequests / dashboardStats.totalRequests) * 100 : 0}%` }}
                                    ></div>
                                </div>
                                <span className='text-base-content font-bold w-6 sm:w-8 text-sm sm:text-base'>{dashboardStats.pendingRequests}</span>
                            </div>
                        </div>
                        <div className='flex items-center justify-between'>
                            <div className='flex items-center gap-2 sm:gap-3'>
                                <div className='w-3 h-3 sm:w-4 sm:h-4 bg-green-600 rounded'></div>
                                <span className='text-base-content font-medium text-sm sm:text-base'>Completed</span>
                            </div>
                            <div className='flex items-center gap-2'>
                                <div className='w-20 sm:w-24 lg:w-32 bg-base-300 rounded-full h-2'>
                                    <div 
                                        className='bg-green-600 h-2 rounded-full' 
                                        style={{ width: `${dashboardStats.totalRequests > 0 ? (dashboardStats.completedRequests / dashboardStats.totalRequests) * 100 : 0}%` }}
                                    ></div>
                                </div>
                                <span className='text-base-content font-bold w-6 sm:w-8 text-sm sm:text-base'>{dashboardStats.completedRequests}</span>
                            </div>
                        </div>
                        <div className='flex items-center justify-between'>
                            <div className='flex items-center gap-2 sm:gap-3'>
                                <div className='w-3 h-3 sm:w-4 sm:h-4 bg-red-600 rounded'></div>
                                <span className='text-base-content font-medium text-sm sm:text-base'>Canceled</span>
                            </div>
                            <div className='flex items-center gap-2'>
                                <div className='w-20 sm:w-24 lg:w-32 bg-base-300 rounded-full h-2'>
                                    <div 
                                        className='bg-red-600 h-2 rounded-full' 
                                        style={{ width: `${dashboardStats.totalRequests > 0 ? (dashboardStats.canceledRequests / dashboardStats.totalRequests) * 100 : 0}%` }}
                                    ></div>
                                </div>
                                <span className='text-base-content font-bold w-6 sm:w-8 text-sm sm:text-base'>{dashboardStats.canceledRequests}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className='bg-base-200 rounded-lg sm:rounded-xl shadow-lg sm:shadow-xl border-2 border-base-300 p-4 sm:p-6'>
                    <h3 className='text-base sm:text-lg font-bold text-base-content mb-4 sm:mb-6 flex items-center gap-2'>
                        <Calendar className='text-red-600' size={20} />
                        <span className='hidden sm:inline'>Quick Statistics</span>
                        <span className='sm:hidden'>Statistics</span>
                    </h3>
                    <div className='space-y-3 sm:space-y-4 lg:space-y-6'>
                        <div className='flex items-center justify-between p-3 sm:p-4 bg-base-100 rounded-lg border border-base-300'>
                            <div>
                                <p className='text-base-content/60 text-xs sm:text-sm'>This Month</p>
                                <p className='text-base-content font-bold text-lg sm:text-xl'>{dashboardStats.totalRequests}</p>
                            </div>
                            <div className='text-green-600'>
                                <TrendingUp size={24} className='sm:hidden' />
                                <TrendingUp size={32} className='hidden sm:block' />
                            </div>
                        </div>
                        <div className='flex items-center justify-between p-3 sm:p-4 bg-base-100 rounded-lg border border-base-300'>
                            <div>
                                <p className='text-base-content/60 text-xs sm:text-sm'>Success Rate</p>
                                <p className='text-base-content font-bold text-lg sm:text-xl'>{completionRate}%</p>
                            </div>
                            <div className='text-blue-600'>
                                <CheckCircle size={24} className='sm:hidden' />
                                <CheckCircle size={32} className='hidden sm:block' />
                            </div>
                        </div>
                        <div className='flex items-center justify-between p-3 sm:p-4 bg-base-100 rounded-lg border border-base-300'>
                            <div>
                                <p className='text-base-content/60 text-xs sm:text-sm'>Lives Helped</p>
                                <p className='text-base-content font-bold text-lg sm:text-xl'>{dashboardStats.completedRequests}</p>
                            </div>
                            <div className='text-red-600'>
                                <MdBloodtype size={24} className='sm:hidden' />
                                <MdBloodtype size={32} className='hidden sm:block' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Requests Table */}
            <div className='max-w-7xl mx-auto px-2'>
                <div className='bg-base-200 rounded-lg sm:rounded-xl shadow-lg sm:shadow-xl border-2 border-base-300 p-4 sm:p-6'>
                    <h3 className='text-base sm:text-lg font-bold text-base-content mb-4 sm:mb-6 flex items-center gap-2'>
                        <FileText className='text-red-600' size={20} />
                        <span className='hidden sm:inline'>Recent Donation Requests</span>
                        <span className='sm:hidden'>Recent Requests</span>
                    </h3>
                    
                    {loading ? (
                        <div className='flex justify-center items-center py-8 sm:py-12'>
                            <span className="loading loading-spinner loading-md sm:loading-lg text-red-600"></span>
                        </div>
                    ) : myRequests.length > 0 ? (
                        <>
                            {/* Desktop Table */}
                            <div className="hidden md:block overflow-x-auto">
                                <table className="table w-full bg-base-100 border-2 border-base-300 rounded-lg">
                                    <thead>
                                        <tr className="bg-base-300">
                                            <th className="border-2 border-base-300 px-3 sm:px-4 py-3 text-left font-bold text-base-content text-sm">#</th>
                                            <th className="border-2 border-base-300 px-3 sm:px-4 py-3 text-left font-bold text-base-content text-sm">Recipient</th>
                                            <th className="border-2 border-base-300 px-3 sm:px-4 py-3 text-left font-bold text-base-content text-sm">Blood Group</th>
                                            <th className="border-2 border-base-300 px-3 sm:px-4 py-3 text-left font-bold text-base-content text-sm">Hospital</th>
                                            <th className="border-2 border-base-300 px-3 sm:px-4 py-3 text-left font-bold text-base-content text-sm">Date</th>
                                            <th className="border-2 border-base-300 px-3 sm:px-4 py-3 text-left font-bold text-base-content text-sm">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {myRequests.map((request, index) => (
                                            <tr key={request._id} className="hover:bg-base-200/50">
                                                <td className="border-2 border-base-300 px-3 sm:px-4 py-3 font-semibold text-base-content text-sm">{index + 1}</td>
                                                <td className="border-2 border-base-300 px-3 sm:px-4 py-3 font-semibold text-base-content text-sm">{request.recipientName}</td>
                                                <td className="border-2 border-base-300 px-3 sm:px-4 py-3 font-bold text-red-600 dark:text-red-400 text-sm">{request.bloodGroup}</td>
                                                <td className="border-2 border-base-300 px-3 sm:px-4 py-3 font-semibold text-base-content text-sm">{request.hospitalName}</td>
                                                <td className="border-2 border-base-300 px-3 sm:px-4 py-3 font-semibold text-base-content text-sm">{request.donationDate}</td>
                                                <td className="border-2 border-base-300 px-3 sm:px-4 py-3">
                                                    <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-bold ${
                                                        request.donation_status === 'done' ? 'text-yellow-600 dark:text-yellow-400' :
                                                        request.donation_status === 'pending' ? 'text-red-600 dark:text-red-400' :
                                                        request.donation_status === 'inprogress' ? 'text-green-600 dark:text-green-400' :
                                                        'text-red-600 dark:text-red-400'
                                                    }`}>
                                                        {request.donation_status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Mobile Cards */}
                            <div className="md:hidden space-y-3 sm:space-y-4">
                                {myRequests.map((request, index) => (
                                    <div key={request._id} className="bg-base-100 border-2 border-base-300 rounded-lg p-3 sm:p-4">
                                        <div className="flex justify-between items-start mb-2 sm:mb-3">
                                            <span className="badge badge-sm sm:badge-lg text-base-content font-bold bg-base-300">
                                                #{index + 1}
                                            </span>
                                            <span className="badge badge-sm sm:badge-lg bg-red-600 text-white font-bold">
                                                {request.bloodGroup}
                                            </span>
                                        </div>
                                        <div className="space-y-1 sm:space-y-2">
                                            <div>
                                                <span className="text-xs text-base-content/70 font-semibold">Recipient:</span>
                                                <p className="font-semibold text-base-content text-sm">{request.recipientName}</p>
                                            </div>
                                            <div>
                                                <span className="text-xs text-base-content/70 font-semibold">Hospital:</span>
                                                <p className="font-semibold text-base-content text-sm">{request.hospitalName}</p>
                                            </div>
                                            <div className="flex gap-3 sm:gap-4">
                                                <div className="flex-1">
                                                    <span className="text-xs text-base-content/70 font-semibold">Date:</span>
                                                    <p className="font-semibold text-base-content text-sm">{request.donationDate}</p>
                                                </div>
                                                <div className="flex-1">
                                                    <span className="text-xs text-base-content/70 font-semibold">Status:</span>
                                                    <p className="font-semibold text-base-content capitalize text-sm">
                                                        <span className={`${
                                                            request.donation_status === 'done' ? 'text-yellow-600 dark:text-yellow-400' :
                                                            request.donation_status === 'pending' ? 'text-red-600 dark:text-red-400' :
                                                            request.donation_status === 'inprogress' ? 'text-green-600 dark:text-green-400' :
                                                            'text-red-600 dark:text-red-400'
                                                        }`}>
                                                            {request.donation_status}
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className='text-center py-8 sm:py-12'>
                            <MdBloodtype size={48} className='text-base-content/30 mx-auto mb-3 sm:mb-4 sm:hidden' />
                            <MdBloodtype size={64} className='text-base-content/30 mx-auto mb-3 sm:mb-4 hidden sm:block' />
                            <p className='text-base-content/60 text-base sm:text-lg font-medium'>No donation requests yet</p>
                            <p className='text-base-content/40 text-sm'>Your requests will appear here once you create them</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DonorDashboard;