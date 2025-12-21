import React, { useState, useEffect, useContext } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { AuthContext } from '../../Provider/AuthProvider';

const AllUsers = () => {

    const axiosSecure = useAxiosSecure();
    const [users, setUsers] = useState([]);
    const { user, role } = useContext(AuthContext);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        axiosSecure.get('/users')
            .then(res => {
                setUsers(res.data);
            });
    }, [axiosSecure, user]);

    const handleStatusChange = (email, status) => {
        axiosSecure.patch(`/update/user/status?email=${email}&status=${status}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    setUsers(previousState =>
                        previousState.map(User =>
                            User.email === email ? { ...User, status } : User
                        )
                    );
                }
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const form = e.target;
        const email = form.email.value;
        const role = form.role.value;

        axiosSecure.patch(`/update/user/role?email=${email}&role=${role}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    setUsers(previousRole =>
                        previousRole.map(u =>
                            u.email === email ? { ...u, role } : u
                        )
                    );
                }
            })
            .catch(err => console.error(err));

        form.reset();
        document.getElementById('my_modal_3').close();
    };

    return (
        <div className="p-4">
            <div className="overflow-x-auto">
                <table className="table table-md">
                    <thead>
                        <tr className='text-left'>
                            <th className="border border-gray-300">Name</th>
                            <th className="border border-gray-300">Role</th>
                            <th className="border border-gray-300">Status</th>
                            {role === 'admin' && (
                                <>
                                    <th className="border border-gray-300">Actions</th>
                                    <th className="border border-gray-300">Role Management</th>
                                </>
                            )}
                        </tr>
                    </thead>

                    <tbody>
                        {users.map(userItem => (
                            <tr key={userItem._id}>
                                <td className="border border-gray-300">
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={userItem?.imageUrl}
                                                    alt="Avatar"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{userItem?.name}</div>
                                            <div className="text-sm opacity-50">{userItem?.email}</div>
                                        </div>
                                    </div>
                                </td>

                                <td className="border border-gray-300">{userItem?.role}</td>
                                <td className="border border-gray-300">{userItem?.status}</td>

                                {role === 'admin' && (
                                    <td className="border border-gray-300">
                                        <div className="flex gap-2">
                                            {userItem?.status !== 'active' ? (
                                                <button
                                                    onClick={() => handleStatusChange(userItem?.email, 'active')}
                                                    className="btn bg-green-600 text-white btn-md w-20"
                                                >
                                                    Active
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => handleStatusChange(userItem?.email, 'blocked')}
                                                    className="btn bg-red-600 text-white btn-md w-20"
                                                >
                                                    Blocked
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                )}

                                {role === 'admin' && (
                                    <td className="border border-gray-300">
                                        <button
                                            className="btn bg-linear-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-semibold"
                                            onClick={() => {
                                                setSelectedUser(userItem);
                                                document.getElementById('my_modal_3').showModal();
                                            }}
                                        >
                                            Edit Role
                                        </button>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box m-auto max-w-sm">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-1 top-1">✕</button>
                    </form>

                    {selectedUser && (
                        <form key={selectedUser._id} onSubmit={handleSubmit}>
                            <h1 className='text-center font-bold text-xl mb-4'>User Details</h1>

                            <div className="flex flex-col mb-3">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input
                                    name='name'
                                    readOnly
                                    defaultValue={selectedUser?.name}
                                    type="text"
                                    className="input input-bordered"
                                />
                            </div>

                            <div className="flex flex-col mb-3">
                                <label className="label">
                                    <span className="label-text">Role</span>
                                </label>
                                <select
                                    name="role"
                                    defaultValue={selectedUser?.role}
                                    className="select select-bordered"
                                    required
                                >
                                    <option>admin</option>
                                    <option>volunteer</option>
                                    <option>donor</option>
                                </select>
                            </div>

                            <div className="flex flex-col mb-4">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    name='email'
                                    readOnly
                                    defaultValue={selectedUser?.email}
                                    type="email"
                                    className="input input-bordered"
                                />
                            </div>

                            <div className="flex justify-center">
                                <button
                                    type="submit"
                                    className="btn bg-blue-600 hover:bg-blue-700 text-white w-full"
                                >
                                    Update Role
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </dialog>
        </div>
    );
};

export default AllUsers;