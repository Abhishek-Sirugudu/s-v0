import React from 'react';
import { Trophy, Medal } from 'lucide-react';

const LeaderboardView = ({ loading, topThree, rest, getRank }) => {

    if (loading) return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-slate-500 font-medium">Loading Rankings...</p>
            </div>
        </div>
    );

    return (
        <div className="w-full space-y-8 font-sans">
            <div className="border-b border-slate-200 pb-6">
                <h2 className="text-2xl font-bold text-primary-900 mb-1 flex items-center gap-2">
                    <Trophy className="text-indigo-600" /> Leaderboard
                </h2>
                <p className="text-slate-500">Top performing students across the platform.</p>
            </div>

            {/* Top 3 Cards (Minimalist) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {topThree[1] && <RankCard student={topThree[1]} rank={2} />}
                {topThree[0] && <RankCard student={topThree[0]} rank={1} isFirst={true} />}
                {topThree[2] && <RankCard student={topThree[2]} rank={3} />}
            </div>

            {/* Rest of List */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="py-4 px-6 text-slate-500 font-bold text-xs uppercase w-24">Rank</th>
                            <th className="py-4 px-6 text-slate-500 font-bold text-xs uppercase">Student</th>
                            <th className="py-4 px-6 text-slate-500 font-bold text-xs uppercase">Level</th>
                            <th className="py-4 px-6 text-right text-slate-500 font-bold text-xs uppercase">Total XP</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {rest.map((student, idx) => {
                            const rank = getRank(student.xp);
                            return (
                                <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="py-4 px-6 font-bold text-slate-500">#{idx + 4}</td>
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded bg-slate-100 text-slate-600 flex items-center justify-center text-xs font-bold uppercase border border-slate-200">
                                                {student.displayName[0]}
                                            </div>
                                            <span className="text-primary-900 font-medium">{student.displayName}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className="text-xs px-2 py-1 rounded bg-slate-100 text-slate-600 font-bold border border-slate-200">
                                            {rank.name || 'Novice'}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-right font-mono text-slate-700 font-bold">
                                        {student.xp}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const RankCard = ({ student, rank, isFirst }) => (
    <div className={`bg-white p-6 rounded-lg border ${isFirst ? 'border-indigo-200 shadow-md ring-1 ring-indigo-50' : 'border-slate-200 shadow-sm'} flex items-center gap-4`}>
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-lg font-bold shrink-0 ${isFirst ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
            }`}>
            #{rank}
        </div>
        <div>
            <div className="text-sm font-bold text-primary-900">{student.displayName}</div>
            <div className="text-xs text-slate-500 font-mono">{student.xp} XP</div>
        </div>
        {isFirst && <Trophy className="ml-auto text-indigo-400" />}
    </div>
);

export default LeaderboardView;
