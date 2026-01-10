import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { FaRegEye, FaUser, FaTint, FaMapMarkerAlt, FaCalendarAlt, FaClock } from "react-icons/fa";
import useAxios from '../../Hooks/useAxios';
import { AuthContext } from '../../Provider/AuthProvider';

const DonationRequests = () => {
  const { user } = useContext(AuthContext);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [totalRequests, setTotalRequests] = useState(0);
  const [page] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const axiosInstance = useAxios();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(`/public-requests?page=${currentPage - 1}&size=${page}&status=pending`);
        setPendingRequests(response.data.requests);
        setTotalRequests(response.data.totalRequests);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [axiosInstance, currentPage, page]);

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

  const handleViewDetails = (id) => {
    if (user) {
      navigate(`/dashboard/view-request/${id}`);
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-red-50 via-white to-rose-50 py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3">
            Pending Donation Requests
          </h2>
          <p className="text-gray-600 text-lg">
            Help save lives by responding to urgent blood requests
          </p>
          {!loading && (
            <div className="mt-4">
              <span className="badge badge-lg bg-red-100 text-red-600 font-semibold">
                {pendingRequests.length} {pendingRequests.length === 1 ? 'Request' : 'Requests'} Pending
              </span>
            </div>
          )}
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden animate-pulse"
              >
                {/* Skeleton Header */}
                <div className="bg-gray-300 p-4">
                  <div className="h-4 bg-gray-400 rounded w-1/2 mb-3"></div>
                  <div className="h-10 bg-gray-400 rounded"></div>
                </div>

                {/* Skeleton Body */}
                <div className="p-5 space-y-3">
                  <div>
                    <div className="h-3 bg-gray-300 rounded w-1/4 mb-2"></div>
                    <div className="h-5 bg-gray-300 rounded w-3/4"></div>
                  </div>

                  <div>
                    <div className="h-3 bg-gray-300 rounded w-1/3 mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-full"></div>
                    <div className="h-4 bg-gray-300 rounded w-2/3 mt-1"></div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div>
                      <div className="h-3 bg-gray-300 rounded w-2/3 mb-2"></div>
                      <div className="h-4 bg-gray-300 rounded w-full"></div>
                    </div>
                    <div>
                      <div className="h-3 bg-gray-300 rounded w-2/3 mb-2"></div>
                      <div className="h-4 bg-gray-300 rounded w-full"></div>
                    </div>
                  </div>

                  <div className="pt-3">
                    <div className="h-10 bg-gray-300 rounded-lg"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* Cards Grid */}
            {pendingRequests.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-12 text-center">
                <div className="text-gray-400 mb-4">
                  <FaTint size={64} className="mx-auto" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">No Pending Requests</h3>
                <p className="text-gray-600">
                  There are currently no pending donation requests.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {pendingRequests.map(request => (
                  <div
                    key={request._id}
                    className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200 overflow-hidden"
                  >
                    {/* Card Header */}
                    <div className="bg-linear-to-r from-red-500 to-red-600 p-4">
                      <div className="flex items-center gap-2 text-white mb-2">
                        <FaUser size={18} />
                        <h3 className="font-bold text-lg">Recipient Info</h3>
                      </div>
                      <div className="flex items-center gap-2 bg-white/20 rounded-lg px-3 py-2">
                        <FaTint className="text-white" size={16} />
                        <span className="text-white font-bold text-xl">{request.bloodGroup}</span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-5 space-y-3">
                      <div>
                        <p className="text-sm text-gray-600 font-semibold mb-1">Name</p>
                        <p className="text-gray-900 font-bold text-lg">{request.recipientName}</p>
                      </div>

                      <div className="flex items-start gap-2">
                        <FaMapMarkerAlt className="text-gray-400 mt-1 shrink-0" size={14} />
                        <div>
                          <p className="text-sm text-gray-600 font-semibold">Location</p>
                          <p className="text-gray-800 text-sm">{request.fullAddress}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 pt-2">
                        <div className="flex items-start gap-2">
                          <FaCalendarAlt className="text-gray-400 mt-1 shrink-0" size={14} />
                          <div>
                            <p className="text-xs text-gray-600 font-semibold">Date</p>
                            <p className="text-gray-800 text-sm">{request.donationDate}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-2">
                          <FaClock className="text-gray-400 mt-1 shrink-0" size={14} />
                          <div>
                            <p className="text-xs text-gray-600 font-semibold">Time</p>
                            <p className="text-gray-800 text-sm">{request.donationTime}</p>
                          </div>
                        </div>
                      </div>

                      {/* View Button */}
                      <div className="pt-3">
                        <button
                          onClick={() => handleViewDetails(request._id)}
                          className="btn bg-linear-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white border-0 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 w-full flex items-center justify-center gap-2"
                        >
                          <FaRegEye size={18} /> View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {pendingRequests.length > 0 && (
              <div className="flex justify-center items-center mt-12 gap-4">
                <button
                  onClick={handlePrevPage}
                  className="btn bg-linear-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white border-0 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                >
                  Prev
                </button>
                {Pages.map(pg => (
                  <button
                    key={pg}
                    className={`btn rounded-lg shadow-md hover:shadow-lg transition-all duration-200 border-0 ${pg === currentPage
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
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DonationRequests;