import React from 'react';
import { FaBookReader, FaFire, FaMedal, FaPlayCircle, FaTrophy, FaBolt, FaClock, FaExclamationCircle, FaCalendarAlt } from 'react-icons/fa';

const StudentDashboardView = ({ studentName, enrolledCount, lastCourse, gamification, navigate }) => {
    return (
        <div className="space-y-8 animate-fade-in">
            {/* Welcome Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-1">Welcome back, {studentName}! 👋</h2>
                    <p className="text-slate-500">Ready to level up? You have <span className="font-semibold text-blue-600">{enrolledCount} active courses</span>.</p>
                </div>
                <div
                    onClick={() => navigate('/student/leaderboard')}
                    className="group bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center gap-4 cursor-pointer hover:bg-white hover:shadow-md hover:border-blue-100 transition-all duration-300 w-full md:w-auto min-w-[220px]"
                >
                    <div className="flex flex-col items-end flex-grow">
                        <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-0.5">Current Rank</div>
                        <div className="text-blue-600 font-bold text-lg whitespace-nowrap group-hover:scale-105 transition-transform">{gamification.rank}</div>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-blue-100 border-2 border-white shadow-sm flex items-center justify-center text-blue-600 flex-shrink-0 group-hover:rotate-12 transition-transform">
                        <FaTrophy className="text-xl" />
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Daily Streak Card */}
                <div
                    className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 cursor-pointer relative overflow-hidden group hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                    onClick={() => navigate('/student/leaderboard')}
                >
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-violet-500 to-fuchsia-500"></div>
                    <div className="flex justify-between items-start z-10 relative">
                        <div>
                            <span className="flex items-center gap-1.5 text-sm font-semibold text-slate-500 mb-2">
                                <FaBolt className="text-amber-400" /> Daily Streak
                            </span>
                            <div className="flex items-baseline gap-2">
                                <span className="text-3xl font-extrabold text-slate-900">{gamification.streak}</span>
                                <span className="text-sm text-slate-400 font-medium">days</span>
                            </div>
                        </div>
                        <div className="bg-orange-50 p-3 rounded-xl text-orange-500 group-hover:scale-110 transition-transform duration-300">
                            <FaFire size={24} />
                        </div>
                    </div>
                    <div className="mt-6">
                        <div className="flex justify-between text-xs font-medium text-slate-400 mb-2">
                            <span>XP Progress</span>
                            <span>{gamification.xp} / {gamification.nextLevelXP}</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                            <div
                                className="bg-gradient-to-r from-violet-500 to-fuchsia-500 h-full rounded-full transition-all duration-1000 ease-out"
                                style={{ width: `${gamification.progress}%` }}
                            ></div>
                        </div>
                    </div>
                </div>

                {/* Enrolled Courses Card */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-400 to-orange-400"></div>
                    <div className="flex justify-between items-center h-full">
                        <div>
                            <span className="text-sm font-semibold text-slate-500 block mb-2">Enrolled Courses</span>
                            <div className="text-3xl font-extrabold text-slate-900">{enrolledCount}</div>
                        </div>
                        <div className="bg-amber-50 p-3 rounded-xl text-amber-500 group-hover:scale-110 transition-transform duration-300">
                            <FaBookReader size={24} />
                        </div>
                    </div>
                </div>

                {/* Assignments Card */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 to-cyan-400"></div>
                    <div className="flex justify-between items-center h-full">
                        <div>
                            <span className="text-sm font-semibold text-slate-500 block mb-2">Assignments</span>
                            <div className="text-3xl font-extrabold text-slate-900">0</div>
                        </div>
                        <div className="bg-cyan-50 p-3 rounded-xl text-cyan-500 group-hover:scale-110 transition-transform duration-300">
                            <FaMedal size={24} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Resume Course Banner */}
            {lastCourse ? (
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-700 to-indigo-600 shadow-lg text-white p-8 flex flex-col md:flex-row items-center justify-between gap-6 group">
                    <div className="relative z-10">
                        <h3 className="text-2xl font-bold mb-2">Jump back in!</h3>
                        <p className="text-blue-100 mb-6 max-w-md">Continue where you left off in your learning journey.</p>
                        <button
                            onClick={() => navigate(`/student/course/${lastCourse.id}`)}
                            className="bg-white text-blue-700 hover:bg-blue-50 font-bold py-3 px-6 rounded-xl flex items-center gap-2 transition-all transform hover:scale-105 shadow-md"
                        >
                            <FaPlayCircle /> Resume Course
                        </button>
                    </div>
                    {/* Decorative Icon */}
                    <div className="hidden md:block absolute right-10 bottom-[-20px] text-white/10 transform rotate-12 group-hover:rotate-0 transition-transform duration-500">
                        <FaPlayCircle size={140} />
                    </div>
                    {/* Abstract Shapes */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                </div>
            ) : (
                <div className="bg-white border-2 border-dashed border-slate-200 rounded-2xl p-10 text-center">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                        <FaBookReader size={24} />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">Start your learning journey</h3>
                    <p className="text-slate-500 mb-6">You haven't started any courses yet. Explore our catalog.</p>
                    <button
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-6 rounded-lg transition-colors shadow-lg shadow-blue-500/30"
                        onClick={() => navigate('/student/courses')}
                    >
                        Browse Catalog
                    </button>
                </div>
            )}

            {/* Upcoming Deadlines */}
            <div>
                <div className="flex justify-between items-end mb-6">
                    <h3 className="text-lg font-bold text-slate-900">Upcoming Deadlines</h3>
                    <button
                        onClick={() => navigate('/student/courses')}
                        className="text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline"
                    >
                        My Learning
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Mock Deadline 1 */}
                    <div
                        onClick={() => navigate('/student/course/mock1/learn')}
                        className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm hover:shadow-md hover:border-red-100 transition-all cursor-pointer flex items-center gap-4 group"
                    >
                        <div className="w-12 h-12 rounded-lg bg-red-50 text-red-500 flex items-center justify-center flex-shrink-0 group-hover:bg-red-500 group-hover:text-white transition-colors">
                            <FaExclamationCircle className="text-xl" />
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-800 text-sm mb-0.5 group-hover:text-red-600 transition-colors">React Final Project</h4>
                            <p className="text-xs text-slate-500 mb-1">Web Development</p>
                            <span className="text-xs font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded-full inline-block">Due: Tomorrow</span>
                        </div>
                    </div>

                    {/* Mock Deadline 2 */}
                    <div
                        onClick={() => navigate('/student/course/mock5/learn')}
                        className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm hover:shadow-md hover:border-amber-100 transition-all cursor-pointer flex items-center gap-4 group"
                    >
                        <div className="w-12 h-12 rounded-lg bg-amber-50 text-amber-500 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                            <FaClock className="text-xl" />
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-800 text-sm mb-0.5 group-hover:text-amber-600 transition-colors">DevOps Pipeline Quiz</h4>
                            <p className="text-xs text-slate-500 mb-1">DevOps</p>
                            <span className="text-xs font-medium text-slate-500">Jan 15, 2026</span>
                        </div>
                    </div>

                    {/* Mock Deadline 3 */}
                    <div
                        onClick={() => navigate('/student/course/mock3/learn')}
                        className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-100 transition-all cursor-pointer flex items-center gap-4 group"
                    >
                        <div className="w-12 h-12 rounded-lg bg-blue-50 text-blue-500 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                            <FaCalendarAlt className="text-xl" />
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-800 text-sm mb-0.5 group-hover:text-blue-600 transition-colors">UX Research Paper</h4>
                            <p className="text-xs text-slate-500 mb-1">Design</p>
                            <span className="text-xs font-medium text-slate-500">Jan 20, 2026</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentDashboardView;
