import React from 'react';
import { FaUserCircle, FaCog, FaGlobe } from 'react-icons/fa';

const AdminProfileManagementView = () => {
    return (
        <div className="flex justify-center p-8 bg-slate-50 min-h-[calc(100vh-6rem)]">
            <div className="w-full max-w-3xl space-y-8">

                <div className="text-center">
                    <h3 className="text-2xl font-bold text-slate-800 mb-2">Profile & Platform Settings</h3>
                    <p className="text-slate-500">Manage your admin identity and global preferences.</p>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 flex items-center gap-6">
                    <FaUserCircle className="text-slate-200 text-7xl shrink-0" />
                    <div>
                        <h4 className="text-xl font-bold text-slate-900 mb-1">Super Admin</h4>
                        <p className="text-slate-500 text-sm mb-3">admin@shnoor.com</p>
                        <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-bold uppercase tracking-wide border border-indigo-200">
                            System Administrator
                        </span>
                    </div>
                </div>

                <div>
                    <h4 className="text-lg font-bold text-slate-900 mb-4 border-b border-slate-200 pb-2">General Preferences</h4>

                    <div className="space-y-4">
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex items-center justify-between group hover:border-blue-300 transition-all">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors">
                                    <FaGlobe size={24} />
                                </div>
                                <div>
                                    <div className="font-bold text-slate-800">Timezone & Region</div>
                                    <div className="text-sm text-slate-500 font-medium">Asia/Kolkata (GMT+5:30)</div>
                                </div>
                            </div>
                            <button className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-slate-800 hover:border-slate-300 transition-all">
                                Edit
                            </button>
                        </div>

                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex items-center justify-between group hover:border-blue-300 transition-all">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors">
                                    <FaCog size={24} />
                                </div>
                                <div>
                                    <div className="font-bold text-slate-800">Default Branding</div>
                                    <div className="text-sm text-slate-500 font-medium">SHNOOR LMS Theme (Navy Blue)</div>
                                </div>
                            </div>
                            <button className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-slate-800 hover:border-slate-300 transition-all">
                                Customize
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default AdminProfileManagementView;
