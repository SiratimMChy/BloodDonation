import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { Users, DollarSign, TrendingUp, Calendar, FileText, UserCheck } from 'lucide-react';
import { MdBloodtype } from "react-icons/md";

const AdminDashboard = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [userData, setUserData] = useState(null);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalFunding, setTotalFunding] = useState(0);
    const [totalRequests, setTotalRequests] = useState(0);
    const [recentRequests, setRecentRequests] = useState([]);
    const [recentUsers, setRecentUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [requestStats, setRequestStats] = useState({
        pending: 0,
        inprogress: 0,
        done: 0,
        canceled: 0
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
            axiosSecure.get(`/users/role/${user.email}`)
                .then(res => {
                    setUserData(res.data);
                })
                .catch(err => {
                    console.error('Error fetching user data:', err);
                });
        }
    }, [user, axiosSecure]);

    useEffect(() => {
        // Fetch all data
        const fetchData = async () => {
            try {
                // Fetch users
                const usersRes = await axiosSecure.get('/users?page=0&size=1000');
                const donors = usersRes.data.users?.filter(u => u.role?.toLowerCase() === 'donor') || [];
                setTotalUsers(donors.length);
                setRecentUsers(usersRes.data.users?.slice(0, 5) || []);

                // Fetch payments
                const paymentsRes = await axiosSecure.get('/payment?page=0&size=1000');
                const total = paymentsRes.data.requests?.reduce(
                    (sum, payment) => sum + Number(payment.amount || 0), 
                    0
                ) || 0;
                setTotalFunding(total);

                // Fetch requests with detailed stats
                const requestsRes = await axiosSecure.get('/requests?page=0&size=1000');
                const requests = requestsRes.data.requests || [];
                setTotalRequests(requests.length);
                setRecentRequests(requests.slice(0, 5));

                // Calculate request statistics
                const stats = {
                    pending: requests.filter(r => r.donation_status === 'pending').length,
                    inprogress: requests.filter(r => r.donation_status === 'inprogress').length,
                    done: requests.filter(r => r.donation_status === 'done').length,
                    canceled: requests.filter(r => r.donation_status === 'canceled').length
                };
                setRequestStats(stats);

                setLoading(false);
            } catch (err) {
                console.error('Error fetching dashboard data:', err);
                setLoading(false);
            }
        };

        fetchData();
    }, [axiosSecure]);

    return (
        <div className='mt-4 mb-3 bg-base-100 p-2 sm:p-4'>
            <h1 className="font-bold text-center text-lg sm:text-xl md:text-2xl lg:text-3xl text-base-content/80 mb-6 sm:mb-8 lg:mb-12 px-2">
                Welcome, <span className='text-base-content font-extrabold'>{userData?.name}</span>! 
                Manage and oversee the life-saving mission.
            </h1>

            {/* Overview Cards */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto mb-6 sm:mb-8 lg:mb-12 px-2'>
                {/* Total Donors Card */}
                <div className='bg-base-200 rounded-lg sm:rounded-xl shadow-lg sm:shadow-xl border-2 border-base-300 p-4 sm:p-6 lg:p-8 hover:shadow-xl sm:hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1'>
                    <div className='flex items-start justify-between mb-3 sm:mb-4 lg:mb-6'>
                        <div className='bg-red-500 p-2 sm:p-3 lg:p-4 rounded-lg sm:rounded-xl shadow-lg'>
                            <Users size={20} className='text-white sm:hidden' />
                            <Users size={24} className='text-white hidden sm:block lg:hidden' />
                            <Users size={28} className='text-white hidden lg:block' />
                        </div>
                    </div>
                    <div>
                        <p className='text-base-content/60 text-xs sm:text-sm font-medium uppercase tracking-wide mb-1 sm:mb-2'>
                            Total Donors
                        </p>
                        <h2 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-base-content mb-1'>
                            {formatCount(totalUsers)}
                        </h2>
                        <p className='text-base-content/50 text-xs sm:text-sm'>Registered users</p>
                    </div>
                    <div className='mt-3 sm:mt-4 lg:mt-6 pt-3 sm:pt-4 lg:pt-6 border-t-2 border-base-300'>
                        <div className='flex items-center text-green-600 dark:text-green-400 text-xs sm:text-sm font-semibold'>
                            <span className='mr-1'>●</span> Active
                        </div>
                    </div>
                </div>

                {/* Total Funding Card */}
                <div className='bg-base-200 rounded-lg sm:rounded-xl shadow-lg sm:shadow-xl border-2 border-base-300 p-4 sm:p-6 lg:p-8 hover:shadow-xl sm:hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1'>
                    <div className='flex items-start justify-between mb-3 sm:mb-4 lg:mb-6'>
                        <div className='bg-green-600 p-2 sm:p-3 lg:p-4 rounded-lg sm:rounded-xl shadow-lg'>
                            <DollarSign size={20} className='text-white sm:hidden' />
                            <DollarSign size={24} className='text-white hidden sm:block lg:hidden' />
                            <DollarSign size={28} className='text-white hidden lg:block' />
                        </div>
                    </div>
                    <div>
                        <p className='text-base-content/60 text-xs sm:text-sm font-medium uppercase tracking-wide mb-1 sm:mb-2'>
                            Total Funding
                        </p>
                        <h2 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-base-content mb-1'>
                            ${totalFunding.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </h2>
                        <p className='text-base-content/50 text-xs sm:text-sm'>Funds collected</p>
                    </div>
                    <div className='mt-3 sm:mt-4 lg:mt-6 pt-3 sm:pt-4 lg:pt-6 border-t-2 border-base-300'>
                        <div className='flex items-center text-green-600 dark:text-green-400 text-xs sm:text-sm font-semibold'>
                            <span className='mr-1'>↑</span> Growing
                        </div>
                    </div>
                </div>

                {/* Total Blood Donation Requests Card */}
                <div className='bg-base-200 rounded-lg sm:rounded-xl shadow-lg sm:shadow-xl border-2 border-base-300 p-4 sm:p-6 lg:p-8 hover:shadow-xl sm:hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 sm:col-span-2 lg:col-span-1'>
                    <div className='flex items-start justify-between mb-3 sm:mb-4 lg:mb-6'>
                        <div className='bg-red-600 p-2 sm:p-3 lg:p-4 rounded-lg sm:rounded-xl shadow-lg'>
                            <MdBloodtype size={20} className='text-white sm:hidden' />
                            <MdBloodtype size={24} className='text-white hidden sm:block lg:hidden' />
                            <MdBloodtype size={28} className='text-white hidden lg:block' />
                        </div>
                    </div>
                    <div>
                        <p className='text-base-content/60 text-xs sm:text-sm font-medium uppercase tracking-wide mb-1 sm:mb-2'>
                            Blood Requests
                        </p>
                        <h2 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-base-content mb-1'>
                            {formatCount(totalRequests)}
                        </h2>
                        <p className='text-base-content/50 text-xs sm:text-sm'>Total requests</p>
                    </div>
                    <div className='mt-3 sm:mt-4 lg:mt-6 pt-3 sm:pt-4 lg:pt-6 border-t-2 border-base-300'>
                        <div className='flex items-center text-blue-600 dark:text-blue-400 text-xs sm:text-sm font-semibold'>
                            <span className='mr-1'>📋</span> Tracking
                        </div>
                    </div>
                </div>
            </div>

            {/* Charts Section */}
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto mb-6 sm:mb-8 lg:mb-12 px-2'>
                {/* Request Status Distribution Chart */}
                <div className='bg-base-200 rounded-lg sm:rounded-xl shadow-lg sm:shadow-xl border-2 border-base-300 p-4 sm:p-6 lg:col-span-2'>
                    <h3 className='text-base sm:text-lg font-bold text-base-content mb-4 sm:mb-6 flex items-center gap-2'>
                        <TrendingUp className='text-red-600' size={20} />
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
                                <div className='w-20 sm:w-24 lg:w-32 bg-base-300 rounded-full h-2 sm:h-3'>
                                    <div 
                                        className='bg-yellow-500 h-2 sm:h-3 rounded-full transition-all duration-500' 
                                        style={{ width: `${totalRequests > 0 ? (requestStats.pending / totalRequests) * 100 : 0}%` }}
                                    ></div>
                                </div>
                                <span className='text-base-content font-bold w-6 sm:w-8 text-sm sm:text-base'>{requestStats.pending}</span>
                            </div>
                        </div>
                        <div className='flex items-center justify-between'>
                            <div className='flex items-center gap-2 sm:gap-3'>
                                <div className='w-3 h-3 sm:w-4 sm:h-4 bg-blue-600 rounded'></div>
                                <span className='text-base-content font-medium text-sm sm:text-base'>In Progress</span>
                            </div>
                            <div className='flex items-center gap-2'>
                                <div className='w-20 sm:w-24 lg:w-32 bg-base-300 rounded-full h-2 sm:h-3'>
                                    <div 
                                        className='bg-blue-600 h-2 sm:h-3 rounded-full transition-all duration-500' 
                                        style={{ width: `${totalRequests > 0 ? (requestStats.inprogress / totalRequests) * 100 : 0}%` }}
                                    ></div>
                                </div>
                                <span className='text-base-content font-bold w-6 sm:w-8 text-sm sm:text-base'>{requestStats.inprogress}</span>
                            </div>
                        </div>
                        <div className='flex items-center justify-between'>
                            <div className='flex items-center gap-2 sm:gap-3'>
                                <div className='w-3 h-3 sm:w-4 sm:h-4 bg-green-600 rounded'></div>
                                <span className='text-base-content font-medium text-sm sm:text-base'>Completed</span>
                            </div>
                            <div className='flex items-center gap-2'>
                                <div className='w-20 sm:w-24 lg:w-32 bg-base-300 rounded-full h-2 sm:h-3'>
                                    <div 
                                        className='bg-green-600 h-2 sm:h-3 rounded-full transition-all duration-500' 
                                        style={{ width: `${totalRequests > 0 ? (requestStats.done / totalRequests) * 100 : 0}%` }}
                                    ></div>
                                </div>
                                <span className='text-base-content font-bold w-6 sm:w-8 text-sm sm:text-base'>{requestStats.done}</span>
                            </div>
                        </div>
                        <div className='flex items-center justify-between'>
                            <div className='flex items-center gap-2 sm:gap-3'>
                                <div className='w-3 h-3 sm:w-4 sm:h-4 bg-red-600 rounded'></div>
                                <span className='text-base-content font-medium text-sm sm:text-base'>Canceled</span>
                            </div>
                            <div className='flex items-center gap-2'>
                                <div className='w-20 sm:w-24 lg:w-32 bg-base-300 rounded-full h-2 sm:h-3'>
                                    <div 
                                        className='bg-red-600 h-2 sm:h-3 rounded-full transition-all duration-500' 
                                        style={{ width: `${totalRequests > 0 ? (requestStats.canceled / totalRequests) * 100 : 0}%` }}
                                    ></div>
                                </div>
                                <span className='text-base-content font-bold w-6 sm:w-8 text-sm sm:text-base'>{requestStats.canceled}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* System Overview */}
                <div className='bg-base-200 rounded-lg sm:rounded-xl shadow-lg sm:shadow-xl border-2 border-base-300 p-4 sm:p-6'>
                    <h3 className='text-base sm:text-lg font-bold text-base-content mb-4 sm:mb-6 flex items-center gap-2'>
                        <Calendar className='text-red-600' size={20} />
                        <span className='hidden sm:inline'>System Overview</span>
                        <span className='sm:hidden'>Overview</span>
                    </h3>
                    <div className='space-y-3 sm:space-y-4 lg:space-y-6'>
                        <div className='flex items-center justify-between p-3 sm:p-4 bg-base-100 rounded-lg border-2 border-base-300'>
                            <div>
                                <p className='text-base-content/60 text-xs sm:text-sm'>Total Users</p>
                                <p className='text-base-content font-bold text-lg sm:text-xl'>{totalUsers}</p>
                            </div>
                            <div className='text-red-500'>
                                <Users size={24} className='sm:hidden' />
                                <Users size={32} className='hidden sm:block' />
                            </div>
                        </div>
                        <div className='flex items-center justify-between p-3 sm:p-4 bg-base-100 rounded-lg border-2 border-base-300'>
                            <div>
                                <p className='text-base-content/60 text-xs sm:text-sm'>Success Rate</p>
                                <p className='text-base-content font-bold text-lg sm:text-xl'>
                                    {totalRequests > 0 ? Math.round((requestStats.done / totalRequests) * 100) : 0}%
                                </p>
                            </div>
                            <div className='text-green-600'>
                                <TrendingUp size={24} className='sm:hidden' />
                                <TrendingUp size={32} className='hidden sm:block' />
                            </div>
                        </div>
                        <div className='flex items-center justify-between p-3 sm:p-4 bg-base-100 rounded-lg border-2 border-base-300'>
                            <div>
                                <p className='text-base-content/60 text-xs sm:text-sm'>Lives Saved</p>
                                <p className='text-base-content font-bold text-lg sm:text-xl'>{requestStats.done}</p>
                            </div>
                            <div className='text-red-600'>
                                <MdBloodtype size={24} className='sm:hidden' />
                                <MdBloodtype size={32} className='hidden sm:block' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Data Tables Section */}
            <div className='grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto px-2'>
                {/* Recent Requests Table */}
                <div className='bg-base-200 rounded-lg sm:rounded-xl shadow-lg sm:shadow-xl border-2 border-base-300 p-4 sm:p-6'>
                    <h3 className='text-base sm:text-lg font-bold text-base-content mb-4 sm:mb-6 flex items-center gap-2'>
                        <FileText className='text-red-600' size={20} />
                        <span className='hidden sm:inline'>Recent Blood Requests</span>
                        <span className='sm:hidden'>Recent Requests</span>
                    </h3>
                    
                    {loading ? (
                        <div className='flex justify-center items-center py-6 sm:py-8'>
                            <span className="loading loading-spinner loading-md sm:loading-lg text-red-600"></span>
                        </div>
                    ) : recentRequests.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="table table-xs sm:table-sm w-full bg-base-100 border-2 border-base-300 rounded-lg">
                                <thead>
                                    <tr className="bg-base-300">
                                        <th className="border-2 border-base-300 px-2 sm:px-3 py-2 text-left font-bold text-base-content text-xs">Recipient</th>
                                        <th className="border-2 border-base-300 px-2 sm:px-3 py-2 text-left font-bold text-base-content text-xs">Blood</th>
                                        <th className="border-2 border-base-300 px-2 sm:px-3 py-2 text-left font-bold text-base-content text-xs">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentRequests.map((request) => (
                                        <tr key={request._id} className="hover:bg-base-200/50">
                                            <td className="border-2 border-base-300 px-2 sm:px-3 py-2 font-semibold text-base-content text-xs">{request.recipientName}</td>
                                            <td className="border-2 border-base-300 px-2 sm:px-3 py-2 font-bold text-red-600 dark:text-red-400 text-xs">{request.bloodGroup}</td>
                                            <td className="border-2 border-base-300 px-2 sm:px-3 py-2 text-xs">
                                                <span className={`px-1 sm:px-2 py-1 rounded-full text-xs font-bold ${
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
                    ) : (
                        <div className='text-center py-6 sm:py-8'>
                            <FileText size={40} className='text-base-content/30 mx-auto mb-3 sm:hidden' />
                            <FileText size={48} className='text-base-content/30 mx-auto mb-3 hidden sm:block' />
                            <p className='text-base-content/60 font-medium text-sm sm:text-base'>No recent requests</p>
                        </div>
                    )}
                </div>

                {/* Recent Users Table */}
                <div className='bg-base-200 rounded-lg sm:rounded-xl shadow-lg sm:shadow-xl border-2 border-base-300 p-4 sm:p-6'>
                    <h3 className='text-base sm:text-lg font-bold text-base-content mb-4 sm:mb-6 flex items-center gap-2'>
                        <UserCheck className='text-red-600' size={20} />
                        Recent Users
                    </h3>
                    
                    {loading ? (
                        <div className='flex justify-center items-center py-6 sm:py-8'>
                            <span className="loading loading-spinner loading-md sm:loading-lg text-red-600"></span>
                        </div>
                    ) : recentUsers.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="table table-xs sm:table-sm w-full bg-base-100 border-2 border-base-300 rounded-lg">
                                <thead>
                                    <tr className="bg-base-300">
                                        <th className="border-2 border-base-300 px-2 sm:px-3 py-2 text-left font-bold text-base-content text-xs">Name</th>
                                        <th className="border-2 border-base-300 px-2 sm:px-3 py-2 text-left font-bold text-base-content text-xs">Role</th>
                                        <th className="border-2 border-base-300 px-2 sm:px-3 py-2 text-left font-bold text-base-content text-xs">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentUsers.map((user) => (
                                        <tr key={user._id} className="hover:bg-base-200/50">
                                            <td className="border-2 border-base-300 px-2 sm:px-3 py-2 font-semibold text-base-content text-xs">{user.name}</td>
                                            <td className="border-2 border-base-300 px-2 sm:px-3 py-2 font-semibold text-base-content text-xs capitalize">{user.role}</td>
                                            <td className="border-2 border-base-300 px-2 sm:px-3 py-2 text-xs">
                                                <span className={`px-1 sm:px-2 py-1 rounded-full text-xs font-bold ${
                                                    user.status === 'active' ? 'text-green-600 dark:text-green-400' :
                                                    'text-red-600 dark:text-red-400'
                                                }`}>
                                                    {user.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className='text-center py-6 sm:py-8'>
                            <UserCheck size={40} className='text-base-content/30 mx-auto mb-3 sm:hidden' />
                            <UserCheck size={48} className='text-base-content/30 mx-auto mb-3 hidden sm:block' />
                            <p className='text-base-content/60 font-medium text-sm sm:text-base'>No recent users</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;