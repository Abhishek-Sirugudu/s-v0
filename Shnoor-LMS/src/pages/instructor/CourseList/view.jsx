import React from 'react';
import { FaFolder, FaPlus, FaTrash, FaEdit, FaBookOpen } from 'react-icons/fa';

const CourseListView = ({ loading, courses, navigate, handleDelete }) => {

    const getStatusColor = (status) => {
        switch (status) {
            case 'published': return 'bg-emerald-500 border-emerald-500 text-emerald-700 bg-emerald-50';
            case 'pending': return 'bg-amber-500 border-amber-500 text-amber-700 bg-amber-50';
            case 'rejected': return 'bg-red-500 border-red-500 text-red-700 bg-red-50';
            default: return 'bg-slate-500 border-slate-500 text-slate-700 bg-slate-50';
        }
    };

    if (loading) return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-slate-500 font-medium">Loading your library...</p>
            </div>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto pb-12">
            <div className="flex justify-between items-center mb-8 border-b border-slate-200 pb-6">
                <h3 className="text-2xl font-bold text-slate-900">My Courses</h3>
                <button
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded-xl transition-all shadow-lg shadow-blue-500/20 flex items-center gap-2"
                    onClick={() => navigate('/instructor/add-course')}
                >
                    <FaPlus /> Create New Course
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {courses.length === 0 ? (
                    <div className="col-span-full py-16 text-center bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl">
                        <FaBookOpen size={48} className="text-slate-300 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-slate-700 mb-2">No courses yet.</h3>
                        <p className="text-slate-500 mb-6">Start teaching today by creating your first course!</p>
                        <button
                            className="bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold py-2 px-6 rounded-lg transition-colors"
                            onClick={() => navigate('/instructor/add-course')}
                        >
                            Create Course
                        </button>
                    </div>
                ) : (
                    courses.map(course => {
                        const statusClasses = getStatusColor(course.status);

                        return (
                            <div
                                key={course.id}
                                className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden cursor-pointer hover:shadow-md hover:-translate-y-1 transition-all group relative"
                                onClick={() => navigate(`/instructor/add-course?edit=${course.id}`, { state: { courseData: course } })}
                            >
                                { }
                                <div className={`h-1.5 w-full ${statusClasses.split(' ')[0]}`}></div>

                                <div className="p-5">
                                    { }
                                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 p-1.5 rounded-lg shadow-sm border border-slate-100 backdrop-blur-sm z-10">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); navigate(`/instructor/add-course?edit=${course.id}`, { state: { courseData: course } }) }}
                                            className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                                            title="Edit Course"
                                        >
                                            <FaEdit size={14} />
                                        </button>
                                        <button
                                            onClick={(e) => handleDelete(e, course.id, course.status)}
                                            className={`p-1.5 rounded transition-colors ${course.status === 'published'
                                                    ? 'text-slate-300 cursor-not-allowed'
                                                    : 'text-slate-400 hover:text-red-500 hover:bg-red-50'
                                                }`}
                                            title="Delete Course"
                                            disabled={course.status === 'published'}
                                        >
                                            <FaTrash size={14} />
                                        </button>
                                    </div>

                                    { }
                                    <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-blue-50 group-hover:text-blue-200 transition-colors">
                                        <FaFolder size={32} />
                                    </div>

                                    { }
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-start gap-2">
                                            <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full truncate max-w-[50%]">
                                                {course.category}
                                            </span>
                                            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${statusClasses.split(' ').slice(2).join(' ')}`}>
                                                {course.status}
                                            </span>
                                        </div>

                                        <h4 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 min-h-[3rem]">
                                            {course.title}
                                        </h4>

                                        <div className="flex justify-between items-center pt-2 border-t border-slate-100 text-xs text-slate-500 font-medium">
                                            <span>{course.modules ? course.modules.length : 0} Modules</span>
                                            <span>{course.createdAt ? new Date(course.createdAt).toLocaleDateString() : 'N/A'}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default CourseListView;
