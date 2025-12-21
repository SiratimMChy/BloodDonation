import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useAxios from '../Hooks/useAxios';
import { FaSearch, FaTint, FaMapMarkerAlt, FaPhone, FaEnvelope, FaUser } from 'react-icons/fa';

const Search = () => {
    const [upazilas, setUpazilas] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [district, setDistrict] = useState('');
    const [upazila, setUpazila] = useState('');
    const [donors, setDonors] = useState([]);
    const [isSearched, setIsSearched] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const axiosInstance = useAxios();

    useEffect(() => {
        axios.get('/upazila.json')
            .then(res => setUpazilas(res.data.upazilas));

        axios.get('/district.json')
            .then(res => setDistricts(res.data.districts));
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        const bloodGroup = encodeURIComponent(e.target.bloodGroup.value);

        if (!bloodGroup && !district && !upazila) {
            alert('Please select at least one search criteria');
            return;
        }

        setIsLoading(true);
        axiosInstance.get(`/search-request?bloodGroup=${bloodGroup}&district=${district}&upazila=${upazila}`)
            .then(res => {
                setDonors(res.data);
                setIsSearched(true);
                setIsLoading(false);
            })
            .catch(err => {
                console.error(err);
                setIsLoading(false);
            });
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-red-50 via-white to-rose-50 py-12">
            <div className="container mx-auto px-4 max-w-7xl">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                        Search Blood Donors
                    </h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Find available donors in your area. Fill in the search criteria to get started.
                    </p>
                </div>

                {/* Search Form */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 md:p-8 mb-12">
                    <form onSubmit={handleSearch} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                            {/* Blood Group */}
                            <div>
                                <label className="label">
                                    <span className="label-text text-gray-700 font-semibold flex items-center gap-2">
                                        <FaTint className="text-red-500" /> Blood Group
                                    </span>
                                </label>
                                <select
                                    name="bloodGroup"
                                    defaultValue=""
                                    className="select select-bordered w-full focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200"
                                >
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

                            {/* District */}
                            <div>
                                <label className="label">
                                    <span className="label-text text-gray-700 font-semibold flex items-center gap-2">
                                        <FaMapMarkerAlt className="text-gray-500" /> District
                                    </span>
                                </label>
                                <select
                                    value={district}
                                    onChange={(e) => {
                                        setDistrict(e.target.value);
                                        setUpazila('');
                                    }}
                                    className="select select-bordered w-full focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200"
                                >
                                    <option disabled value="">Choose District</option>
                                    {districts.map(d => (
                                        <option key={d.id} value={d.name}>
                                            {d.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Upazila */}
                            <div>
                                <label className="label">
                                    <span className="label-text text-gray-700 font-semibold flex items-center gap-2">
                                        <FaMapMarkerAlt className="text-gray-500" /> Upazila
                                    </span>
                                </label>
                                <select
                                    value={upazila}
                                    onChange={(e) => setUpazila(e.target.value)}
                                    className="select select-bordered w-full focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200"
                                    required
                                >
                                    <option disabled value="">Choose Upazila</option>
                                    {upazilas.map(u => (
                                        <option key={u.id} value={u.name}>
                                            {u.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Search Button */}
                        <div className="flex justify-center pt-4">
                            <button 
                                type="submit"
                                disabled={isLoading}
                                className="btn bg-linear-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white border-0 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 px-12 py-3 text-lg font-semibold flex items-center gap-2"
                            >
                                {isLoading ? (
                                    <>
                                        <span className="loading loading-spinner loading-sm"></span>
                                        Searching...
                                    </>
                                ) : (
                                    <>
                                        <FaSearch /> Search Donors
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Results Section */}
                {isSearched && (
                    <div>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                                Search Results
                            </h2>
                            <span className="badge badge-lg bg-red-100 text-red-600 font-semibold">
                                {donors.length} {donors.length === 1 ? 'Donor' : 'Donors'} Found
                            </span>
                        </div>

                        {donors.length === 0 ? (
                            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-12 text-center">
                                <div className="text-gray-400 mb-4">
                                    <FaSearch size={64} className="mx-auto" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-2">No Donors Found</h3>
                                <p className="text-gray-600">
                                    No donors match your search criteria. Try adjusting your filters.
                                </p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {donors.map((donor) => (
                                    <div 
                                        key={donor._id} 
                                        className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200 overflow-hidden"
                                    >
                                        <div className="bg-linear-to-r from-red-500 to-red-600 p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="bg-white rounded-full p-3">
                                                    <FaUser className="text-red-600" size={24} />
                                                </div>
                                                <div className="text-white">
                                                    <h3 className="font-bold text-lg">{donor.recipientName}</h3>
                                                    <div className="flex items-center gap-2">
                                                        <FaTint size={14} />
                                                        <span className="font-semibold text-sm">{donor.bloodGroup}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-6 space-y-3">
                                            <div className="flex items-start gap-3">
                                                <FaMapMarkerAlt className="text-gray-400 mt-1 shrink-0" />
                                                <div>
                                                    <p className="text-sm text-gray-600 font-semibold">Location</p>
                                                    <p className="text-gray-800">{donor.recipientUpazila}, {donor.recipientDistrict}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-start gap-3">
                                                <FaPhone className="text-gray-400 mt-1 shrink-0" />
                                                <div>
                                                    <p className="text-sm text-gray-600 font-semibold">Contact</p>
                                                    <p className="text-gray-800">{donor.mobile}</p>
                                                </div>
                                            </div>

                                            {donor.hospitalName && (
                                                <div className="flex items-start gap-3">
                                                    <FaMapMarkerAlt className="text-gray-400 mt-1 shrink-0" />
                                                    <div>
                                                        <p className="text-sm text-gray-600 font-semibold">Hospital</p>
                                                        <p className="text-gray-800">{donor.hospitalName}</p>
                                                    </div>
                                                </div>
                                            )}

                                            {donor.donationDate && (
                                                <div className="pt-2 border-t border-gray-200">
                                                    <p className="text-sm text-gray-600">
                                                        <span className="font-semibold">Donation Date:</span> {donor.donationDate}
                                                    </p>
                                                </div>
                                            )}

                                            <div className="pt-3">
                                                <span className={`badge ${
                                                    donor.donation_status === 'pending' ? 'badge-warning' :
                                                    donor.donation_status === 'inprogress' ? 'badge-info' :
                                                    donor.donation_status === 'done' ? 'badge-success' :
                                                    'badge-error'
                                                } badge-lg w-full`}>
                                                    {donor.donation_status}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Search;