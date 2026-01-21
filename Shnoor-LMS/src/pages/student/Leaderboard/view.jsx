import React from 'react';
import { FaTrophy, FaMedal, FaCrown } from 'react-icons/fa';

const LeaderboardView = ({ loading, topThree, rest, getRank }) => {

    if (loading) return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-slate-500 font-medium">Loading Rankings...</p>
            </div>
        </div>
    );

    return (
        <div className="max-w-5xl mx-auto pb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <FaTrophy className="text-yellow-500" /> Student Leaderboard
            </h2>
            <p className="text-slate-500 mb-12">Compete with peers and earn your place among the masters!</p>

            {/* Podium */}
            <div className="flex justify-center items-end gap-4 mb-16 h-72">
                {/* 2nd Place */}
                {topThree[1] && (
                    <div className="flex flex-col items-center animate-bounce-slow" style={{ animationDuration: '2.2s' }}>
                        <div className="w-20 h-20 rounded-full bg-slate-200 border-4 border-slate-300 flex items-center justify-center mb-3 overflow-hidden shadow-lg relative z-10">
                            <span className="text-2xl font-bold text-slate-500">{topThree[1].displayName[0]}</span>
                            <div className="absolute -top-1 -right-1 bg-slate-400 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border border-white">2</div>
                        </div>
                        <div className="text-center mb-2">
                            <div className="font-bold text-slate-700 text-sm truncate max-w-[100px]">{topThree[1].displayName}</div>
                            <div className="text-xs text-slate-500 font-mono font-bold">{topThree[1].xp} XP</div>
                        </div>
                        <div className="w-28 bg-gradient-to-t from-slate-300 to-slate-100 rounded-t-xl shadow-md h-32 flex items-end justify-center pb-4 border-t border-white/50">
                            <FaMedal className="text-slate-400 text-4xl drop-shadow-sm" />
                        </div>
                    </div>
                )}

                {/* 1st Place */}
                {topThree[0] && (
                    <div className="flex flex-col items-center z-20 animate-bounce-slow overflow-visible" style={{ animationDuration: '3s' }}>
                        <FaCrown className="text-yellow-500 text-4xl mb-2 rotate-12 drop-shadow-sm" />
                        <div className="w-28 h-28 rounded-full bg-yellow-100 border-4 border-yellow-400 flex items-center justify-center mb-3 overflow-hidden shadow-xl relative z-20 ring-4 ring-yellow-100">
                            <span className="text-4xl font-bold text-yellow-600">{topThree[0].displayName[0]}</span>
                            <div className="absolute -top-1 -right-1 bg-yellow-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold border-2 border-white text-sm shadow-sm">1</div>
                        </div>
                        <div className="text-center mb-2">
                            <div className="font-bold text-slate-900 text-base truncate max-w-[120px]">{topThree[0].displayName}</div>
                            <div className="text-sm text-yellow-600 font-mono font-bold bg-yellow-50 px-2 py-0.5 rounded-full inline-block mt-1 border border-yellow-200">{topThree[0].xp} XP</div>
                        </div>
                        <div className="w-36 bg-gradient-to-t from-yellow-300 to-yellow-100 rounded-t-xl shadow-lg h-48 flex items-end justify-center pb-6 border-t border-white/50">
                            <FaTrophy className="text-yellow-600 text-6xl drop-shadow-md" />
                        </div>
                    </div>
                )}

                {/* 3rd Place */}
                {topThree[2] && (
                    <div className="flex flex-col items-center animate-bounce-slow" style={{ animationDuration: '2.5s' }}>
                        <div className="w-20 h-20 rounded-full bg-amber-100 border-4 border-amber-300 flex items-center justify-center mb-3 overflow-hidden shadow-lg relative z-10">
                            <span className="text-2xl font-bold text-amber-600">{topThree[2].displayName[0]}</span>
                            <div className="absolute -top-1 -right-1 bg-amber-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border border-white">3</div>
                        </div>
                        <div className="text-center mb-2">
                            <div className="font-bold text-slate-700 text-sm truncate max-w-[100px]">{topThree[2].displayName}</div>
                            <div className="text-xs text-slate-500 font-mono font-bold">{topThree[2].xp} XP</div>
                        </div>
                        <div className="w-28 bg-gradient-to-t from-amber-300 to-amber-100 rounded-t-xl shadow-md h-24 flex items-end justify-center pb-4 border-t border-white/50">
                            <FaMedal className="text-amber-600 text-4xl drop-shadow-sm" />
                        </div>
                    </div>
                )}
            </div>

            {/* List */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="py-4 px-6 text-slate-500 font-bold text-xs uppercase w-20">Rank</th>
                            <th className="py-4 px-6 text-slate-500 font-bold text-xs uppercase">Student</th>
                            <th className="py-4 px-6 text-slate-500 font-bold text-xs uppercase">Level</th>
                            <th className="py-4 px-6 text-right text-slate-500 font-bold text-xs uppercase">Total XP</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {rest.map((student, idx) => {
                            const rank = getRank(student.xp);
                            // Assuming rank returns { color: 'text-class', bg: 'bg-class', name: 'Rank Name' }
                            // We might need to adjust if getRank returns tailwind classes or hex strings.
                            // Based on previous code, looks like it returns classes or we map them.
                            // Let's assume getRank returns styled object or we style here.

                            return (
                                <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="py-4 px-6 font-bold text-slate-400">#{idx + 4}</td>
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-sm font-bold shadow-sm">
                                                {student.displayName[0]}
                                            </div>
                                            <span className="text-slate-900 font-bold">{student.displayName}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className={`text-xs px-3 py-1 rounded-full border border-opacity-20 font-bold ${rank.color ? rank.color.replace('text-', 'bg-').replace('600', '100') + ' ' + rank.color : 'bg-slate-100 text-slate-600'}`}>
                                            {rank.name || 'Novice'}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-right font-mono text-slate-600 font-bold">
                                        {student.xp} XP
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <style>{`
                @keyframes bounce-slow {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-8px); }
                }
                .animate-bounce-slow {
                    animation: bounce-slow 3s infinite ease-in-out;
                }
            `}</style>
        </div>
    );
};

export default LeaderboardView;
