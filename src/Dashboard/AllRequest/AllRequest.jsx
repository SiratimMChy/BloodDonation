import { useContext, useEffect, useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { Link } from 'react-router';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Provider/AuthProvider';
import SkeletonLoader from '../../Components/SkeletonLoader/SkeletonLoader';
import { useDemoRestriction } from '../../Hooks/useDemoRestriction';

const AllRequest = () => {
    const { role } = useContext(AuthContext);
    const [totalRequests, setTotalRequests] = useState(0);
    const [myRequests, setMyRequests] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [page] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState('all');
    const { checkDemoRestriction } = useDemoRestriction();
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        let isMounted = true;
        
        const fetchData = () => {
            if (isMounted) {
                setIsLoading(true);
            }
            
            axiosSecure.get(`/requests?page=${currentPage - 1}&size=${page}&status=${statusFilter}`)
                .then(response => {
                    if (isMounted) {
                        setMyRequests(response.data.requests);
                        setTotalRequests(response.data.totalRequests);
                    }
                })
                .catch(err => {
                    if (isMounted) {
                        console.error('Error fetching requests:', err);
                    }
                })
                .finally(() => {
                    if (isMounted) {
                        setIsLoading(false);
                    }
                });
        };

        fetchData();

        return () => {
            isMounted = false;
        };
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

    const handleStatusChange = (id, newStatus) => {
        // Check if user is demo user and restrict action
        if (checkDemoRestriction()) {
            return;
        }
        
        Swal.fire({
            title: "Are you sure?",
            text: `Change status to ${newStatus}?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, change it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.put(`/requests/${id}`, { donation_status: newStatus })
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            const updatedRequests = myRequests.map(req =>
                                req._id === id ? { ...req, donation_status: newStatus } : req
                            );
                            setMyRequests(updatedRequests);
                            Swal.fire({
                                title: "Updated!",
                                text: "Status has been updated.",
                                icon: "success"
                            });
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        Swal.fire({
                            title: "Error!",
                            text: "Failed to update status.",
                            icon: "error"
                        });
                    });
            }
        });
    }

    const handleDelete = (id) => {
        // Check if user is demo user and restrict action
        if (checkDemoRestriction()) {
            return;
        }
        
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
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        });
    }

    return (
        <div className="bg-base-100 min-h-screen p-4">
            {/* Header */}
            <div className="text-center mb-12">
                <div className="relative mb-8">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-base-content mb-4 tracking-tight">
                        All <span className="bg-gradient-to-r from-red-500 to-rose-600 bg-clip-text text-transparent">Requests</span>
                    </h1>
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-red-500 to-rose-600 rounded-full"></div>
                </div>
                <p className="text-base-content/60 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                    Manage and monitor all blood donation requests with comprehensive oversight
                </p>
            </div>

            {isLoading ? (
                <div className="space-y-4">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="h-10 bg-base-300 rounded w-40 animate-pulse"></div>
                    </div>
                    <SkeletonLoader type="list" count={10} />
                </div>
            ) : (
                <>
                    <div className="mb-4">
                        <select value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="select w-full max-w-40 bg-base-200 text-base-content border-base-300">
                            <option value="all">All</option>
                            <option value="pending">Pending</option>
                            <option value="inprogress">In Progress</option>
                            <option value="done">Done</option>
                            <option value="canceled">Canceled</option>
                        </select>
                    </div>

                    {/* Mobile Card View */}
                    <div className="lg:hidden space-y-4">
                        {myRequests.map((request, index) => (
                            <div key={request._id} className="bg-base-200 border-2 border-base-300 rounded-lg shadow-lg p-4">
                                <div className="flex justify-between items-start mb-3">
                                    <span className="badge badge-lg text-base-content font-bold bg-base-300">
                                        #{(currentPage - 1) * page + (index + 1)}
                                    </span>
                                    <span className="badge badge-lg bg-red-600 text-white font-bold">
                                        {request.bloodGroup}
                                    </span>
                                </div>

                                <div className="space-y-2 mb-4">
                                    <div>
                                        <span className="text-xs text-base-content/70 font-semibold">Recipient Name:</span>
                                        <p className="font-semibold text-base-content">{request.recipientName}</p>
                                    </div>
                                    
                                    <div>
                                        <span className="text-xs text-base-content/70 font-semibold">Hospital:</span>
                                        <p className="font-semibold text-base-content">{request.hospitalName}</p>
                                    </div>
                                    
                                    <div>
                                        <span className="text-xs text-base-content/70 font-semibold">Location:</span>
                                        <p className="font-semibold text-base-content">{request.fullAddress}</p>
                                    </div>
                                    
                                    <div className="flex gap-4">
                                        <div className="flex-1">
                                            <span className="text-xs text-base-content/70 font-semibold">Date:</span>
                                            <p className="font-semibold text-base-content">{request.donationDate}</p>
                                        </div>
                                        <div className="flex-1">
                                            <span className="text-xs text-base-content/70 font-semibold">Mobile:</span>
                                            <p className="font-semibold text-base-content">{request.mobile}</p>
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <span className="text-xs text-base-content/70 font-semibold">Status:</span>
                                        {(role === 'admin' || role === 'volunteer') ? (
                                            <select
                                                value={request.donation_status}
                                                onChange={(e) => handleStatusChange(request._id, e.target.value)}
                                                className="select select-sm w-full mt-1 bg-base-100 text-base-content border-base-300"
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="inprogress">In Progress</option>
                                                <option value="done">Done</option>
                                                <option value="canceled">Canceled</option>
                                            </select>
                                        ) : (
                                            <p className="font-semibold text-base-content capitalize mt-1">{request.donation_status}</p>
                                        )}
                                    </div>
                                </div>

                                {role === 'admin' && (
                                    <div className="flex gap-2 pt-3 border-t border-base-300">
                                        <Link
                                            to={`/dashboard/edit-request/${request._id}`}
                                            className="btn btn-sm flex-1 bg-blue-500 hover:bg-blue-600 text-white border-0"
                                        >
                                            <FaEdit /> Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(request._id)}
                                            className="btn btn-sm flex-1 bg-red-500 hover:bg-red-600 text-white border-0"
                                        >
                                            <MdDelete size={20} /> Delete
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Desktop Table View */}
                    <div className="hidden lg:block overflow-x-auto">
                        <table className="table table-xs lg:table-auto w-full bg-base-200 border-2 border-base-300 rounded-lg shadow-lg">
                            <thead>
                                <tr className="bg-base-300">
                                    <th className="border-2 border-base-300 px-4 py-3 text-left font-bold text-base-content">#</th>
                                    <th className="border-2 border-base-300 px-4 py-3 text-left font-bold text-base-content">Recipient Name</th>
                                    <th className="border-2 border-base-300 px-4 py-3 text-left font-bold text-base-content">Blood Group</th>
                                    <th className="border-2 border-base-300 px-4 py-3 text-left font-bold text-base-content">Hospital</th>
                                    <th className="border-2 border-base-300 px-4 py-3 text-left font-bold text-base-content">Location</th>
                                    <th className="border-2 border-base-300 px-4 py-3 text-left font-bold text-base-content">Donation Date</th>
                                    <th className="border-2 border-base-300 px-4 py-3 text-left font-bold text-base-content">Mobile</th>
                                    <th className="border-2 border-base-300 px-4 py-3 text-left font-bold text-base-content">Status</th>
                                    {role === 'admin' && (
                                        <th className="border-2 border-base-300 px-4 py-3 text-left font-bold text-base-content">Actions</th>
                                    )}
                                </tr>
                            </thead>
                            <tbody>
                                {myRequests.map((request, index) =>
                                    <tr key={request._id} className="hover:bg-base-300/50">
                                        <td className="border-2 border-base-300 px-4 py-3 font-semibold text-base-content">{(currentPage - 1) * page + (index + 1)}</td>
                                        <td className="border-2 border-base-300 px-4 py-3 font-semibold text-base-content">{request.recipientName}</td>
                                        <td className="border-2 border-base-300 px-4 py-3 font-semibold text-red-600 dark:text-red-400">{request.bloodGroup}</td>
                                        <td className="border-2 border-base-300 px-4 py-3 font-semibold text-base-content">{request.hospitalName}</td>
                                        <td className="border-2 border-base-300 px-4 py-3 font-semibold text-base-content">{request.fullAddress}</td>
                                        <td className="border-2 border-base-300 px-4 py-3 font-semibold text-base-content">{request.donationDate}</td>
                                        <td className="border-2 border-base-300 px-4 py-3 font-semibold text-base-content">{request.mobile}</td>
                                        <td className="border-2 border-base-300 px-4 py-3">
                                            {(role === 'admin' || role === 'volunteer') ? (
                                                <select
                                                    value={request.donation_status}
                                                    onChange={(e) => handleStatusChange(request._id, e.target.value)}
                                                    className="select select-sm w-full min-w-32 bg-base-200 text-base-content border-base-300"
                                                >
                                                    <option value="pending">Pending</option>
                                                    <option value="inprogress">In Progress</option>
                                                    <option value="done">Done</option>
                                                    <option value="canceled">Canceled</option>
                                                </select>
                                            ) : (
                                                <span className="font-semibold text-base-content">{request.donation_status}</span>
                                            )}
                                        </td>
                                        {role === 'admin' && (
                                            <td className="border-2 border-base-300 px-4 py-3">
                                                <div className='flex gap-2'>
                                                    <Link
                                                        to={`/dashboard/edit-request/${request._id}`}
                                                        className="btn bg-blue-500 hover:bg-blue-600 text-white border-0 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2"
                                                    >
                                                        <FaEdit /> Edit
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(request._id)}
                                                        className='btn bg-red-500 hover:bg-red-600 text-white border-0 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2'
                                                    >
                                                        <MdDelete size={20} /> Delete
                                                    </button>
                                                </div>
                                            </td>
                                        )}
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className='flex justify-center mt-12 gap-2 flex-wrap'>
                        <button
                            onClick={handlePrevPage}
                            className="btn btn-sm lg:btn-md bg-base-300 hover:bg-base-200 text-base-content border-2 border-base-300 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                        >
                            Prev
                        </button>
                        {Pages.map(pg => (
                            <button
                                key={pg}
                                className={`btn btn-sm lg:btn-md rounded-lg shadow-md hover:shadow-lg transition-all duration-200 border-0 ${pg === currentPage
                                    ? 'bg-red-500 hover:bg-red-600 text-white'
                                    : 'bg-base-200 text-base-content hover:bg-base-300'
                                }`}
                                onClick={() => setCurrentPage(pg)}
                            >
                                {pg}
                            </button>
                        ))}
                        <button
                            onClick={handleNextPage}
                            className="btn btn-sm lg:btn-md bg-base-300 hover:bg-base-200 text-base-content border-2 border-base-300 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default AllRequest;