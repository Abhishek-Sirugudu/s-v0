import React from 'react';
import { FaCheckCircle, FaTimesCircle, FaPlay, FaFileAlt } from 'react-icons/fa';

const ApproveCoursesView = ({ loading, pendingCourses, selectedCourse, setSelectedCourse, handleAction }) => {

    if (loading) return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-slate-500 font-medium">Loading courses queue...</p>
            </div>
        </div>
    );

    return (
        <div className="h-[calc(100vh-6rem)] flex flex-col p-6 bg-slate-50">
            {/* Header */}
            <div className="flex justify-between items-center mb-6 shrink-0">
                <h2 className="text-2xl font-bold text-slate-800">Course Approval Queue</h2>
                <div className="bg-amber-100 text-amber-700 px-4 py-2 rounded-xl font-bold text-sm border border-amber-200 shadow-sm animate-pulse">
                    {pendingCourses.length} Pending
                </div>
            </div>

            {/* Content Area */}
            <div className={`flex flex-1 gap-6 overflow-hidden ${selectedCourse ? 'grid grid-cols-1 lg:grid-cols-[1fr_450px]' : ''}`}>

                {/* Courses List */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col transition-all duration-300">
                    <div className="overflow-y-auto flex-1">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-slate-50 border-b border-slate-200 sticky top-0 z-10 text-xs font-bold text-slate-500 uppercase">
                                <tr>
                                    <th className="py-4 px-6">Course Title</th>
                                    <th className="py-4 px-6 md:table-cell hidden">Instructor</th>
                                    <th className="py-4 px-6">Category</th>
                                    <th className="py-4 px-6 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {pendingCourses.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="text-center py-16 text-slate-400">
                                            No courses pending approval.
                                        </td>
                                    </tr>
                                ) : (
                                    pendingCourses.map(course => (
                                        <tr
                                            key={course.id}
                                            onClick={() => setSelectedCourse(course)}
                                            className={`cursor-pointer transition-all hover:bg-slate-50 group border-l-4 ${selectedCourse?.id === course.id
                                                    ? 'bg-blue-50 border-blue-600'
                                                    : 'border-transparent hover:border-slate-300'
                                                }`}
                                        >
                                            <td className="py-4 px-6 font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                                                {course.title}
                                            </td>
                                            <td className="py-4 px-6 text-slate-600 md:table-cell hidden">
                                                {course.instructorName || course.instructorId}
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200">
                                                    {course.category}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6 text-right">
                                                <button className="text-xs font-bold text-slate-500 border border-slate-300 px-3 py-1.5 rounded-lg hover:bg-white hover:border-slate-400 shadow-sm transition-all bg-slate-50">
                                                    Review
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Details Panel */}
                {selectedCourse && (
                    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 flex flex-col overflow-hidden animate-slide-in-right h-full">
                        {/* Details Header */}
                        <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-start gap-4">
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 leading-tight mb-2">{selectedCourse.title}</h3>
                                <p className="text-sm text-slate-500 font-medium">
                                    <span className="text-slate-900">{selectedCourse.category}</span> • Instructor: {selectedCourse.instructorName || 'Unknown'}
                                </p>
                            </div>
                            <button
                                onClick={() => setSelectedCourse(null)}
                                className="text-slate-400 hover:text-slate-600 transition-colors p-1"
                            >
                                <FaTimesCircle size={20} />
                            </button>
                        </div>

                        {/* Details Content */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            <div>
                                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Description</h4>
                                <p className="text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100 text-sm">
                                    {selectedCourse.description}
                                </p>
                            </div>

                            <div>
                                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">
                                    Content ({selectedCourse.modules ? selectedCourse.modules.length : 0} Modules)
                                </h4>
                                <div className="space-y-2">
                                    {selectedCourse.modules && selectedCourse.modules.map((m, idx) => (
                                        <div key={idx} className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${m.type === 'video' ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-blue-500'
                                                }`}>
                                                {m.type === 'video' ? <FaPlay size={10} /> : <FaFileAlt size={12} />}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="font-bold text-slate-800 text-sm truncate">{m.title}</div>
                                                <div className="text-[10px] uppercase font-bold text-slate-400">
                                                    {m.type} • {m.duration} mins
                                                </div>
                                            </div>
                                            {m.url && (
                                                <a
                                                    href={m.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-xs font-bold text-blue-600 hover:underline px-2"
                                                >
                                                    View
                                                </a>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Actions Footer */}
                        <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex gap-4">
                            <button
                                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-50 text-red-600 rounded-xl font-bold border border-red-100 hover:bg-red-100 transition-colors text-sm"
                                onClick={() => handleAction(selectedCourse.id, 'rejected')}
                            >
                                <FaTimesCircle /> Reject
                            </button>
                            <button
                                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-emerald-600 text-white rounded-xl font-bold shadow-lg shadow-emerald-500/20 hover:bg-emerald-700 transition-all text-sm"
                                onClick={() => handleAction(selectedCourse.id, 'published')}
                            >
                                <FaCheckCircle /> Approve
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ApproveCoursesView;
