import React from 'react';
import { UserCheck, Save, Lock } from 'lucide-react';

const InstructorSettingsView = ({
    loading, profile, setProfile,
    passwords, setPasswords,
    handleProfileUpdate, handlePasswordChange
}) => {

    if (loading) return (
        <div className="flex items-center justify-center min-h-[400px] text-slate-500 font-medium animate-pulse">
            Loading settings...
        </div>
    );

    return (
        <div className="min-h-screen bg-[#f8fafc] p-8">
            <div className="w-full">
                <header className="mb-8">
                    <h1 className="text-2xl font-bold text-primary-900 tracking-tight">Account Settings</h1>
                    <p className="text-slate-500 mt-1">Manage your profile information and security.</p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Navigation or Summary (Optional, keeping simple for now) */}
                    {/* For now, we will stack or use a 2/3 + 1/3 layout logic if we had more sections. 
                        Here let's just do a vertical stack of cards but styled nicer. */}

                    <div className="lg:col-span-3 space-y-6">
                        {/* Profile Card */}
                        <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
                            <div className="border-b border-slate-100 px-6 py-4 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                                        <UserCheck size={20} />
                                    </div>
                                    <h2 className="font-bold text-primary-900 text-sm uppercase tracking-wide">Public Profile</h2>
                                </div>
                            </div>

                            <div className="p-6 md:p-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="md:col-span-2">
                                        <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Display Name</label>
                                        <input
                                            value={profile.displayName}
                                            onChange={e => setProfile({ ...profile, displayName: e.target.value })}
                                            className="w-full px-4 py-2 bg-white border border-slate-200 rounded-md focus:border-indigo-500 focus:ring-0 outline-none transition-all font-medium text-primary-900"
                                            placeholder="Enter User name"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Bio</label>
                                        <textarea
                                            rows="4"
                                            value={profile.bio}
                                            onChange={e => setProfile({ ...profile, bio: e.target.value })}
                                            className="w-full px-4 py-2 bg-white border border-slate-200 rounded-md focus:border-indigo-500 focus:ring-0 outline-none transition-all resize-none text-slate-700"
                                            placeholder="Tell students about yourself..."
                                        />
                                        <p className="text-xs text-slate-400 mt-2 text-right">{profile.bio.length}/500</p>
                                    </div>
                                </div>
                                <div className="mt-8 flex justify-end">
                                    <button
                                        className="px-6 py-2 bg-primary-900 hover:bg-slate-800 text-white font-bold rounded-md shadow-sm text-sm flex items-center gap-2 transition-colors"
                                        onClick={handleProfileUpdate}
                                    >
                                        <Save size={16} /> Save Changes
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Security Card */}
                        <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
                            <div className="border-b border-slate-100 px-6 py-4 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-slate-50 text-slate-600 rounded-lg">
                                        <Lock size={20} />
                                    </div>
                                    <h2 className="font-bold text-primary-900 text-sm uppercase tracking-wide">Security</h2>
                                </div>
                            </div>

                            <div className="p-6 md:p-8">
                                <div className="w-full">
                                    <div className="space-y-5">
                                        <div>
                                            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Current Password</label>
                                            <input
                                                type="password"
                                                value={passwords.current}
                                                onChange={e => setPasswords({ ...passwords, current: e.target.value })}
                                                className="w-full px-4 py-2 bg-white border border-slate-200 rounded-md focus:border-indigo-500 outline-none transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">New Password</label>
                                            <input
                                                type="password"
                                                value={passwords.new}
                                                onChange={e => setPasswords({ ...passwords, new: e.target.value })}
                                                className="w-full px-4 py-2 bg-white border border-slate-200 rounded-md focus:border-indigo-500 outline-none transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Confirm New Password</label>
                                            <input
                                                type="password"
                                                value={passwords.confirm}
                                                onChange={e => setPasswords({ ...passwords, confirm: e.target.value })}
                                                className="w-full px-4 py-2 bg-white border border-slate-200 rounded-md focus:border-indigo-500 outline-none transition-all"
                                            />
                                        </div>

                                        <div className="pt-4">
                                            <button
                                                className="px-6 py-2 bg-white border border-slate-300 text-slate-700 font-bold rounded-md hover:bg-slate-50 transition-colors text-sm"
                                                onClick={handlePasswordChange}
                                            >
                                                Update Password
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InstructorSettingsView;
