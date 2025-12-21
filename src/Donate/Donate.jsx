import React, { useContext, useEffect, useState } from 'react';
import useAxios from '../Hooks/useAxios'
import { AuthContext } from '../Provider/AuthProvider';
import useAxiosSecure from '../Hooks/useAxiosSecure';

const Donate = () => {
    const axiosInstance = useAxios();
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const [payments, setPayments] = useState([]);
    const [showForm, setShowForm] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const donateAmount = e.target.donateAmount.value;
        const donorEmail = user?.email;
        const donorName = user?.displayName;
        const formData = {
            donateAmount,
            donorEmail,
            donorName
        }
        axiosInstance.post('/create-payment-checkout', formData)
            .then(res => {
                console.log(res.data);
                if (res.data.url) {
                    window.location.href = res.data.url;
                }
            })
            .catch(err => {
                console.error('Error:', err);
            });
    }

    useEffect(() => {
        if (!user?.email) return;

        axiosSecure.get('/payment')
            .then(res => {
                setPayments(res.data.requests);
            })
            .catch(err => {
                console.error(err);
            });
    }, [user, axiosSecure]);

    // Calculate total donation amount
    const totalDonations = payments.reduce((sum, payment) => sum + Number(payment.amount), 0);

    return (
        <div className="p-6 bg-base-200 min-h-screen">

            <div className="mb-6 text-center">
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="btn bg-red-500 text-white"
                >
                    Give Fund
                </button>
            </div>

            {showForm && (
                <div className="flex justify-center mb-8">
                    <form onSubmit={handleSubmit} className="flex gap-2">
                        <input
                            type="number"
                            name="donateAmount"
                            placeholder="Enter fund amount"
                            className="input input-bordered"
                            required
                        />
                        <button className="btn bg-red-500 text-white">
                            Donate Now
                        </button>
                    </form>
                </div>
            )}

            <div className="mb-4 text-left font-bold text-lg">
                Total Donations: ${totalDonations}
            </div>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th className="border border-gray-300">#</th>
                            <th className="border border-gray-300">Donor Name</th>
                            <th className="border border-gray-300">Fund Amount</th>
                            <th className="border border-gray-300">Funding Date</th>
                            <th className="border border-gray-300">Transaction Id</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((payment, index) => (
                            <tr key={payment._id}>
                                <th className="border border-gray-300">{index + 1}</th>
                                <td className="border border-gray-300">{payment.donorName}</td>
                                <td className="border border-gray-300">${payment.amount}</td>
                                <td className="border border-gray-300">
                                    {new Date(payment.paidAt).toLocaleDateString()}
                                </td>
                                <td className="border border-gray-300">{payment.transactionId}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default Donate;
