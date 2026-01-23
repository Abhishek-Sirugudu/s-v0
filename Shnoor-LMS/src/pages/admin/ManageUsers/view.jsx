import React from 'react';
import {
    Search,
    Ban,
    CheckCircle2,
    ShieldAlert,
    GraduationCap,
    Briefcase
} from 'lucide-react';

const ManageUsersView = ({
    loading, searchTerm, setSearchTerm,
    filterRole, setFilterRole, filteredUsers,
    handleStatusChange
}) => {

    const getRoleIcon = (role) => {
        switch (role) {
            case 'admin': return <ShieldAlert className="text-rose-500" size={16} />;
            case 'instructor': return <Briefcase className="text-indigo-600" size={16} />;
            default: return <GraduationCap className="text-emerald-500" size={16} />;
        }
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'active': return <span className="px-2.5 py-0.5 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-md text-xs font-bold uppercase tracking-wide">Active</span>;
            case 'suspended': return <span className="px-2.5 py-0.5 bg-red-50 border border-red-100 text-red-700 rounded-md text-xs font-bold uppercase tracking-wide">Suspended</span>;
            case 'pending': return <span className="px-2.5 py-0.5 bg-amber-50 border border-amber-100 text-amber-700 rounded-md text-xs font-bold uppercase tracking-wide">Pending</span>;
            default: return <span className="px-2.5 py-0.5 bg-slate-50 border border-slate-200 text-slate-600 rounded-md text-xs font-bold uppercase tracking-wide">{status || 'Unknown'}</span>;
        }
    };

    if (loading) return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-slate-500 font-medium tracking-tight">Loading users...</p>
            </div>
        </div>
    );

    return (
        <div className="p-2 h-[calc(100vh-6rem)] flex flex-col font-sans w-full">
            <div className="flex justify-between items-center mb-6 shrink-0 px-2">
                <div>
                    <h2 className="text-2xl font-bold text-primary-900 tracking-tight">User Management</h2>
                    <p className="text-slate-500 text-base font-medium">Manage accounts and permissions across the platform.</p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search users..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="input-field !pl-11 min-w-[320px] text-base"
                        />
                    </div>
                    <select
                        className="px-4 py-3 bg-white border border-slate-200 rounded-xl focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 outline-none transition-all font-medium text-slate-600 text-sm cursor-pointer hover:border-slate-300"
                        value={filterRole}
                        onChange={(e) => setFilterRole(e.target.value)}
                    >
                        <option value="all">All Roles</option>
                        <option value="student">Students</option>
                        <option value="instructor">Instructors</option>
                        <option value="admin">Admins</option>
                    </select>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 flex-1 overflow-hidden flex flex-col w-full">
                <div className="overflow-y-auto flex-1 custom-scrollbar">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-50 border-b border-slate-200 sticky top-0 z-10">
                            <tr>
                                <th className="py-4 px-6 text-sm font-bold text-slate-700 uppercase tracking-wide">User</th>
                                <th className="py-4 px-6 text-sm font-bold text-slate-700 uppercase tracking-wide">Role</th>
                                <th className="py-4 px-6 text-sm font-bold text-slate-700 uppercase tracking-wide">Status</th>
                                <th className="py-4 px-6 text-sm font-bold text-slate-700 uppercase tracking-wide">Join Date</th>
                                <th className="py-4 px-6 text-sm font-bold text-slate-700 uppercase tracking-wide text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredUsers.length > 0 ? filteredUsers.map(user => (
                                <tr key={user.id} className="hover:bg-slate-50 transition-colors group">
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-slate-500 border border-slate-200 shadow-sm text-base">
                                                {user.displayName?.charAt(0) || user.email?.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="font-bold text-primary-900 text-base tracking-tight">{user.displayName || 'No Name'}</div>
                                                <div className="text-sm text-slate-500 font-medium">{user.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-2">
                                            {getRoleIcon(user.role)}
                                            <span className="capitalize font-bold text-slate-700 text-sm">{user.role}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        {getStatusBadge(user.accountStatus)}
                                    </td>
                                    <td className="py-4 px-6 font-medium text-slate-500 text-sm tabular-nums">
                                        {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '-'}
                                    </td>
                                    <td className="py-4 px-6 text-right">
                                        <div className="flex justify-end gap-2">
                                            {user.accountStatus === 'suspended' ? (
                                                <button
                                                    className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-lg text-xs font-bold uppercase tracking-wide hover:bg-emerald-100 transition-colors"
                                                    onClick={() => handleStatusChange(user.id, 'active')}
                                                    title="Activate User"
                                                >
                                                    <CheckCircle2 size={14} /> Activate
                                                </button>
                                            ) : (
                                                <button
                                                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide transition-all border ${user.role === 'admin'
                                                        ? 'bg-slate-50 text-slate-300 border-slate-100 cursor-not-allowed'
                                                        : 'bg-white border-slate-200 text-slate-600 hover:border-red-200 hover:text-red-600 hover:bg-red-50'
                                                        }`}
                                                    onClick={() => handleStatusChange(user.id, 'suspended')}
                                                    title="Suspend User"
                                                    disabled={user.role === 'admin'}
                                                >
                                                    <Ban size={14} /> Suspend
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="5" className="text-center py-20 text-slate-400">
                                        <div className="flex flex-col items-center gap-2">
                                            <Search size={24} className="opacity-20" />
                                            <p className="text-base font-medium">No users found matching your filters.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="p-4 bg-slate-50 border-t border-slate-200 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">
                    Total Users: {filteredUsers.length}
                </div>
            </div>
        </div>
    );
};

export default ManageUsersView;
