import { Droplet } from 'lucide-react';
import React, { useEffect } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import axios from 'axios';
import { useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const AddRequest = () => {
    const { user } = useContext(AuthContext);
    const [upazilas, setUpazilas] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [district, setDistrict] = useState('');
    const [upazila, setUpazila] = useState('');


    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        axios.get('/upazila.json')
            .then(res => {
                setUpazilas(res.data.upazilas);
            });


        axios.get('/district.json')
            .then(res => {
                setDistricts(res.data.districts);
            });


    }, []);

    const handleRequest = (e) => {
        e.preventDefault();
        const form = e.target;
        const requesterName = form.requesterName.value;
        const requesterEmail = form.requesterEmail.value;
        const recipientName = form.recipientName.value;
        const recipientDistrict = form.recipientDistrict.value;
        const recipientUpazila = form.recipientUpazila.value;
        const hospitalName = form.hospitalName.value;
        const fullAddress = form.fullAddress.value;
        const bloodGroup = form.bloodGroup.value;
        const donationDate = form.donationDate.value;
        const donationTime = form.donationTime.value;
        const requestMessage = form.requestMessage.value;
        const mobile = form.mobile.value;

        const formData = {
            requesterName,
            requesterEmail,
            recipientName,
            recipientDistrict,
            recipientUpazila,
            hospitalName,
            fullAddress,
            bloodGroup,
            donationDate,
            donationTime,
            requestMessage,
            mobile,
            donation_status: 'pending'
        }

        axiosSecure.post('/requests', formData)
            .then(res => {
                alert(res.data.insertedId);
            })
            .catch(err => {
                console.log(err);
            });

    }


    return (
        <div className="min-h-screen  flex items-start sm:items-center justify-center px-3 sm:px-6 py-6">
            <div className="w-full max-w-3xl bg-white rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg p-4 sm:p-6 md:p-8">
                <h2 className="flex items-center justify-center gap-1 text-sm sm:text-2xl font-semibold text-red-600 mb-6 text-center">
                    <Droplet className="text-red-600" size={28} />
                    Blood Donation Request
                </h2>

                <form onSubmit={handleRequest} className="space-y-4 sm:space-y-5">
                    {/* Requester Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Requester Name</label>
                            <input
                                name='requesterName'
                                type="text"
                                readOnly
                                value={user?.displayName}
                                className="w-full rounded-lg border border-gray-300 bg-gray-100 px-3 sm:px-4 py-2 text-gray-700 cursor-not-allowed text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Requester Email</label>
                            <input
                                name='requesterEmail'
                                type="email"
                                readOnly
                                value={user?.email}
                                className="w-full rounded-lg border border-gray-300 bg-gray-100 px-3 sm:px-4 py-2 text-gray-700 cursor-not-allowed text-sm"
                            />
                        </div>
                    </div>

                    {/* Recipient Info */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Recipient Name</label>
                            <input
                                required
                                name='recipientName'
                                type="text"
                                placeholder="Enter recipient name"
                                className="input w-full rounded-lg border border-gray-300 px-3 sm:px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Recipient Mobile No</label>
                            <input
                                required
                                name='mobile'
                                type="text"
                                placeholder="Enter recipient Mobile No"
                                className="input w-full rounded-lg border border-gray-300 px-3 sm:px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                            />
                        </div>

                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Recipient District</label>
                            <select required name='recipientDistrict' value={district} onChange={(e) => setDistrict(e.target.value)} className="select w-full rounded-lg border border-gray-300 px-3 sm:px-4 py-2 focus:ring-2 focus:ring-red-500 text-sm">
                                <option>Select district</option>
                                {
                                    districts.map(district => (
                                        <option key={district.id} value={district.name}>
                                            {district.name}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Recipient Upazila</label>
                            <select required name='recipientUpazila' value={upazila} onChange={(e) => setUpazila(e.target.value)} className="select w-full rounded-lg border border-gray-300 px-3 sm:px-4 py-2 focus:ring-2 focus:ring-red-500 text-sm">
                                <option>Select upazila</option>
                                {
                                    upazilas.map(upazila => (
                                        <option key={upazila.id} value={upazila.name}>
                                            {upazila.name}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>

                    {/* Hospital Info */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Hospital Name</label>
                        <input
                            required
                            type="text"
                            name='hospitalName'
                            placeholder="e.g. Dhaka Medical College Hospital"
                            className="input w-full rounded-lg border border-gray-300 px-3 sm:px-4 py-2 focus:ring-2 focus:ring-red-500 text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Address</label>
                        <input
                            name='fullAddress'
                            type="text"
                            placeholder="e.g. Zahir Raihan Rd, Dhaka"
                            required
                            className=" input w-full rounded-lg border border-gray-300 px-3 sm:px-4 py-2 focus:ring-2 focus:ring-red-500 text-sm"
                        />
                    </div>

                    {/* Blood Group */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Blood Group</label>
                        <select required name='bloodGroup' className="w-full select rounded-lg border border-gray-300 px-3 text-red-600 font-bold sm:px-4 py-2 focus:ring-2 focus:ring-red-500 text-sm">
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
                            <label className="block text-sm font-medium text-gray-700 mb-1">Donation Date</label>
                            <input
                                required
                                name='donationDate'
                                type="date"
                                className="input w-full rounded-lg border border-gray-300 px-3 sm:px-4 py-2 focus:ring-2 focus:ring-red-500 text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Donation Time</label>
                            <input
                                name='donationTime'
                                type="time"
                                className="input w-full rounded-lg border border-gray-300 px-3 sm:px-4 py-2 focus:ring-2 focus:ring-red-500 text-sm"
                            />
                        </div>
                    </div>

                    {/* Request Message */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Request Message</label>
                        <textarea
                            rows="3"
                            name='requestMessage'
                            placeholder="Write details about why blood is needed..."
                            className=" textarea w-full rounded-lg border border-gray-300 px-3 sm:px-4 py-2 focus:ring-2 focus:ring-red-500 text-sm"
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2 sm:pt-4">
                        <button
                            type="submit"
                            className="w-full rounded-lg bg-red-600 py-2.5 sm:py-3 text-white font-semibold text-sm sm:text-base hover:bg-red-700 transition duration-200"
                        >
                            Request Blood Donation
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddRequest;