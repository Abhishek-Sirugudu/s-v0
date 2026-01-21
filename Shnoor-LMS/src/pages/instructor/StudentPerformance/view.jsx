import React from 'react';
import { FaArrowLeft, FaSearch, FaExclamationTriangle, FaCheckCircle, FaChartLine, FaEnvelope } from 'react-icons/fa';

const StudentPerformanceView = ({
    searchTerm, setSearchTerm,
    students, filteredStudents, navigate
}) => {

    const getStatusColor = (status) => {
        switch (status) {
            case 'Excellent': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
            case 'Good': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'At Risk': return 'bg-red-100 text-red-800 border-red-200';
            default: return 'bg-slate-100 text-slate-800';
        }
    };

    return (
        <div className="max-w-7xl mx-auto pb-12">
            { }
            <div className="flex items-center gap-4 mb-8">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 bg-white border border-slate-200 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors"
                >
                    <FaArrowLeft />
                </button>
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">Student Performance</h2>
                    <p className="text-slate-500">Track progress and identify students who need help.</p>
                </div>
            </div>

            { }
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                { }
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm border-l-4 border-l-blue-600">
                    <div className="flex justify-between items-center">
                        <div>
                            <span className="text-sm font-bold text-slate-500 uppercase">Total Students</span>
                            <div className="text-3xl font-bold text-slate-900 mt-2">{students.length}</div>
                        </div>
                        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                            <FaChartLine size={24} />
                        </div>
                    </div>
                </div>

                { }
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm border-l-4 border-l-red-500">
                    <div className="flex justify-between items-center">
                        <div>
                            <span className="text-sm font-bold text-slate-500 uppercase">At Risk</span>
                            <div className="text-3xl font-bold text-red-600 mt-2">
                                {students.filter(s => s.status === 'At Risk').length}
                            </div>
                        </div>
                        <div className="w-12 h-12 bg-red-100 text-red-500 rounded-xl flex items-center justify-center">
                            <FaExclamationTriangle size={24} />
                        </div>
                    </div>
                </div>

                { }
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm border-l-4 border-l-emerald-500">
                    <div className="flex justify-between items-center">
                        <div>
                            <span className="text-sm font-bold text-slate-500 uppercase">High Performers</span>
                            <div className="text-3xl font-bold text-emerald-600 mt-2">
                                {students.filter(s => s.status === 'Excellent').length}
                            </div>
                        </div>
                        <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center">
                            <FaCheckCircle size={24} />
                        </div>
                    </div>
                </div>
            </div>

            { }
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
                    <h3 className="text-lg font-bold text-slate-900">Enrolled Students</h3>

                    <div className="relative w-full md:w-72">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                            <FaSearch />
                        </div>
                        <input
                            type="text"
                            className="block w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            placeholder="Search student or course..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-bold">
                            <tr>
                                <th className="px-6 py-4">Student Name</th>
                                <th className="px-6 py-4">Course</th>
                                <th className="px-6 py-4">Progress</th>
                                <th className="px-6 py-4">Avg. Score</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredStudents.length > 0 ? (
                                filteredStudents.map(student => (
                                    <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-slate-800">{student.name}</div>
                                            <div className="text-xs text-slate-400">ID: STD-{student.id}00</div>
                                        </td>
                                        <td className="px-6 py-4 text-slate-600 font-medium">{student.course}</td>
                                        <td className="px-6 py-4">
                                            <div className="w-32 bg-slate-100 rounded-full h-2 mb-1">
                                                <div
                                                    className={`h-2 rounded-full ${student.progress < 30 ? 'bg-red-500' : 'bg-blue-600'}`}
                                                    style={{ width: `${student.progress}%` }}
                                                ></div>
                                            </div>
                                            <div className="text-xs text-slate-500">{student.progress}% Completed</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`font-bold ${student.score < 60 ? 'text-red-500' : 'text-slate-700'}`}>
                                                {student.score}%
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-bold border ${getStatusColor(student.status)}`}>
                                                {student.status.toUpperCase()}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all text-xs font-bold"
                                                onClick={() => navigate('/instructor/chat')}
                                            >
                                                <FaEnvelope /> Message
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="px-6 py-12 text-center text-slate-500">
                                        <p className="font-medium">No students found matching your search.</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default StudentPerformanceView;
