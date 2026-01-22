import React from 'react';
import { FaBookReader, FaFire, FaTrophy, FaPlay, FaClock, FaCalendarAlt, FaArrowRight, FaChartLine } from 'react-icons/fa';

const StudentDashboardView = ({ studentName, enrolledCount, lastCourse, gamification, navigate }) => {
    return (
        <div className="space-y-8 font-sans text-slate-900">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-4 border-b border-slate-200 pb-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Overview</h1>
                    <p className="text-slate-500 mt-1">Welcome back, <span className="font-semibold text-slate-900">{studentName}</span>. Track your progress and deadlines.</p>
                </div>
                <button
                    onClick={() => navigate('/student/courses')}
                    className="flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
                >
                    Browse Catalog <FaArrowRight size={12} />
                </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <StatCard
                    label="Current Rank"
                    value={gamification.rank}
                    icon={<FaTrophy size={18} />}
                    subtext="Top 15% of students"
                    colorClass="text-indigo-600 bg-indigo-50"
                />
                <StatCard
                    label="Daily Streak"
                    value={`${gamification.streak} Days`}
                    icon={<FaFire size={18} />}
                    subtext="Keep it up!"
                    colorClass="text-rose-600 bg-rose-50"
                />
                <StatCard
                    label="XP Earned"
                    value={gamification.xp}
                    icon={<FaBoltIcon size={18} />}
                    subtext={`${gamification.nextLevelXP - gamification.xp} XP to next level`}
                    colorClass="text-amber-600 bg-amber-50"
                />
                <StatCard
                    label="Enrolled Courses"
                    value={enrolledCount}
                    icon={<FaBookReader size={18} />}
                    subtext="Active learning paths"
                    colorClass="text-emerald-600 bg-emerald-50"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content: Resume Learning */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-6">
                        <div className="flex items-center gap-2 mb-6">
                            <FaPlay className="text-indigo-600" size={14} />
                            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wide">Resume Learning</h3>
                        </div>

                        {lastCourse ? (
                            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                                <div className="h-24 w-24 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400 shrink-0 border border-slate-200">
                                    <FaBookReader size={32} />
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-xl font-bold text-slate-900 mb-2">{lastCourse.title || "Untitled Course"}</h2>
                                    <div className="w-full bg-slate-100 rounded-full h-2 mb-3">
                                        <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                                    </div>
                                    <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                                        <span>65% Complete</span>
                                        <span>Module 4: Advanced Concepts</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => navigate(`/student/course/${lastCourse.id}`)}
                                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-md text-sm transition-colors shrink-0"
                                >
                                    Continue
                                </button>
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <p className="text-slate-500 text-sm mb-4">You haven't started any courses yet.</p>
                                <button
                                    onClick={() => navigate('/student/courses')}
                                    className="px-6 py-2 bg-indigo-50 text-indigo-700 font-bold rounded-md text-sm hover:bg-indigo-100"
                                >
                                    Explore Courses
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Progress Table (Mini) */}
                    <div className="bg-white border border-slate-200 rounded-lg shadow-sm">
                        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center rounded-t-lg">
                            <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wide">Recent Activity</h3>
                            <button className="text-xs font-bold text-indigo-600 hover:underline">View All</button>
                        </div>
                        <div className="divide-y divide-slate-100">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="p-2 bg-slate-100 text-slate-500 rounded text-xs font-bold">
                                            MOD {i}
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold text-slate-900">Introduction to React Hooks</div>
                                            <div className="text-xs text-slate-500">Completed Quiz • 85% Score</div>
                                        </div>
                                    </div>
                                    <span className="text-xs font-medium text-slate-400">2h ago</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Sidebar: Deadlines */}
                <div className="space-y-6">
                    <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-6">
                        <div className="flex items-center gap-2 mb-6">
                            <FaClock className="text-rose-500" size={14} />
                            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wide">Upcoming Deadlines</h3>
                        </div>
                        <div className="space-y-4">
                            <DeadlineItem
                                title="React Final Project"
                                course="Web Development"
                                due="Tomorrow"
                                type="urgent"
                            />
                            <DeadlineItem
                                title="DevOps Pipeline Quiz"
                                course="DevOps"
                                due="Jan 15, 2026"
                                type="normal"
                            />
                            <DeadlineItem
                                title="UX Research Paper"
                                course="Design"
                                due="Jan 20, 2026"
                                type="normal"
                            />
                        </div>
                    </div>

                    <div className="bg-indigo-900 rounded-lg p-6 text-white relative overflow-hidden">
                        <div className="relative z-10">
                            <h3 className="font-bold text-lg mb-2">Practice Arena</h3>
                            <p className="text-indigo-200 text-sm mb-4">Sharpen your coding skills with daily challenges.</p>
                            <button
                                onClick={() => navigate('/student/practice')}
                                className="w-full py-2 bg-white text-indigo-900 font-bold rounded text-sm hover:bg-indigo-50 transition-colors"
                            >
                                Start Challenge
                            </button>
                        </div>
                        <FaClock className="absolute right-[-20px] bottom-[-20px] text-white/10 text-9xl" />
                    </div>
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ label, value, icon, subtext, colorClass }) => (
    <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm flex flex-col justify-between h-full">
        <div className="flex justify-between items-start mb-4">
            <div className="space-y-1">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wide">{label}</h4>
                <div className="text-2xl font-bold text-slate-900">{value}</div>
            </div>
            <div className={`p-2 rounded-md ${colorClass}`}>
                {icon}
            </div>
        </div>
        <div className="text-xs font-medium text-slate-400 border-t border-slate-100 pt-3 mt-auto">
            {subtext}
        </div>
    </div>
);

const DeadlineItem = ({ title, course, due, type }) => (
    <div className="flex items-start gap-3 p-3 rounded-md bg-slate-50 border border-slate-100 hover:border-slate-300 transition-colors cursor-pointer">
        <div className={`mt-1 w-2 h-2 rounded-full ${type === 'urgent' ? 'bg-rose-500' : 'bg-indigo-500'}`}></div>
        <div>
            <div className="text-sm font-bold text-slate-900">{title}</div>
            <div className="text-xs text-slate-500 mb-1">{course}</div>
            <div className={`text-xs font-bold ${type === 'urgent' ? 'text-rose-600' : 'text-slate-400'}`}>
                Due: {due}
            </div>
        </div>
    </div>
);

// Helper Icon
const FaBoltIcon = ({ size }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg>
);

export default StudentDashboardView;
