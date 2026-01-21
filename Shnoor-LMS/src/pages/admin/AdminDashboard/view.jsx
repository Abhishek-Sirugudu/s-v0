import React from 'react';
import { Users, BookOpen, Clock, Award, TrendingUp, Search } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const AdminDashboardView = ({ stats, chartData, loading }) => {
  if (loading) return <div className="p-10 text-slate-400 animate-pulse font-medium">Syncing data...</div>;

  const StatCard = ({ label, value, icon: Icon, color }) => (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-subtle group hover:border-accent-500 transition-all">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-xl ${color}`}>
          <Icon size={22} />
        </div>
        <span className="flex items-center gap-1 text-xs font-bold text-success bg-success/10 px-2 py-1 rounded-lg">
          <TrendingUp size={12} /> +4%
        </span>
      </div>
      <div>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{label}</p>
        <h3 className="text-3xl font-black text-primary-900 tracking-tight">{value}</h3>
      </div>
    </div>
  );

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-primary-900">Analytics Overview</h1>
          <p className="text-slate-500 mt-1 font-medium text-sm">Real-time performance metrics across the platform.</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input className="pl-10 pr-4 py-2 bg-slate-100 border-none rounded-xl text-sm focus:ring-2 focus:ring-accent-500/20 w-64" placeholder="Search parameters..." />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard label="Active Students" value={stats.activeUsers} icon={Users} color="bg-indigo-50 text-indigo-600" />
        <StatCard label="Completion" value={`${stats.completionRate}%`} icon={BookOpen} color="bg-emerald-50 text-emerald-600" />
        <StatCard label="Total Hours" value={stats.totalHours} icon={Clock} color="bg-amber-50 text-amber-600" />
        <StatCard label="Certs Issued" value={stats.certificates} icon={Award} color="bg-rose-50 text-rose-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-200 h-[450px] flex flex-col">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-sm font-black text-primary-900 uppercase tracking-widest">Learning Activity</h3>
            <div className="flex gap-2">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400"><div className="w-2 h-2 rounded-full bg-accent-500"></div> Lessons</div>
            </div>
          </div>
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 600}} dy={15} />
                <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                <Bar dataKey="lessons" fill="#0f172a" radius={[6, 6, 0, 0]} barSize={45} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-primary-900 p-8 rounded-3xl text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
          <div>
            <h3 className="text-sm font-bold text-primary-300 uppercase tracking-widest mb-6">System Health</h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-xs font-bold mb-2"><span>Cloud Storage</span><span>65%</span></div>
                <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden"><div className="bg-accent-500 h-full w-[65%]"></div></div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-bold mb-2"><span>Server Uptime</span><span>99.9%</span></div>
                <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden"><div className="bg-success h-full w-[99%]"></div></div>
              </div>
            </div>
          </div>
          <button className="w-full py-4 bg-white/10 hover:bg-white/20 rounded-2xl text-sm font-bold transition-all">View Full System Report</button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardView;