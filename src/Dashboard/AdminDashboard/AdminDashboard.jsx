import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { Users, DollarSign, TrendingUp, Calendar, FileText, UserCheck } from 'lucide-react';
import { MdBloodtype } from "react-icons/md";
import { Card } from '../../Components/UI';
import { SPACING, TYPOGRAPHY, LAYOUT } from '../../styles/designSystem';
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
        const fetchData = async () => {
            try {
                const usersRes = await axiosSecure.get('/users?page=0&size=1000');
                const donors = usersRes.data.users?.filter(u => u.role?.toLowerCase() === 'donor') || [];
                setTotalUsers(donors.length);
                setRecentUsers(usersRes.data.users?.slice(0, 5) || []);
                const paymentsRes = await axiosSecure.get('/payment?page=0&size=1000');
                const total = paymentsRes.data.requests?.reduce(
                    (sum, payment) => sum + Number(payment.amount || 0), 
                    0
                ) || 0;
                setTotalFunding(total);
                const requestsRes = await axiosSecure.get('/requests?page=0&size=1000');
                const requests = requestsRes.data.requests || [];
                setTotalRequests(requests.length);
                setRecentRequests(requests.slice(0, 5));
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
        <div className='mt-4 mb-3 bg-base-100 p-1 sm:p-3 md:p-4'>
            <h1 className={`${TYPOGRAPHY.heading.h2} font-bold text-center ${SPACING.marginXl} px-1 sm:px-2`}>
                Welcome, <span className='text-base-content font-extrabold'>{userData?.name}</span>! 
                Manage and oversee the life-saving mission.
            </h1>
            {/* Stats Cards */}
            <div className={`${LAYOUT.grid.stats} ${LAYOUT.container} ${SPACING.marginXl}`}>
                {/* Total Donors Card */}
                <Card interactive className='hover:-translate-y-1 transform transition-all duration-300'>
                    <div className='flex items-start justify-between mb-5 sm:mb-6 md:mb-8'>
                        <div className='bg-red-500 p-4 sm:p-5 md:p-6 rounded-xl shadow-lg'>
                            <Users size={28} className='text-white sm:hidden' />
                            <Users size={32} className='text-white hidden sm:block md:hidden' />
                            <Users size={36} className='text-white hidden md:block' />
                        </div>
                    </div>
                    <div>
                        <p className='text-base-content/60 text-sm sm:text-base font-medium uppercase tracking-wide mb-3'>
                            Total Donors
                        </p>
                        <h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-base-content mb-2'>
                            {formatCount(totalUsers)}
                        </h2>
                        <p className='text-base-content/50 text-sm sm:text-base'>Registered users</p>
                    </div>
                    <div className='mt-5 sm:mt-6 md:mt-8 pt-5 sm:pt-6 md:pt-8 border-t-2 border-base-300'>
                        <div className='flex items-center text-green-600 dark:text-green-400 text-sm sm:text-base font-semibold'>
                            <span className='mr-2'>●</span> Active
                        </div>
                    </div>
                </Card>
                {/* Lives Saved Card */}
                <Card interactive className='hover:-translate-y-1 transform transition-all duration-300'>
                    <div className='flex items-start justify-between mb-5 sm:mb-6 md:mb-8'>
                        <div className='bg-gradient-to-br from-red-500 to-red-600 p-4 sm:p-5 md:p-6 rounded-xl shadow-lg'>
                            <MdBloodtype size={28} className='text-white sm:hidden' />
                            <MdBloodtype size={32} className='text-white hidden sm:block md:hidden' />
                            <MdBloodtype size={36} className='text-white hidden md:block' />
                        </div>
                    </div>
                    <div>
                        <p className='text-base-content/60 text-sm sm:text-base font-medium uppercase tracking-wide mb-3'>
                            Lives Saved
                        </p>
                        <h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-red-600 dark:text-red-400 mb-2'>
                            {formatCount(requestStats.done)}
                        </h2>
                        <p className='text-base-content/50 text-sm sm:text-base'>Successful donations</p>
                    </div>
                    <div className='mt-5 sm:mt-6 md:mt-8 pt-5 sm:pt-6 md:pt-8 border-t-2 border-base-300'>
                        <div className='flex items-center text-red-600 dark:text-red-400 text-sm sm:text-base font-semibold'>
                            <span className='mr-2'>❤️</span> Life-saving impact
                        </div>
                    </div>
                </Card>
                {/* Total Funding Card */}
                <Card interactive className='hover:-translate-y-1 transform transition-all duration-300'>
                    <div className='flex items-start justify-between mb-5 sm:mb-6 md:mb-8'>
                        <div className='bg-green-600 p-4 sm:p-5 md:p-6 rounded-xl shadow-lg'>
                            <DollarSign size={28} className='text-white sm:hidden' />
                            <DollarSign size={32} className='text-white hidden sm:block md:hidden' />
                            <DollarSign size={36} className='text-white hidden md:block' />
                        </div>
                    </div>
                    <div>
                        <p className='text-base-content/60 text-sm sm:text-base font-medium uppercase tracking-wide mb-3'>
                            Total Funding
                        </p>
                        <h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-base-content mb-2'>
                            ${totalFunding.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </h2>
                        <p className='text-base-content/50 text-sm sm:text-base'>Funds collected</p>
                    </div>
                    <div className='mt-5 sm:mt-6 md:mt-8 pt-5 sm:pt-6 md:pt-8 border-t-2 border-base-300'>
                        <div className='flex items-center text-green-600 dark:text-green-400 text-sm sm:text-base font-semibold'>
                            <span className='mr-2'>↑</span> Growing
                        </div>
                    </div>
                </Card>
                {/* Blood Requests Card */}
                <Card interactive className='hover:-translate-y-1 transform transition-all duration-300'>
                    <div className='flex items-start justify-between mb-5 sm:mb-6 md:mb-8'>
                        <div className='bg-blue-600 p-4 sm:p-5 md:p-6 rounded-xl shadow-lg'>
                            <FileText size={28} className='text-white sm:hidden' />
                            <FileText size={32} className='text-white hidden sm:block md:hidden' />
                            <FileText size={36} className='text-white hidden md:block' />
                        </div>
                    </div>
                    <div>
                        <p className='text-base-content/60 text-sm sm:text-base font-medium uppercase tracking-wide mb-3'>
                            Blood Requests
                        </p>
                        <h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-base-content mb-2'>
                            {formatCount(totalRequests)}
                        </h2>
                        <p className='text-base-content/50 text-sm sm:text-base'>Total requests</p>
                    </div>
                    <div className='mt-5 sm:mt-6 md:mt-8 pt-5 sm:pt-6 md:pt-8 border-t-2 border-base-300'>
                        <div className='flex items-center text-blue-600 dark:text-blue-400 text-sm sm:text-base font-semibold'>
                            <span className='mr-2'>📋</span> Tracking
                        </div>
                    </div>
                </Card>
            </div>
            {/* Charts and Analytics */}
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 max-w-7xl mx-auto mb-6 sm:mb-8 md:mb-12 px-2 sm:px-4'>
                {/* Request Status Distribution */}
                <Card className='lg:col-span-2'>
                    <h3 className={`${TYPOGRAPHY.heading.h4} mb-4 sm:mb-6 flex items-center gap-2`}>
                        <TrendingUp className='text-red-600' size={18} />
                        <span className='hidden sm:inline'>Request Status Distribution</span>
                        <span className='sm:hidden'>Status Distribution</span>
                    </h3>
                    <div className='space-y-4'>
                        <div className='space-y-2'>
                            <div className='flex items-center justify-between mb-1'>
                                <div className='flex items-center gap-2'>
                                    <div className='w-3 h-3 bg-yellow-500 rounded'></div>
                                    <span className='text-base-content font-medium text-sm'>Pending</span>
                                </div>
                                <span className='text-base-content font-bold text-sm'>{requestStats.pending}</span>
                            </div>
                            <div className='w-full bg-base-300 rounded-full h-2'>
                                <div 
                                    className='bg-yellow-500 h-2 rounded-full transition-all duration-500' 
                                    style={{ width: `${totalRequests > 0 ? (requestStats.pending / totalRequests) * 100 : 0}%` }}
                                ></div>
                            </div>
                        </div>
                        
                        <div className='space-y-2'>
                            <div className='flex items-center justify-between mb-1'>
                                <div className='flex items-center gap-2'>
                                    <div className='w-3 h-3 bg-blue-600 rounded'></div>
                                    <span className='text-base-content font-medium text-sm'>In Progress</span>
                                </div>
                                <span className='text-base-content font-bold text-sm'>{requestStats.inprogress}</span>
                            </div>
                            <div className='w-full bg-base-300 rounded-full h-2'>
                                <div 
                                    className='bg-blue-600 h-2 rounded-full transition-all duration-500' 
                                    style={{ width: `${totalRequests > 0 ? (requestStats.inprogress / totalRequests) * 100 : 0}%` }}
                                ></div>
                            </div>
                        </div>
                        
                        <div className='space-y-2'>
                            <div className='flex items-center justify-between mb-1'>
                                <div className='flex items-center gap-2'>
                                    <div className='w-3 h-3 bg-green-600 rounded'></div>
                                    <span className='text-base-content font-medium text-sm'>Completed</span>
                                </div>
                                <span className='text-base-content font-bold text-sm'>{requestStats.done}</span>
                            </div>
                            <div className='w-full bg-base-300 rounded-full h-2'>
                                <div 
                                    className='bg-green-600 h-2 rounded-full transition-all duration-500' 
                                    style={{ width: `${totalRequests > 0 ? (requestStats.done / totalRequests) * 100 : 0}%` }}
                                ></div>
                            </div>
                        </div>
                        
                        <div className='space-y-2'>
                            <div className='flex items-center justify-between mb-1'>
                                <div className='flex items-center gap-2'>
                                    <div className='w-3 h-3 bg-red-600 rounded'></div>
                                    <span className='text-base-content font-medium text-sm'>Canceled</span>
                                </div>
                                <span className='text-base-content font-bold text-sm'>{requestStats.canceled}</span>
                            </div>
                            <div className='w-full bg-base-300 rounded-full h-2'>
                                <div 
                                    className='bg-red-600 h-2 rounded-full transition-all duration-500' 
                                    style={{ width: `${totalRequests > 0 ? (requestStats.canceled / totalRequests) * 100 : 0}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </Card>
                {/* System Overview */}
                <Card className=''>
                    <h3 className={`${TYPOGRAPHY.heading.h4} mb-4 sm:mb-6 flex items-center gap-2`}>
                        <Calendar className='text-red-600' size={18} />
                        <span className='hidden sm:inline'>System Overview</span>
                        <span className='sm:hidden'>Overview</span>
                    </h3>
                    <div className='space-y-4 sm:space-y-6'>
                        <div className='flex items-center justify-between p-3 sm:p-4 bg-base-100 rounded-xl border-2 border-base-300'>
                            <div>
                                <p className='text-base-content/60 text-xs sm:text-sm'>Total Users</p>
                                <p className='text-base-content font-bold text-lg sm:text-xl'>{totalUsers}</p>
                            </div>
                            <div className='text-red-500'>
                                <Users size={24} className='sm:hidden' />
                                <Users size={32} className='hidden sm:block' />
                            </div>
                        </div>
                        <div className='flex items-center justify-between p-3 sm:p-4 bg-base-100 rounded-xl border-2 border-base-300'>
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
                        <div className='flex items-center justify-between p-3 sm:p-4 bg-base-100 rounded-xl border-2 border-base-300'>
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
                </Card>
            </div>
            {/* Data Tables */}
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-6 max-w-7xl mx-auto px-2 sm:px-4'>
                {/* Recent Blood Requests */}
                <Card className=''>
                    <h3 className={`${TYPOGRAPHY.heading.h4} mb-4 sm:mb-6 flex items-center gap-2`}>
                        <FileText className='text-red-600' size={18} />
                        <span className='hidden sm:inline'>Recent Blood Requests</span>
                        <span className='sm:hidden'>Recent Requests</span>
                    </h3>
                    {loading ? (
                        <div className='flex justify-center items-center py-8'>
                            <span className="loading loading-spinner loading-lg text-red-600"></span>
                        </div>
                    ) : recentRequests.length > 0 ? (
                        <>
                            {/* Desktop Table View */}
                            <div className="hidden md:block overflow-x-auto">
                                <table className="table table-sm w-full bg-base-100 border-2 border-base-300 rounded-xl">
                                    <thead>
                                        <tr className="bg-base-300">
                                            <th className="border-2 border-base-300 px-3 py-2 text-left font-bold text-base-content text-xs">Recipient</th>
                                            <th className="border-2 border-base-300 px-3 py-2 text-left font-bold text-base-content text-xs">Blood</th>
                                            <th className="border-2 border-base-300 px-3 py-2 text-left font-bold text-base-content text-xs">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {recentRequests.map((request) => (
                                            <tr key={request._id} className="hover:bg-base-200/50">
                                                <td className="border-2 border-base-300 px-3 py-2 font-semibold text-base-content text-xs">{request.recipientName}</td>
                                                <td className="border-2 border-base-300 px-3 py-2 font-bold text-red-600 dark:text-red-400 text-xs">{request.bloodGroup}</td>
                                                <td className="border-2 border-base-300 px-3 py-2 text-xs">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                                                        request.donation_status === 'done' ? 'text-green-600 dark:text-green-400' :
                                                        request.donation_status === 'pending' ? 'text-yellow-600 dark:text-yellow-400' :
                                                        request.donation_status === 'inprogress' ? 'text-blue-600 dark:text-blue-400' :
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
                            
                            {/* Mobile Card View */}
                            <div className="md:hidden space-y-3">
                                {recentRequests.map((request) => (
                                    <div key={request._id} className="bg-base-200 border border-base-300 rounded-lg p-3">
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="font-semibold text-base-content text-sm">{request.recipientName}</h4>
                                            <span className="font-bold text-red-600 dark:text-red-400 text-sm">{request.bloodGroup}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-base-content/60 text-xs">Status:</span>
                                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                                                request.donation_status === 'done' ? 'text-green-600 dark:text-green-400' :
                                                request.donation_status === 'pending' ? 'text-yellow-600 dark:text-yellow-400' :
                                                request.donation_status === 'inprogress' ? 'text-blue-600 dark:text-blue-400' :
                                                'text-red-600 dark:text-red-400'
                                            }`}>
                                                {request.donation_status}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className='text-center py-8'>
                            <FileText size={48} className='text-base-content/30 mx-auto mb-3' />
                            <p className='text-base-content/60 font-medium'>No recent requests</p>
                        </div>
                    )}
                </Card>
                {/* Recent Users */}
                <Card className=''>
                    <h3 className={`${TYPOGRAPHY.heading.h4} mb-4 sm:mb-6 flex items-center gap-2`}>
                        <UserCheck className='text-red-600' size={18} />
                        Recent Users
                    </h3>
                    {loading ? (
                        <div className='flex justify-center items-center py-8'>
                            <span className="loading loading-spinner loading-lg text-red-600"></span>
                        </div>
                    ) : recentUsers.length > 0 ? (
                        <>
                            {/* Desktop Table View */}
                            <div className="hidden md:block overflow-x-auto">
                                <table className="table table-sm w-full bg-base-100 border-2 border-base-300 rounded-xl">
                                    <thead>
                                        <tr className="bg-base-300">
                                            <th className="border-2 border-base-300 px-3 py-2 text-left font-bold text-base-content text-xs">Name</th>
                                            <th className="border-2 border-base-300 px-3 py-2 text-left font-bold text-base-content text-xs">Role</th>
                                            <th className="border-2 border-base-300 px-3 py-2 text-left font-bold text-base-content text-xs">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {recentUsers.map((user) => (
                                            <tr key={user._id} className="hover:bg-base-200/50">
                                                <td className="border-2 border-base-300 px-3 py-2 font-semibold text-base-content text-xs">{user.name}</td>
                                                <td className="border-2 border-base-300 px-3 py-2 font-semibold text-base-content text-xs capitalize">{user.role}</td>
                                                <td className="border-2 border-base-300 px-3 py-2 text-xs">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${
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
                            
                            {/* Mobile Card View */}
                            <div className="md:hidden space-y-3">
                                {recentUsers.map((user) => (
                                    <div key={user._id} className="bg-base-200 border border-base-300 rounded-lg p-3">
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="font-semibold text-base-content text-sm">{user.name}</h4>
                                            <span className="text-base-content/60 text-xs capitalize">{user.role}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-base-content/60 text-xs">Status:</span>
                                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                                                user.status === 'active' ? 'text-green-600 dark:text-green-400' :
                                                'text-red-600 dark:text-red-400'
                                            }`}>
                                                {user.status}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className='text-center py-8'>
                            <UserCheck size={48} className='text-base-content/30 mx-auto mb-3' />
                            <p className='text-base-content/60 font-medium'>No recent users</p>
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
};
export default AdminDashboard;