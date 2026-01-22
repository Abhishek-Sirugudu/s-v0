import React from 'react';
import { FaCode, FaCheckCircle, FaFilter } from 'react-icons/fa';

const PracticeAreaView = ({ loading, filter, setFilter, filteredChallenges, navigate }) => {

    const getDifficultyColor = (diff) => {
        switch (diff) {
            case 'Easy': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
            case 'Medium': return 'bg-amber-100 text-amber-700 border-amber-200';
            case 'Hard': return 'bg-red-100 text-red-700 border-red-200';
            default: return 'bg-slate-100 text-slate-700';
        }
    };

    if (loading) return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-slate-500 font-medium">Loading challenges...</p>
            </div>
        </div>
    );

    return (
        <div className="w-full pb-12">
            { }
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">Practice Arena</h2>
                    <p className="text-slate-500 mt-1">Sharpen your coding skills with these challenges.</p>
                </div>

                <div className="flex items-center gap-3 bg-white p-1.5 rounded-xl shadow-sm border border-slate-200">
                    <div className="pl-3 text-slate-400">
                        <FaFilter />
                    </div>
                    <select
                        className="bg-transparent border-none text-sm font-bold text-slate-700 focus:ring-0 cursor-pointer py-1.5 pr-8 pl-1"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    >
                        <option value="All">All Levels</option>
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                    </select>
                </div>
            </div>

            { }
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredChallenges.length === 0 ? (
                    <div className="col-span-full py-16 text-center bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl">
                        <FaCode className="text-slate-300 text-5xl mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-slate-700 mb-2">No Challenges Found</h3>
                        <p className="text-slate-500">No challenges match your selected filter.</p>
                    </div>
                ) : (
                    filteredChallenges.map((challenge, index) => (
                        <div
                            key={challenge.id}
                            className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden hover:border-indigo-300 hover:shadow-md transition-all duration-300 cursor-pointer group flex flex-col h-full"
                            onClick={() => navigate(`/student/practice/session/${challenge.id}`)}
                        >
                            <div className="h-40 bg-slate-50 border-b border-slate-100 relative flex items-center justify-center overflow-hidden">
                                <FaCode className="text-slate-300 text-5xl relative z-10 group-hover:text-indigo-500 transition-all duration-300" />

                                <span className={`absolute top-4 right-4 px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${challenge.difficulty === 'Easy' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                                    challenge.difficulty === 'Medium' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                                        'bg-rose-50 text-rose-600 border-rose-100'
                                    }`}>
                                    {challenge.difficulty}
                                </span>
                            </div>

                            <div className="p-6 flex flex-col flex-1">
                                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{challenge.title}</h3>
                                <p className="text-slate-500 text-sm line-clamp-2 mb-6 flex-1">{challenge.text}</p>

                                <div className="pt-4 border-t border-slate-100 flex justify-between items-center mt-auto">
                                    <span className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                        <FaCode /> {challenge.type === 'coding' ? 'Coding' : 'Quiz'}
                                        {challenge.status === 'Solved' && <FaCheckCircle className="text-emerald-500" />}
                                    </span>
                                    <button className="bg-white border border-slate-200 text-slate-600 hover:border-indigo-500 hover:text-indigo-600 text-xs font-bold px-4 py-2 rounded transition-colors">
                                        Solve Challenge
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default PracticeAreaView;
