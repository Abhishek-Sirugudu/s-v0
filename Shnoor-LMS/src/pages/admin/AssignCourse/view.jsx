import React from 'react';
import { FaUserPlus, FaSearch, FaBook, FaUser, FaCheckCircle, FaEnvelope } from 'react-icons/fa';

const AssignCourseView = ({
    loading, filteredStudents, courses,
    selectedStudents, selectedCourses,
    searchStudent, setSearchStudent,
    toggleStudent, toggleCourse, handleAssign
}) => {

    if (loading) return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-slate-500 font-medium">Loading assignment data...</p>
            </div>
        </div>
    );

    return (
        <div className="p-6 h-[calc(100vh-6rem)] flex flex-col">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 flex-1 flex flex-col overflow-hidden">
                <form onSubmit={handleAssign} className="flex-1 flex flex-col h-full">

                    <div className="flex flex-1 overflow-hidden divide-x divide-slate-200">

                        {/* Students Column */}
                        <div className="flex-1 flex flex-col min-w-0 bg-slate-50/30">
                            <div className="p-6 border-b border-slate-100 bg-white">
                                <h3 className="flex items-center gap-2 text-lg font-bold text-slate-800 mb-4">
                                    <FaUser className="text-blue-600" /> Select Students
                                    {selectedStudents.length > 0 &&
                                        <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full">{selectedStudents.length}</span>
                                    }
                                </h3>

                                <div className="relative">
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 z-10">
                                        <FaSearch />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Search student..."
                                        value={searchStudent}
                                        onChange={(e) => setSearchStudent(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all font-medium"
                                    />
                                </div>
                            </div>

                            <div className="flex-1 overflow-y-auto p-4 space-y-2">
                                {filteredStudents.map(s => (
                                    <div
                                        key={s.id}
                                        onClick={() => toggleStudent(s.id)}
                                        className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all group ${selectedStudents.includes(s.id)
                                                ? 'bg-blue-50 border-blue-500 shadow-sm'
                                                : 'bg-white border-slate-200 hover:border-blue-300 hover:shadow-sm'
                                            }`}
                                    >
                                        <div className="min-w-0">
                                            <div className={`font-bold truncate ${selectedStudents.includes(s.id) ? 'text-blue-800' : 'text-slate-700'}`}>{s.name}</div>
                                            <div className="flex items-center gap-1.5 text-xs text-slate-500 truncate">
                                                <FaEnvelope size={10} className="text-slate-400" /> {s.email}
                                            </div>
                                        </div>
                                        <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors ${selectedStudents.includes(s.id) ? 'text-blue-600' : 'text-slate-200 group-hover:text-blue-300'
                                            }`}>
                                            <FaCheckCircle size={20} />
                                        </div>
                                    </div>
                                ))}
                                {filteredStudents.length === 0 && (
                                    <div className="text-center py-12 text-slate-400 border-2 border-dashed border-slate-200 rounded-xl">
                                        No students found matching "{searchStudent}"
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Courses Column */}
                        <div className={`flex-1 flex flex-col min-w-0 transition-opacity ${selectedStudents.length === 0 ? 'opacity-50 pointer-events-none bg-slate-50' : 'bg-white'}`}>
                            <div className="p-6 border-b border-slate-100 bg-white">
                                <h3 className="flex items-center gap-2 text-lg font-bold text-slate-800 mb-1">
                                    <FaBook className="text-indigo-600" /> Select Courses
                                    {selectedCourses.length > 0 &&
                                        <span className="bg-indigo-100 text-indigo-700 text-xs px-2 py-0.5 rounded-full">{selectedCourses.length}</span>
                                    }
                                </h3>
                                <p className="text-xs text-slate-500 font-medium h-6 flex items-center">
                                    {selectedStudents.length === 0 ? 'Select students first' : 'Choose courses to assign'}
                                </p>
                            </div>

                            <div className="flex-1 overflow-y-auto p-4 space-y-2 relative">
                                {selectedStudents.length === 0 && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-[1px] z-10">
                                        <div className="bg-white px-6 py-4 rounded-xl shadow-lg border border-slate-200 text-slate-600 font-bold flex items-center gap-2">
                                            <FaCheckCircle className="text-slate-400" /> Select at least one student
                                        </div>
                                    </div>
                                )}

                                {courses.map(c => (
                                    <div
                                        key={c.id}
                                        onClick={() => toggleCourse(c.id)}
                                        className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all group ${selectedCourses.includes(c.id)
                                                ? 'bg-indigo-50 border-indigo-500 shadow-sm'
                                                : 'bg-white border-slate-200 hover:border-indigo-300 hover:shadow-sm'
                                            }`}
                                    >
                                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors shrink-0 ${selectedCourses.includes(c.id) ? 'bg-indigo-200 text-indigo-700' : 'bg-slate-100 text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-500'
                                            }`}>
                                            <FaBook size={16} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className={`font-bold truncate ${selectedCourses.includes(c.id) ? 'text-indigo-900' : 'text-slate-700'}`}>{c.title}</div>
                                            <div className="text-xs text-slate-500 truncate">Instructor: {c.instructor}</div>
                                        </div>
                                        <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors ${selectedCourses.includes(c.id) ? 'text-indigo-600' : 'text-slate-200 group-hover:text-indigo-300'
                                            }`}>
                                            <FaCheckCircle size={20} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end shrink-0">
                        <button
                            type="submit"
                            disabled={selectedStudents.length === 0 || selectedCourses.length === 0}
                            className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold shadow-lg transition-all ${selectedStudents.length === 0 || selectedCourses.length === 0
                                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-blue-500/30 hover:shadow-xl hover:-translate-y-0.5'
                                }`}
                        >
                            <FaCheckCircle />
                            {selectedStudents.length > 0 && selectedCourses.length > 0
                                ? `Assign ${selectedCourses.length} Course${selectedCourses.length > 1 ? 's' : ''} to ${selectedStudents.length} Student${selectedStudents.length > 1 ? 's' : ''}`
                                : 'Confirm Assignment'
                            }
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default AssignCourseView;
