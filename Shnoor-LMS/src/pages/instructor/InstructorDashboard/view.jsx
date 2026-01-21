import React from 'react';
import { FaBookOpen, FaUserGraduate, FaStar, FaPlus, FaFolderOpen, FaEnvelope, FaArrowRight } from 'react-icons/fa';

const InstructorDashboardView = ({ loading, userName, stats, navigate }) => {

    if (loading) return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-slate-500 font-medium">Loading dashboard...</p>
            </div>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto pb-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">Hello, {userName}! 👋</h2>
                    <p className="text-slate-500 mt-1">Here's what's happening with your courses today.</p>
                </div>
                <div className="px-4 py-1.5 bg-blue-50 text-blue-700 border border-blue-100 rounded-full text-sm font-bold shadow-sm">
                    Instructor Portal
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Courses Stat */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm border-l-4 border-l-amber-400">
                    <div className="flex justify-between items-center">
                        <div>
                            <span className="text-sm font-bold text-slate-500 uppercase tracking-wide">My Courses</span>
                            <div className="text-3xl font-bold text-slate-900 mt-2">{stats.myCourses}</div>
                        </div>
                        <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center">
                            <FaBookOpen size={24} />
                        </div>
                    </div>
                </div>

                {/* Students Stat */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm border-l-4 border-l-blue-800">
                    <div className="flex justify-between items-center">
                        <div>
                            <span className="text-sm font-bold text-slate-500 uppercase tracking-wide">Students Enrolled</span>
                            <div className="text-3xl font-bold text-slate-900 mt-2">{stats.totalStudents}</div>
                        </div>
                        <div className="w-12 h-12 bg-blue-100 text-blue-800 rounded-xl flex items-center justify-center">
                            <FaUserGraduate size={24} />
                        </div>
                    </div>
                </div>

                {/* Rating Stat */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm border-l-4 border-l-amber-400">
                    <div className="flex justify-between items-center">
                        <div>
                            <span className="text-sm font-bold text-slate-500 uppercase tracking-wide">Avg. Rating</span>
                            <div className="text-3xl font-bold text-slate-900 mt-2 flex items-baseline gap-1">
                                {stats.avgRating} <span className="text-base text-slate-400 font-normal">/ 5</span>
                            </div>
                        </div>
                        <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center">
                            <FaStar size={24} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Analytics Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-slate-900">Student Performance Analytics</h3>
                        <button
                            className="text-sm text-blue-600 font-bold hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
                            onClick={() => navigate('/instructor/performance')}
                        >
                            View Report <FaArrowRight size={12} />
                        </button>
                    </div>

                    <div className="flex items-end justify-between h-48 gap-4 pt-4">
                        {[
                            { label: 'React Basics', value: 85 },
                            { label: 'Adv. Node.js', value: 65 },
                            { label: 'UI/UX Design', value: 92 },
                            { label: 'Python Intro', value: 78 }
                        ].map((item, index) => (
                            <div key={index} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group cursor-pointer">
                                <div className="text-xs font-bold text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity mb-1 transform translate-y-2 group-hover:translate-y-0">{item.value}%</div>
                                <div
                                    className={`w-full max-w-[50px] rounded-t-lg transition-all duration-500 ${item.value > 80 ? 'bg-amber-400' : 'bg-slate-700'} hover:opacity-90`}
                                    style={{ height: `${item.value}%` }}
                                ></div>
                                <div className="text-xs font-medium text-slate-400 text-center truncate w-full">{item.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div>
                <h3 className="text-xl font-bold text-slate-900 mb-6">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <button
                        className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all flex items-center gap-4 text-left group"
                        onClick={() => navigate('/instructor/add-course')}
                    >
                        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                            <FaPlus />
                        </div>
                        <div>
                            <div className="font-bold text-slate-800">Create New Course</div>
                            <div className="text-xs text-slate-500 mt-0.5">Start building content</div>
                        </div>
                    </button>

                    <button
                        className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all flex items-center gap-4 text-left group"
                        onClick={() => navigate('/instructor/courses')}
                    >
                        <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center shrink-0 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                            <FaFolderOpen />
                        </div>
                        <div>
                            <div className="font-bold text-slate-800">Manage Courses</div>
                            <div className="text-xs text-slate-500 mt-0.5">View/Edit your library</div>
                        </div>
                    </button>

                    <button
                        className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all flex items-center gap-4 text-left group"
                        onClick={() => navigate('/instructor/chat')}
                    >
                        <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                            <FaEnvelope />
                        </div>
                        <div>
                            <div className="font-bold text-slate-800">Message Students</div>
                            <div className="text-xs text-slate-500 mt-0.5">Broadcast announcements</div>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InstructorDashboardView;
