import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import {
  Users,
  Activity,
  BookOpen,
  Server,
  Download,
  Calendar,
  Search,
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight,
  Clock
} from 'lucide-react';

const AdminDashboard = () => {

  const generateActivityData = () => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return days.map(day => ({
      day,
      logins: Math.floor(Math.random() * 800) + 400,
      enrollments: Math.floor(Math.random() * 300) + 100,
    }));
  };

  const generateTableData = () => {
    const statuses = ['Active', 'Review', 'Archived'];
    return Array.from({ length: 12 }).map((_, i) => ({
      id: `CRS-${202400 + i}`,
      title: ['Advanced React Patterns', 'System Design Interview', 'Python for Data Science', 'DevOps Fundamentals', 'Enterprise Architecture', 'Cloud Native Basics'][i % 6] + ` ${Math.floor(i / 6) + 1}`,
      instructor: ['Dr. Sarah Chen', 'Markus Schmidt', 'Priya Patel', 'Alex Rivera', 'Emily Zhang', 'John Doe'][i % 6],
      category: ['Development', 'Business', 'Design'][i % 3],
      duration: `${Math.floor(Math.random() * 20) + 10}h ${Math.floor(Math.random() * 50)}m`,
      students: Math.floor(Math.random() * 500) + 50,
      completion: Math.floor(Math.random() * 40) + 60,
      status: statuses[i % 3]
    }));
  };

  const [activityData] = useState(generateActivityData());
  const [tableData] = useState(generateTableData());

  return (
    <div className="min-h-screen bg-[#f8fafc] p-2 font-sans text-primary-900 flex flex-col">
      <div className="w-full space-y-8 flex-1 flex flex-col">

        { }
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-6 border-b border-slate-200 pb-6 shrink-0">
          <div>
            <h1 className="text-3xl font-semibold text-primary-900 tracking-tight">Executive Overview</h1>
            <p className="text-slate-500 text-base mt-1">Platform performance and system metrics.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-md text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
              <Calendar size={14} className="text-slate-400" />
              <span>{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              <ChevronDown size={12} className="text-slate-400 ml-1" />
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-primary-900 text-white rounded-md text-xs font-semibold hover:bg-slate-800 transition-colors">
              <Download size={14} /> Export Data
            </button>
          </div>
        </div>

        { }
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 shrink-0">
          <KpiCard
            title="Total Active Learners"
            value="12,482"
            trend="12%"
            isPositive={true}
            icon={<Users size={20} />}
          />
          <KpiCard
            title="Sessions per User"
            value="4.3"
            trend="5.4%"
            isPositive={true}
            icon={<Activity size={20} />}
          />
          <KpiCard
            title="Course Completion Rate"
            value="68.4%"
            trend="2.1%"
            isPositive={false}
            icon={<BookOpen size={20} />}
          />
          <KpiCard
            title="System Uptime"
            value="99.99%"
            trend="Stable"
            isPositive={true}
            icon={<Server size={20} />}
          />
        </div>

        { }
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 shrink-0">

          { }
          <div className="lg:col-span-2 bg-white p-6 rounded-lg border border-slate-200 shadow-sm flex flex-col h-[400px]">
            <div className="flex justify-between items-center mb-8 shrink-0">
              <div>
                <h3 className="text-base font-semibold text-primary-900">Engagement Trends</h3>
              </div>
              <div className="flex gap-6">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-0.5 bg-[var(--color-indigo-600)]"></span>
                  <span className="text-xs font-medium text-slate-500">Logins</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-0.5 bg-slate-300"></span>
                  <span className="text-xs font-medium text-slate-500">Enrollments</span>
                </div>
              </div>
            </div>
            <div className="flex-1 w-full min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={activityData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis
                    dataKey="day"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#64748b', fontSize: 11 }}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#64748b', fontSize: 11 }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #e2e8f0',
                      padding: '8px 12px',
                      fontSize: '12px',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                    }}
                    itemStyle={{ padding: 0 }}
                    cursor={{ stroke: '#cbd5e1', strokeWidth: 1 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="logins"
                    stroke="var(--color-indigo-600)"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4, fill: 'var(--color-indigo-600)' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="enrollments"
                    stroke="#cbd5e1"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4, fill: '#cbd5e1' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          { }
          <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm flex flex-col justify-center h-[400px]">
            <h3 className="text-base font-semibold text-primary-900 mb-8">System Status</h3>

            <div className="space-y-10 flex-1">
              <HealthBar label="Storage Usage" value={85} />
              <HealthBar label="Database Load" value={45} />
              <HealthBar label="Bandwidth" value={62} />
              <HealthBar label="API Latency" value={24} />
            </div>

            <div className="pt-6 border-t border-slate-100 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-sm font-medium text-emerald-700">All systems operational</span>
              </div>
            </div>
          </div>
        </div>

        { }
        <div className="bg-white border border-slate-200 rounded-lg shadow-sm flex-1 flex flex-col min-h-0">
          <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white shrink-0">
            <h3 className="text-base font-semibold text-primary-900">Course Participation Matrix</h3>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              <input
                type="text"
                placeholder="Filter courses..."
                className="w-full pl-9 pr-4 py-1.5 text-sm border border-slate-200 rounded-md focus:border-slate-400 focus:ring-0 outline-none transition-colors"
              />
            </div>
          </div>

          <div className="overflow-auto flex-1">
            <table className="w-full text-left border-collapse h-full">
              <thead className="bg-[#f8fafc] border-b border-slate-200 sticky top-0 z-10">
                <tr>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wide">Course</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wide">Instructor</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wide">Duration</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wide">Students</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wide text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {tableData.map((course) => (
                  <tr key={course.id} className="hover:bg-[#f8fafc] transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-primary-900 text-base">{course.title}</div>
                      <div className="text-sm text-slate-500 mt-0.5">{course.category}</div>
                    </td>
                    <td className="px-6 py-4 text-base text-slate-600">
                      {course.instructor}
                    </td>
                    <td className="px-6 py-4 text-base text-slate-600">
                      <div className="flex items-center gap-1.5">
                        <Clock size={16} className="text-slate-400" />
                        {course.duration}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-base text-slate-600 tabular-nums">
                      {course.students}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <StatusIndicator status={course.status} />
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



const KpiCard = ({ title, value, trend, isPositive, icon }) => {
  return (
    <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm flex flex-col justify-between h-[150px]">
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">{title}</p>
          <h3 className="text-3xl font-semibold text-primary-900 tracking-tight">{value}</h3>
        </div>
        <div className="text-slate-400">
          {icon}
        </div>
      </div>

      <div className="flex items-center gap-1.5 mt-4">
        {isPositive ?
          <ArrowUpRight size={16} className="text-emerald-600" /> :
          <ArrowDownRight size={16} className="text-rose-600" />
        }
        <span className={`text-base font-medium ${isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
          {trend}
        </span>
        <span className="text-sm text-slate-400">vs last month</span>
      </div>
    </div>
  );
};

const HealthBar = ({ label, value }) => (
  <div className="space-y-2">
    <div className="flex justify-between text-sm font-medium">
      <span className="text-slate-600">{label}</span>
      <span className="text-slate-900">{value}%</span>
    </div>
    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
      <div
        className="h-full bg-[var(--color-indigo-600)]"
        style={{ width: `${value}%` }}
      ></div>
    </div>
  </div>
);

const StatusIndicator = ({ status }) => {
  const colors = {
    Active: "bg-emerald-500",
    Review: "bg-amber-500",
    Archived: "bg-slate-400"
  };

  return (
    <div className="inline-flex items-center justify-end gap-2">
      <span className={`w-2.5 h-2.5 rounded-full ${colors[status] || colors.Archived}`}></span>
      <span className="text-sm font-medium text-slate-600">{status}</span>
    </div>
  );
};

export default AdminDashboard;