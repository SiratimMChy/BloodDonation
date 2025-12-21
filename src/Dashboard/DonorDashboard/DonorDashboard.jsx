import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const DonorDashboard = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [userData, setUserData] = useState(null);
    const [myRequests, setMyRequests] = useState([]);
    const [loading, setLoading] = useState(true);

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

            // Fetch user's recent donation requests
            axiosSecure.get('/my-recent-requests')
                .then(response => {
                    setMyRequests(response.data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error('Error fetching requests:', err);
                    setLoading(false);
                });
        }
    }, [user, axiosSecure]);

    return (
        <div className=' mt-8 mb-3'>
            <h1 className="font-bold text-center text-3xl text-gray-700 mb-8">Welcome, <span className='text-black font-extrabold'>{userData?.name}</span>! Your kindness helps save lives every day.</h1>
            <h2 className='text-2xl font-bold text-center mb-2'>Recent Donation Requests</h2>
            {!loading && myRequests.length > 0 && (

                <div className="overflow-x-auto">
                    <table className="table table-xs">
                        <thead>
                            <tr>
                                <th className="border border-gray-300">#</th>
                                <th className="border border-gray-300">Recipient Name</th>
                                <th className="border border-gray-300">Blood Group</th>
                                <th className="border border-gray-300">Hospital</th>
                                <th className="border border-gray-300">Location</th>
                                <th className="border border-gray-300">Donation Date</th>
                                <th className="border border-gray-300">Mobile</th>
                                <th className="border border-gray-300">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                myRequests.map((request, index) =>
                                    <tr key={myRequests._id}>
                                        <th className="border border-gray-300">{(index + 1)}</th>
                                        <td className="border border-gray-300">{request.recipientName}</td>
                                        <td className="border border-gray-300 text-red-600 font-bold">{request.bloodGroup}</td>
                                        <td className="border border-gray-300">{request.hospitalName}</td>
                                        <td className="border border-gray-300">{request.fullAddress}</td>
                                        <td className="border border-gray-300">{request.donationDate}</td>
                                        <td className="border border-gray-300" >{request.mobile}</td>
                                        <td className="border border-gray-300">{request.donation_status}</td>
                                    </tr>
                                )
                            }
                        </tbody>

                    </table>
                </div>
            )}
        </div>
    );
};

export default DonorDashboard;
