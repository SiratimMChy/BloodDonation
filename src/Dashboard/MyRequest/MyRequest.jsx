import React, { useEffect } from 'react';
import { useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { FaEdit, FaRegEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router';
import Swal from 'sweetalert2';

const MyRequest = () => {
    const [totalRequests, setTotalRequests] = useState(0);
    const [myRequests, setMyRequests] = useState([]);
    const [page] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState('all');
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        axiosSecure.get(`/myRequests?page=${currentPage - 1}&size=${page}&status=${statusFilter}`)
            .then(response => {
                setMyRequests(response.data.requests);
                setTotalRequests(response.data.totalRequests);
            });
    }, [axiosSecure, currentPage, page, statusFilter]);

    const numberOfPages = Math.ceil(totalRequests / page);
    const Pages = [...Array(numberOfPages).keys()].map(num => num + 1);

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    const handleNextPage = () => {
        if (currentPage < Pages.length) {
            setCurrentPage(currentPage + 1);
        }
    }

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/delete-request/${id}`)
                    .then(res => {
                        console.log(res.data);
                        if (res.data.deletedCount == 1) {
                            const remaining = myRequests.filter(listing => listing._id !== id);
                            setMyRequests(remaining);
                        }

                    })
                    .catch(err => {
                        console.log(err)
                    });
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            }
        });

    }

    return (
        <div>
            <div className="overflow-x-auto">
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="select w-full max-w-40 mb-4"
                >
                    <option value="all">All</option>
                    <option value="pending">Pending</option>
                    <option value="inprogress">In Progress</option>
                    <option value="done">Done</option>
                    <option value="canceled">Canceled</option>
                </select>
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
                            <th className="border border-gray-300">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            myRequests.map((request, index) =>
                                <tr key={request._id}>
                                    <th className="border border-gray-300">{(currentPage - 1) * page + (index + 1)}</th>
                                    <td className="border border-gray-300">{request.recipientName}</td>
                                    <td className="border border-gray-300 text-red-600 font-bold">{request.bloodGroup}</td>
                                    <td className="border border-gray-300">{request.hospitalName}</td>
                                    <td className="border border-gray-300">{request.fullAddress}</td>
                                    <td className="border border-gray-300">{request.donationDate}</td>
                                    <td className="border border-gray-300">{request.mobile}</td>
                                    <td className="border border-gray-300">{request.donation_status}</td>
                                    <td className="border border-gray-300">
                                        <div className='flex gap-2'>
                                            <Link
                                                to={`/dashboard/edit-request/${request._id}`}
                                                className="btn bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white border-0 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2"
                                            >
                                                <FaEdit /> Edit
                                            </Link>

                                            <Link
                                                to={`/dashboard/view-request/${request._id}`}
                                                className="btn bg-linear-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white border-0 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2"
                                            >
                                                <FaRegEye size={20} /> View
                                            </Link>

                                            <button 
                                                onClick={() => handleDelete(request._id)} 
                                                className='btn bg-linear-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white border-0 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2'
                                            >
                                                <MdDelete size={20} /> Delete
                                            </button>

                                        </div>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
                </div>
            </div>
            <div className='flex justify-center mt-12 gap-4'>
                <button 
                    onClick={handlePrevPage} 
                    className="btn bg-linear-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white border-0 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                >
                    Prev
                </button>
                {Pages.map(pg => (
                    <button
                        key={pg}
                        className={`btn rounded-lg shadow-md hover:shadow-lg transition-all duration-200 border-0 ${
                            pg === currentPage 
                                ? 'bg-linear-to-r from-red-500 to-red-600 text-white' 
                                : 'bg-white text-gray-700 hover:bg-gray-100'
                        }`}
                        onClick={() => setCurrentPage(pg)}
                    >
                        {pg}
                    </button>
                ))}
                <button 
                    onClick={handleNextPage} 
                    className="btn bg-linear-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white border-0 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default MyRequest;