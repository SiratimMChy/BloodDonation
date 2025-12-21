import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { Users, DollarSign } from 'lucide-react';
import { MdBloodtype } from "react-icons/md";

const AdminDashboard = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [userData, setUserData] = useState(null);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalFunding, setTotalFunding] = useState(0);
    const [totalRequests, setTotalRequests] = useState(0);

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
        axiosSecure.get('/users')
            .then(res => {
                const donors = res.data.filter(u => u.role?.toLowerCase() === 'donor');
                setTotalUsers(donors.length);
            })
            .catch(err => {
                console.error('Error fetching users:', err);
            });
    }, [axiosSecure]);

    useEffect(() => {
        axiosSecure.get('/payment?page=0&size=1000')
            .then(res => {
                const total = res.data.requests?.reduce(
                    (sum, payment) => sum + Number(payment.amount || 0), 
                    0
                ) || 0;
                setTotalFunding(total);
            })
            .catch(err => {
                console.error('Error fetching payments:', err);
            });
    }, [axiosSecure]);

    useEffect(() => {
        axiosSecure.get('/requests?page=0&size=1')
            .then(res => {
                setTotalRequests(res.data.totalRequests || 0);
            })
            .catch(err => {
                console.error('Error fetching requests:', err);
            });
    }, [axiosSecure]);

    return (
        <div className='mt-8 mb-3'>
            <h1 className="font-bold text-center text-xl md:text-3xl text-gray-700 mb-12">
                Welcome, <span className='text-black font-extrabold'>{userData?.name}</span>! 
                Manage and oversee the life-saving mission.
            </h1>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4'>
                {/* Total Donors Card */}
                <div className='bg-white rounded-xl shadow-xl border border-gray-100 p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1'>
                    <div className='flex items-start justify-between mb-6'>
                        <div className='bg-linear-to-br from-blue-500 to-blue-600 p-4 rounded-xl shadow-lg'>
                            <Users size={28} className='text-white' />
                        </div>
                    </div>
                    <div>
                        <p className='text-gray-500 text-sm font-medium uppercase tracking-wide mb-2'>
                            Total Donors
                        </p>
                        <h2 className='text-2xl md:text-5xl font-bold text-gray-800 mb-1'>
                            {totalUsers}
                        </h2>
                        <p className='text-gray-400 text-sm'>Registered users</p>
                    </div>
                    <div className='mt-6 pt-6 border-t border-gray-100'>
                        <div className='flex items-center text-green-600 text-sm font-semibold'>
                            <span className='mr-1'>●</span> Active
                        </div>
                    </div>
                </div>

                {/* Total Funding Card */}
                <div className='bg-white rounded-xl shadow-xl border border-gray-100 p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1'>
                    <div className='flex items-start justify-between mb-6'>
                        <div className='bg-linear-to-br from-green-500 to-green-600 p-4 rounded-xl shadow-lg'>
                            <DollarSign size={28} className='text-white' />
                        </div>
                    </div>
                    <div>
                        <p className='text-gray-500 text-sm font-medium uppercase tracking-wide mb-2'>
                            Total Funding
                        </p>
                        <h2 className='text-2xl md:text-5xl font-bold text-gray-800 mb-1'>
                            ${totalFunding.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </h2>
                        <p className='text-gray-400 text-sm'>Funds collected</p>
                    </div>
                    <div className='mt-6 pt-6 border-t border-gray-100'>
                        <div className='flex items-center text-green-600 text-sm font-semibold'>
                            <span className='mr-1'>↑</span> Growing
                        </div>
                    </div>
                </div>

                {/* Total Blood Donation Requests Card */}
                <div className='bg-white rounded-xl shadow-xl border border-gray-100 p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1'>
                    <div className='flex items-start justify-between mb-6'>
                        <div className='bg-linear-to-br from-red-500 to-red-600 p-4 rounded-xl shadow-lg'>
                            <MdBloodtype size={28} className='text-white' />
                        </div>
                    </div>
                    <div>
                        <p className='text-gray-500 text-sm font-medium uppercase tracking-wide mb-2'>
                            Blood Requests
                        </p>
                        <h2 className='text-2xl md:text-5xl font-bold text-gray-800 mb-1'>
                            {totalRequests}
                        </h2>
                        <p className='text-gray-400 text-sm'>Total requests</p>
                    </div>
                    <div className='mt-6 pt-6 border-t border-gray-100'>
                        <div className='flex items-center text-blue-600 text-sm font-semibold'>
                            <span className='mr-1'>📋</span> Tracking
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;