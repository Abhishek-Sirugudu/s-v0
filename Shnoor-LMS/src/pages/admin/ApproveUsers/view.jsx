import React from 'react';
import { FaCheckCircle, FaTimesCircle, FaUserClock } from 'react-icons/fa';

const ApproveUsersView = ({ loading, pendingUsers, handleAction }) => {

    if (loading) return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-slate-500 font-medium">Loading pending requests...</p>
            </div>
        </div>
    );

    return (
        <div className="p-6 h-[calc(100vh-6rem)] flex flex-col">
            <div className="flex justify-between items-center mb-6 shrink-0">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
                        <FaUserClock size={20} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-slate-800">User Approval Queue</h2>
                        <p className="text-sm text-slate-500">Review and manage new account requests.</p>
                    </div>
                </div>
                {pendingUsers.length > 0 && (
                    <div className="bg-amber-100 text-amber-700 px-4 py-2 rounded-xl font-bold text-sm border border-amber-200 shadow-sm animate-pulse">
                        {pendingUsers.length} Pending
                    </div>
                )}
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 flex-1 overflow-hidden flex flex-col">
                <div className="overflow-y-auto flex-1">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-50 border-b border-slate-200 sticky top-0 z-10 text-xs font-bold text-slate-500 uppercase">
                            <tr>
                                <th className="py-4 px-6">Applicant</th>
                                <th className="py-4 px-6 md:table-cell hidden">Role Requested</th>
                                <th className="py-4 px-6 md:table-cell hidden">Date Registered</th>
                                <th className="py-4 px-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {pendingUsers.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="text-center py-20 text-slate-400">
                                        <div className="flex flex-col items-center gap-4">
                                            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300">
                                                <FaCheckCircle size={32} />
                                            </div>
                                            <p>No pending user requests.</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                pendingUsers.map(user => (
                                    <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="py-4 px-6">
                                            <div>
                                                <div className="font-bold text-slate-900">{user.name || 'Unknown Name'}</div>
                                                <div className="text-sm text-slate-500">{user.email}</div>
                                                <div className="md:hidden mt-1 flex gap-2">
                                                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ${user.role === 'admin' ? 'bg-purple-100 text-purple-700' :
                                                            user.role === 'instructor' ? 'bg-indigo-100 text-indigo-700' :
                                                                'bg-emerald-100 text-emerald-700'
                                                        }`}>
                                                        {user.role}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 md:table-cell hidden">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${user.role === 'admin' ? 'bg-purple-100 text-purple-700' :
                                                    user.role === 'instructor' ? 'bg-indigo-100 text-indigo-700' :
                                                        'bg-emerald-100 text-emerald-700'
                                                }`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 md:table-cell hidden">
                                            <div className="text-sm font-medium text-slate-600">
                                                {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                                            </div>
                                            <div className="text-xs text-slate-400">
                                                {user.createdAt ? new Date(user.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            <div className="flex justify-end gap-3">
                                                <button
                                                    onClick={() => handleAction(user.id, 'rejected', user.name)}
                                                    className="w-9 h-9 flex items-center justify-center rounded-full bg-red-50 text-red-500 hover:bg-red-100 transition-colors shadow-sm border border-red-100"
                                                    title="Reject"
                                                >
                                                    <FaTimesCircle />
                                                </button>
                                                <button
                                                    onClick={() => handleAction(user.id, 'active', user.name)}
                                                    className="w-9 h-9 flex items-center justify-center rounded-full bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors shadow-sm border border-emerald-100"
                                                    title="Approve"
                                                >
                                                    <FaCheckCircle />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ApproveUsersView;
