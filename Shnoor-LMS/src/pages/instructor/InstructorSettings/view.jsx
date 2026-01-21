import React from 'react';
import { FaUserEdit, FaSave, FaLock } from 'react-icons/fa';

const InstructorSettingsView = ({
    loading, profile, setProfile,
    passwords, setPasswords,
    handleProfileUpdate, handlePasswordChange
}) => {

    if (loading) return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-slate-500 font-medium">Loading settings...</p>
            </div>
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto pb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">Instructor Profile & Settings</h2>

            {/* Public Profile Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-8">
                <div className="p-6 border-b border-slate-100 flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                        <FaUserEdit size={20} />
                    </div>
                    <h4 className="text-lg font-bold text-slate-800">Public Profile</h4>
                </div>

                <div className="p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2 md:col-span-2">
                            <label className="text-sm font-bold text-slate-700">Display Name</label>
                            <input
                                value={profile.displayName}
                                onChange={e => setProfile({ ...profile, displayName: e.target.value })}
                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                            />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <label className="text-sm font-bold text-slate-700">Bio (Visible to students)</label>
                            <textarea
                                rows="3"
                                value={profile.bio}
                                onChange={e => setProfile({ ...profile, bio: e.target.value })}
                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all resize-none"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end pt-4">
                        <button
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded-xl shadow-lg shadow-blue-500/20 flex items-center gap-2 transition-all"
                            onClick={handleProfileUpdate}
                        >
                            <FaSave /> Save Profile
                        </button>
                    </div>
                </div>
            </div>

            {/* Security Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex items-center gap-3">
                    <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
                        <FaLock size={20} />
                    </div>
                    <h4 className="text-lg font-bold text-slate-800">Security</h4>
                </div>

                <div className="p-8 space-y-6">
                    <div className="max-w-xl mx-auto space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700">Current Password</label>
                            <input
                                type="password"
                                value={passwords.current}
                                onChange={e => setPasswords({ ...passwords, current: e.target.value })}
                                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:border-blue-500 outline-none transition-all"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700">New Password</label>
                            <input
                                type="password"
                                value={passwords.new}
                                onChange={e => setPasswords({ ...passwords, new: e.target.value })}
                                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:border-blue-500 outline-none transition-all"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700">Confirm New Password</label>
                            <input
                                type="password"
                                value={passwords.confirm}
                                onChange={e => setPasswords({ ...passwords, confirm: e.target.value })}
                                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:border-blue-500 outline-none transition-all"
                            />
                        </div>

                        <div className="flex justify-end pt-4">
                            <button
                                className="bg-slate-800 hover:bg-slate-900 text-white font-bold py-2.5 px-6 rounded-xl shadow-md transition-all"
                                onClick={handlePasswordChange}
                            >
                                Change Password
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InstructorSettingsView;
