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
        <div className="p-6 bg-base-100 min-h-screen">

            <div className="mb-6 text-center">
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
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
                            className="px-4 py-2 border-2 border-base-300 rounded-lg bg-base-200 text-base-content placeholder-base-content/50 focus:border-red-500 focus:outline-none font-semibold"
                            required
                        />
                        <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200">
                            Donate Now
                        </button>
                    </form>
                </div>
            )}

            <div className="mb-4 text-left font-bold text-xl bg-base-200 p-4 rounded-lg border-2 border-base-300">
                <span className="text-base-content">Total Donations: </span>
                <span className="text-green-600 dark:text-green-400">${totalDonations}</span>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full bg-base-200 border-2 border-base-300 rounded-lg shadow-lg">
                    <thead>
                        <tr className="bg-base-300">
                            <th className="border-2 border-base-300 px-4 py-3 text-left font-bold text-base-content">#</th>
                            <th className="border-2 border-base-300 px-4 py-3 text-left font-bold text-base-content">Donor Name</th>
                            <th className="border-2 border-base-300 px-4 py-3 text-left font-bold text-base-content">Fund Amount</th>
                            <th className="border-2 border-base-300 px-4 py-3 text-left font-bold text-base-content">Funding Date</th>
                            <th className="border-2 border-base-300 px-4 py-3 text-left font-bold text-base-content">Transaction Id</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((payment, index) => (
                            <tr key={payment._id} className="hover:bg-base-300/50">
                                <td className="border-2 border-base-300 px-4 py-3 font-semibold text-base-content">{index + 1}</td>
                                <td className="border-2 border-base-300 px-4 py-3 font-semibold text-base-content">{payment.donorName}</td>
                                <td className="border-2 border-base-300 px-4 py-3 font-semibold text-green-600 dark:text-green-400">${payment.amount}</td>
                                <td className="border-2 border-base-300 px-4 py-3 font-semibold text-base-content">
                                    {new Date(payment.paidAt).toLocaleDateString()}
                                </td>
                                <td className="border-2 border-base-300 px-4 py-3 font-mono text-sm text-blue-600 dark:text-blue-400">{payment.transactionId}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default Donate;