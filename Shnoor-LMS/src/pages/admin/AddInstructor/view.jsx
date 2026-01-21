import React from 'react';
import { FaChalkboardTeacher, FaUser, FaEnvelope, FaBook, FaPhone, FaInfoCircle } from 'react-icons/fa';

const AddInstructorView = ({ loading, data, handleChange, handleSubmit, navigate }) => {

    if (loading) return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-slate-500 font-medium">Adding instructor...</p>
            </div>
        </div>
    );

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex items-center gap-4 bg-slate-50/50">
                    <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center shadow-sm border border-indigo-200">
                        <FaChalkboardTeacher size={20} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-slate-900">Instructor Details</h2>
                        <p className="text-sm text-slate-500">Add a new instructor to the platform.</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700">Full Name</label>
                            <div className="relative">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                                    <FaUser />
                                </div>
                                <input
                                    name="fullName"
                                    value={data.fullName}
                                    onChange={handleChange}
                                    required
                                    placeholder="Dr. Smith"
                                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all font-medium"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700">Email Address</label>
                            <div className="relative">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                                    <FaEnvelope />
                                </div>
                                <input
                                    name="email"
                                    type="email"
                                    value={data.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="instructor@shnoor.com"
                                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all font-medium"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700">Subject / Specialization</label>
                            <div className="relative">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                                    <FaBook />
                                </div>
                                <input
                                    name="subject"
                                    value={data.subject}
                                    onChange={handleChange}
                                    required
                                    placeholder="Mathematics, ReactJS..."
                                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all font-medium"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700">Phone (Optional)</label>
                            <div className="relative">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                                    <FaPhone />
                                </div>
                                <input
                                    name="phone"
                                    value={data.phone}
                                    onChange={handleChange}
                                    placeholder="+1 234..."
                                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all font-medium"
                                />
                            </div>
                        </div>

                    </div>

                    <div className="space-y-2 mb-8">
                        <label className="text-sm font-bold text-slate-700">Bio (Optional)</label>
                        <div className="relative">
                            <div className="absolute left-4 top-4 text-slate-400">
                                <FaInfoCircle />
                            </div>
                            <textarea
                                name="bio"
                                value={data.bio}
                                onChange={handleChange}
                                rows="5"
                                placeholder="Short biography..."
                                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none resize-none transition-all font-medium"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-4 pt-6 border-t border-slate-100">
                        <button
                            type="button"
                            onClick={() => navigate('/admin/dashboard')}
                            className="px-6 py-2.5 rounded-xl font-bold text-slate-600 hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-10 py-2.5 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-500/30 hover:bg-indigo-700 hover:-translate-y-0.5 transition-all"
                        >
                            Add Instructor
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddInstructorView;
