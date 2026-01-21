import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import {
  Users,
  BookOpen,
  Clock,
  Award,
  HardDrive,
  AlertTriangle,
  MoreHorizontal,
  ArrowUpRight,
  Database
} from 'lucide-react';

const AdminDashboard = () => {
  // Mock Data Generators
  const generateChartData = () => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return days.map(day => ({
      day,
      modules: Math.floor(Math.random() * 50) + 20,
      exams: Math.floor(Math.random() * 20) + 5,
    }));
  };

  const generateTableData = () => {
    const statuses = ['Active', 'Review', 'Archived'];
    return Array.from({ length: 15 }).map((_, i) => ({
      id: `CRS-${1000 + i}`,
      title: ['Advanced React Patterns', 'System Design Interview', 'Python for Data Science', 'DevOps Fundamentals', 'Enterprise Architecture', 'Cloud Native Basics'][i % 6] + ` ${Math.floor(i / 6) + 1}`,
      instructor: ['Dr. Sarah Chen', 'Markus Schmidt', 'Priya Patel', 'Alex Rivera', 'Emily Zhang', 'John Doe'][i % 6],
      activeStudents: Math.floor(Math.random() * 500) + 50,
      completionRate: Math.floor(Math.random() * 40) + 40,
      status: statuses[i % 3]
    }));
  };

  const [chartData] = useState(generateChartData());
  const [tableData] = useState(generateTableData());

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-6 font-sans text-slate-800 flex flex-col items-center">
      <div className="w-full max-w-[1440px]">
        {/* Header */}
        <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#003B5C] tracking-tight">Executive Dashboard</h1>
            <p className="text-slate-500 text-xs font-semibold tracking-wider uppercase mt-1">System Usage & Content Velocity</p>
          </div>
          <div className="flex items-center gap-3 bg-white px-3 py-1.5 rounded-sm border border-slate-200 shadow-sm">
            <div className="text-right">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Last Updated</div>
              <div className="text-xs font-bold text-[#003B5C]">{new Date().toLocaleDateString()}</div>
            </div>
          </div>
        </div>

        {/* Row 1: KPI Cards - Compact Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <KpiCard
            title="Active Learners"
            value="2,845"
            trend="12% vs last week"
            icon={<Users size={20} className="text-white" />}
            color="bg-[#003B5C]"
            textColor="text-white"
            trendColor="text-emerald-300 bg-white/10"
          />
          <KpiCard
            title="Global Completion"
            value="68.4%"
            trend="+5.2% vs last week"
            icon={<BookOpen size={20} className="text-[#003B5C]" />}
            color="bg-white"
            textColor="text-[#003B5C]"
            borderColor="border-slate-200"
            trendColor="text-emerald-600 bg-emerald-50"
          />
          <KpiCard
            title="Learning Hours"
            value="14.2k"
            trend="+8.5% vs last week"
            icon={<Clock size={20} className="text-[#003B5C]" />}
            color="bg-white"
            textColor="text-[#003B5C]"
            borderColor="border-slate-200"
            trendColor="text-emerald-600 bg-emerald-50"
          />
          <KpiCard
            title="Certificates"
            value="982"
            trend="+14% vs last week"
            icon={<Award size={20} className="text-[#003B5C]" />}
            color="bg-white"
            textColor="text-[#003B5C]"
            borderColor="border-slate-200"
            trendColor="text-emerald-600 bg-emerald-50"
          />
        </div>

        {/* Row 2: Analytics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          {/* Content Velocity Chart (66%) */}
          <div className="lg:col-span-2 bg-white p-5 rounded-sm shadow-sm border border-slate-200 flex flex-col h-[320px]">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-base font-bold text-[#003B5C]">Content Velocity</h3>
                <p className="text-[11px] text-slate-400 font-medium uppercase tracking-wide">Modules vs Exams</p>
              </div>
              <div className="flex gap-4 text-[10px] font-bold uppercase tracking-wider">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-[#003B5C]"></span> <span className="text-slate-600">Modules</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-[#E8AA25]"></span> <span className="text-slate-600">Exams</span>
                </div>
              </div>
            </div>
            <div className="flex-1 w-full min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} barSize={32} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis
                    dataKey="day"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#64748b', fontSize: 11, fontWeight: 600 }}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#64748b', fontSize: 11, fontWeight: 600 }}
                  />
                  <Tooltip
                    cursor={{ fill: '#f8fafc' }}
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '2px',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                      fontSize: '12px'
                    }}
                  />
                  <Bar dataKey="modules" stackId="a" fill="#003B5C" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="exams" stackId="a" fill="#E8AA25" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Infrastructure Load (33%) */}
          <div className="flex flex-col gap-4 h-[320px]">
            {/* Storage Usage */}
            <div className="bg-white p-5 rounded-sm shadow-sm border border-slate-200 flex-[1.4] flex flex-col justify-center">
              <div className="flex justify-between items-center mb-5">
                <h3 className="text-base font-bold text-[#003B5C]">System Load</h3>
                <Database size={16} className="text-slate-400" />
              </div>

              <div className="space-y-5">
                <div>
                  <div className="flex justify-between text-[11px] font-bold mb-1.5">
                    <span className="text-slate-500 uppercase tracking-wide">Video Storage</span>
                    <span className="text-[#003B5C]">65GB / 100GB</span>
                  </div>
                  <div className="h-2.5 w-full bg-slate-100 overflow-hidden">
                    <div className="h-full bg-[#003B5C]" style={{ width: '65%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] font-bold mb-1.5">
                    <span className="text-slate-500 uppercase tracking-wide">DB Capacity</span>
                    <span className="text-[#003B5C]">42%</span>
                  </div>
                  <div className="h-2.5 w-full bg-slate-100 overflow-hidden">
                    <div className="h-full bg-emerald-500" style={{ width: '42%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Ghost Accounts Alert */}
            <div className="bg-[#FFFCF0] p-5 rounded-sm shadow-sm border border-[#E8AA25]/30 flex-1 flex flex-col justify-center relative overflow-hidden group">
              {/* Orange decoration line */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#E8AA25]"></div>

              <div className="z-10 relative pl-2">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle size={16} className="text-[#E8AA25]" />
                  <h4 className="text-sm font-bold text-[#003B5C]">Attention Needed</h4>
                </div>

                <p className="text-xs text-slate-700 mb-3 leading-snug font-medium">
                  <strong className="text-[#003B5C]">842 users</strong> inactive &gt; 90 days.
                </p>

                <button className="text-[10px] font-bold text-white uppercase tracking-wider bg-[#003B5C] px-3 py-1.5 hover:bg-[#002a42] transition-colors shadow-sm">
                  Run Archiver
                </button>
              </div>
              <Users size={60} className="absolute -right-2 -bottom-2 text-[#E8AA25] opacity-[0.08]" />
            </div>
          </div>
        </div>

        {/* Row 3: Management Table */}
        <div className="bg-white rounded-sm shadow-sm border border-slate-200 flex flex-col h-[400px]">
          <div className="px-5 py-3 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 shrink-0">
            <h3 className="text-base font-bold text-[#003B5C]">Course Performance Matrix</h3>
            <div className="flex gap-2">
              <button className="text-[10px] font-bold text-slate-500 bg-slate-50 border border-slate-200 px-2 py-1 uppercase hover:bg-slate-100">Export CSV</button>
              <button className="p-1 text-slate-400 hover:text-[#003B5C] transition-colors"> <MoreHorizontal size={18} /> </button>
            </div>
          </div>
          <div className="overflow-auto flex-1 custom-scrollbar">
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#F8FAFC] border-b border-slate-200 sticky top-0 z-10 shadow-sm">
                <tr>
                  <th className="px-4 py-2.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider w-[35%]">Course Details</th>
                  <th className="px-4 py-2.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider w-[20%]">Instructor</th>
                  <th className="px-4 py-2.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider text-center w-[15%]">Active (7d)</th>
                  <th className="px-4 py-2.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider w-[20%]">Completion</th>
                  <th className="px-4 py-2.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider text-right w-[10%]">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100/80">
                {tableData.map((course, index) => (
                  <tr key={course.id} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="px-4 py-2">
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-[#003B5C] group-hover:text-[#E8AA25] transition-colors truncate">{course.title}</span>
                        <span className="text-[10px] text-slate-400 font-mono">{course.id}</span>
                      </div>
                    </td>
                    <td className="px-4 py-2">
                      <span className="text-xs font-semibold text-slate-600">{course.instructor}</span>
                    </td>
                    <td className="px-4 py-2 text-center">
                      <span className="text-xs font-bold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded-sm">{course.activeStudents}</span>
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-slate-100 overflow-hidden">
                          <div
                            className={`h-full ${course.completionRate > 70 ? 'bg-[#003B5C]' : 'bg-[#E8AA25]'}`}
                            style={{ width: `${course.completionRate}%` }}
                          ></div>
                        </div>
                        <span className="text-[10px] font-bold text-slate-600 w-6 text-right">{course.completionRate}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-2 text-right">
                      <StatusPill status={course.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

// Sub-components
const KpiCard = ({ title, value, trend, icon, color, textColor = "text-white", borderColor = "border-transparent", trendColor }) => (
  <div className={`${color} ${borderColor} p-4 rounded-sm shadow-sm border hover:shadow-md transition-shadow relative overflow-hidden group flex flex-col justify-between h-[110px]`}>
    <div className="flex justify-between items-start z-10 relative mb-1">
      <h3 className={`text-[11px] font-extrabold uppercase tracking-widest opacity-80 ${textColor}`}>{title}</h3>
      <div className={`p-1.5 rounded-sm ${textColor === 'text-white' ? 'bg-white/20' : 'bg-slate-100'}`}>
        {icon}
      </div>
    </div>

    <div className="z-10 relative">
      <div className={`text-2xl font-bold ${textColor} tracking-tight leading-none mb-1.5`}>{value}</div>
      <div className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-sm text-[10px] font-bold ${trendColor}`}>
        <ArrowUpRight size={10} />
        <span>{trend}</span>
      </div>
    </div>
  </div>
);

const StatusPill = ({ status }) => {
  const styles = {
    Active: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Review: "bg-amber-50 text-amber-700 border-amber-200",
    Archived: "bg-slate-50 text-slate-500 border-slate-200"
  };

  return (
    <span className={`inline-flex items-center justify-center px-2 py-0.5 rounded-sm text-[9px] font-extrabold uppercase tracking-wide border ${styles[status] || styles.Archived} min-w-[60px]`}>
      {status}
    </span>
  );
};

export default AdminDashboard;