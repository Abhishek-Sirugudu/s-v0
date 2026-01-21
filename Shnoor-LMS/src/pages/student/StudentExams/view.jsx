import React from 'react';
import { FaClipboardList, FaCheckCircle, FaPlay, FaClock, FaLock, FaExternalLinkAlt } from 'react-icons/fa';

const StudentExamsView = ({ loading, exams, isPassed, accessStatus, courseNames, navigate }) => {

    if (loading) return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-slate-500 font-medium">Loading exams...</p>
            </div>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto pb-12">
            <div className="mb-8">
                <h3 className="text-2xl font-bold text-slate-900">My Exams</h3>
                <p className="text-slate-500 mt-1">Take assessments to prove your skills.</p>
            </div>

            {exams.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl text-center">
                    <FaClipboardList className="text-slate-300 text-6xl mb-4" />
                    <h3 className="text-xl font-bold text-slate-700 mb-2">No Exams Available</h3>
                    <p className="text-slate-500">You don't have any assigned exams yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {exams.map((exam, index) => {
                        const passed = isPassed(exam.id);
                        const unlocked = accessStatus[exam.id] !== false;
                        const neededCourseName = courseNames[exam.linkedCourseId] || 'Prerequisite Course';

                        // Gradient array compatible with Tailwind
                        const gradients = [
                            'from-blue-500 to-cyan-400',
                            'from-purple-500 to-pink-400',
                            'from-emerald-500 to-teal-400',
                            'from-amber-500 to-orange-400'
                        ];
                        const gradientClass = gradients[index % gradients.length];

                        return (
                            <div
                                key={exam.id}
                                className={`bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col hover:shadow-md hover:-translate-y-1 transition-all duration-300 ${!unlocked ? 'opacity-90' : ''}`}
                            >
                                {/* Thumbnail */}
                                <div className={`h-40 bg-gradient-to-br ${gradientClass} flex items-center justify-center relative`}>
                                    {passed ? (
                                        <FaCheckCircle className="text-white/90 text-6xl drop-shadow-md" />
                                    ) : !unlocked ? (
                                        <FaLock className="text-white/50 text-5xl" />
                                    ) : (
                                        <FaClipboardList className="text-white/30 text-6xl" />
                                    )}
                                </div>

                                {/* Content */}
                                <div className="p-6 flex flex-col flex-1">
                                    <h4 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2 min-h-[3.5rem]">{exam.title}</h4>

                                    <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 mb-6 uppercase tracking-wider">
                                        <span>{exam.questions.length} Questions</span>
                                        <span className="flex items-center gap-1"><FaClock /> {exam.duration} mins</span>
                                    </div>

                                    <div className="mt-auto">
                                        {passed ? (
                                            <>
                                                <div className="flex items-center justify-center gap-2 text-emerald-600 font-bold bg-emerald-50 py-2 rounded-lg mb-3">
                                                    <FaCheckCircle /> Passed
                                                </div>
                                                <button
                                                    className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 rounded-xl transition-colors"
                                                    onClick={() => navigate('/student/certificates')}
                                                >
                                                    View Certificate
                                                </button>
                                            </>
                                        ) : !unlocked ? (
                                            <>
                                                <div className="flex items-center gap-2 text-red-500 font-bold mb-2">
                                                    <FaLock size={14} /> Locked
                                                </div>
                                                <div className="text-xs text-slate-500 mb-4 bg-slate-50 p-3 rounded-lg border border-slate-100">
                                                    Complete <span className="font-bold text-slate-700">{neededCourseName}</span> to unlock this exam.
                                                </div>
                                                <button
                                                    className="w-full btn-secondary py-2.5 rounded-xl flex items-center justify-center gap-2 text-sm"
                                                    onClick={() => navigate(`/student/course/${exam.linkedCourseId}`)}
                                                >
                                                    <FaExternalLinkAlt /> Go to Course
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <div className="flex justify-between items-center text-xs font-semibold text-slate-500 mb-3">
                                                    <span>Pass Score: {exam.passScore}%</span>
                                                </div>
                                                <button
                                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
                                                    onClick={() => navigate(`/student/exam/${exam.id}`)}
                                                >
                                                    <FaPlay size={12} /> Start Exam
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default StudentExamsView;
