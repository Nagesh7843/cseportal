import React, { useState } from 'react';
import { ViewMode, FacultyMember, ActivityLog, StudentRecord } from '@/types';

interface AdminDashboardProps {
  onNavigate: (view: ViewMode) => void;
  facultyList: FacultyMember[];
  onToggleFacultyStatus: (id: string) => void;
  activities: ActivityLog[];
  students: StudentRecord[];
  onOpenQuickNoticeModal: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onNavigate,
  facultyList,
  onToggleFacultyStatus,
  activities,
  students,
  onOpenQuickNoticeModal
}) => {
  const [trendTimeframe, setTrendTimeframe] = useState<'daily' | 'monthly'>('monthly');
  const [activeChartBarIndex, setActiveChartBarIndex] = useState<number | null>(null);

  // Simulated chart data
  const monthlyData = [
    { label: 'Jan', notices: 42, assignments: 120, height: '40%' },
    { label: 'Feb', notices: 65, assignments: 180, height: '60%' },
    { label: 'Mar', notices: 38, assignments: 95, height: '35%' },
    { label: 'Apr', notices: 88, assignments: 240, height: '85%' },
    { label: 'May', notices: 52, assignments: 150, height: '50%' },
    { label: 'Jun', notices: 95, assignments: 290, height: '95%' },
    { label: 'Jul', notices: 70, assignments: 210, height: '70%' },
    { label: 'Aug', notices: 48, assignments: 130, height: '45%' },
  ];

  const dailyData = [
    { label: 'Mon', notices: 12, assignments: 45, height: '55%' },
    { label: 'Tue', notices: 18, assignments: 60, height: '75%' },
    { label: 'Wed', notices: 9, assignments: 30, height: '35%' },
    { label: 'Thu', notices: 25, assignments: 85, height: '90%' },
    { label: 'Fri', notices: 14, assignments: 50, height: '60%' },
    { label: 'Sat', notices: 5, assignments: 15, height: '20%' },
    { label: 'Sun', notices: 2, assignments: 8, height: '15%' },
    { label: 'Today', notices: 22, assignments: 72, height: '80%' },
  ];

  const chartBars = trendTimeframe === 'monthly' ? monthlyData : dailyData;

  return (
    <div className="space-y-6">
      {/* Quick Stats Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Stat Card 1 */}
        <div className="bg-white p-5 rounded-xl shadow-xs border border-[#c6c5d4] flex flex-col justify-between hover:shadow-md transition-all group">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-[#1a237e]/10 rounded-lg text-[#000666] group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-[24px]">school</span>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-[12px] font-semibold text-[#454652] uppercase tracking-wider">Total Students</h3>
            <p className="text-[32px] font-bold text-[#071e27] leading-tight">{students.length}</p>
            <p className="text-[11px] text-[#767683] mt-1">Enrolled student records</p>
          </div>
        </div>

        {/* Stat Card 2 */}
        <div className="bg-white p-5 rounded-xl shadow-xs border border-[#c6c5d4] flex flex-col justify-between hover:shadow-md transition-all group">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-[#759efd]/20 rounded-lg text-[#2b5bb5] group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-[24px]">groups</span>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-[12px] font-semibold text-[#454652] uppercase tracking-wider">Active Faculty</h3>
            <p className="text-[32px] font-bold text-[#071e27] leading-tight">{facultyList.length}</p>
            <p className="text-[11px] text-[#767683] mt-1">Current faculty directory</p>
          </div>
        </div>

        {/* Stat Card 3 */}
        <div className="bg-white p-5 rounded-xl shadow-xs border border-[#c6c5d4] flex flex-col justify-between hover:shadow-md transition-all group">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-[#a3f69c]/30 rounded-lg text-[#002204] group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-[24px]">mail_lock</span>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-[12px] font-semibold text-[#454652] uppercase tracking-wider">Emails Sent</h3>
            <p className="text-[20px] font-bold text-[#071e27] leading-tight">No history</p>
            <p className="text-[11px] text-[#767683] mt-1">No email broadcasts have been recorded.</p>
          </div>
        </div>

        {/* Stat Card 4 */}
        <div className="bg-white p-5 rounded-xl shadow-xs border border-[#c6c5d4] flex flex-col justify-between hover:shadow-md transition-all group">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-[#ffdad6] rounded-lg text-[#ba1a1a] group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-[24px]">work</span>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-[12px] font-semibold text-[#454652] uppercase tracking-wider">Placement Reports</h3>
            <p className="text-[20px] font-bold text-[#071e27] leading-tight">No data</p>
            <p className="text-[11px] text-[#767683] mt-1">Verified placement data has not been added.</p>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Trends Chart Section */}
        <div className="lg:col-span-8 bg-white p-6 rounded-xl shadow-xs border border-[#c6c5d4]">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
            <div>
              <h3 className="font-bold text-[20px] text-[#071e27]">Activity Trends</h3>
              <p className="text-[12px] text-[#454652]">Volume of official notices vs assignments submitted</p>
            </div>
            <div className="flex gap-1.5 bg-[#e6f6ff] p-1 rounded-full border border-[#c6c5d4]">
              <button
                onClick={() => setTrendTimeframe('daily')}
                className={`px-4 py-1 rounded-full text-[12px] font-semibold transition-all ${
                  trendTimeframe === 'daily'
                    ? 'bg-[#000666] text-white shadow-xs'
                    : 'text-[#454652] hover:bg-[#cfe6f2]'
                }`}
              >
                Daily
              </button>
              <button
                onClick={() => setTrendTimeframe('monthly')}
                className={`px-4 py-1 rounded-full text-[12px] font-semibold transition-all ${
                  trendTimeframe === 'monthly'
                    ? 'bg-[#000666] text-white shadow-xs'
                    : 'text-[#454652] hover:bg-[#cfe6f2]'
                }`}
              >
                Monthly
              </button>
            </div>
          </div>

          {/* Simulated Interactive Bar Chart */}
          <div className="relative h-[280px] w-full bg-[#e6f6ff] rounded-xl overflow-hidden flex items-end justify-between px-6 pb-4 pt-10 border border-[#dbf1fe]">
            {/* Chart Grid Lines */}
            <div className="absolute inset-x-0 top-1/4 border-b border-[#c6c5d4]/40 border-dashed"></div>
            <div className="absolute inset-x-0 top-2/4 border-b border-[#c6c5d4]/40 border-dashed"></div>
            <div className="absolute inset-x-0 top-3/4 border-b border-[#c6c5d4]/40 border-dashed"></div>

            {/* Bars */}
            {chartBars.map((bar, idx) => {
              const isHovered = activeChartBarIndex === idx;
              return (
                <div
                  key={idx}
                  onMouseEnter={() => setActiveChartBarIndex(idx)}
                  onMouseLeave={() => setActiveChartBarIndex(null)}
                  className="flex flex-col items-center gap-2 group cursor-pointer z-10"
                  style={{ width: `${100 / chartBars.length - 2}%` }}
                >
                  {/* Tooltip on hover */}
                  {isHovered && (
                    <div className="absolute -top-10 bg-[#071e27] text-white text-[11px] font-bold px-2.5 py-1 rounded-md shadow-lg z-20 whitespace-nowrap animate-in fade-in duration-150">
                      {bar.label}: {bar.notices} notices • {bar.assignments} assignments
                    </div>
                  )}

                  <div className="w-full flex items-end justify-center gap-1 h-[200px]">
                    {/* Primary Bar (Notices) */}
                    <div
                      className={`w-full bg-[#000666] rounded-t-lg transition-all duration-300 ${
                        isHovered ? 'bg-[#2b5bb5] scale-y-105' : ''
                      }`}
                      style={{ height: bar.height }}
                    ></div>
                  </div>
                  <span className="text-[11px] font-semibold text-[#454652]">{bar.label}</span>
                </div>
              );
            })}

            {/* Decorative Trend Line SVG */}
            <div className="absolute inset-0 opacity-20 pointer-events-none flex items-center justify-center">
              <svg className="w-full h-32 stroke-[#000666] fill-none stroke-[2]" viewBox="0 0 100 20">
                <path d="M0,15 Q25,5 50,14 T100,6" />
              </svg>
            </div>
          </div>

          <div className="flex items-center gap-6 mt-5 text-[12px]">
            <div className="flex items-center gap-2">
              <div className="w-3.5 h-3.5 rounded-full bg-[#000666]"></div>
              <span className="font-semibold text-[#454652]">Notices Posted</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3.5 h-3.5 rounded-full bg-[#759efd]"></div>
              <span className="font-semibold text-[#454652]">Assignments Submitted</span>
            </div>
          </div>
        </div>

        {/* Recent Activities Feed */}
        <div className="lg:col-span-4 bg-white p-6 rounded-xl shadow-xs border border-[#c6c5d4] flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-[18px] text-[#071e27]">Recent Activities</h3>
              <span className="text-[11px] font-bold bg-[#e6f6ff] text-[#000666] px-2 py-0.5 rounded-full">Live Logs</span>
            </div>

            <div className="space-y-3 overflow-y-auto max-h-[310px] custom-scrollbar pr-1">
              {activities.map((act) => (
                <div
                  key={act.id}
                  className="flex gap-3 p-2.5 hover:bg-[#e6f6ff] rounded-lg transition-colors border-l-2 border-transparent hover:border-[#000666] cursor-pointer"
                >
                  <div className={`w-9 h-9 rounded-full ${act.colorBg} flex items-center justify-center shrink-0`}>
                    <span className={`material-symbols-outlined text-[20px] ${act.colorIcon}`}>
                      {act.icon}
                    </span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <p className="text-[13px] text-[#071e27] font-semibold truncate leading-snug">
                      {act.title}
                    </p>
                    <p className="text-[11px] text-[#454652] opacity-90">{act.subtitle}</p>
                  </div>
                </div>
              ))}
              {activities.length === 0 && (
                <p className="py-10 text-center text-[13px] text-[#454652]">No recent activity has been recorded.</p>
              )}
            </div>
          </div>

          <button
            onClick={() => onNavigate('bulk-email')}
            className="mt-4 text-[#000666] font-semibold text-[13px] hover:underline w-full text-center py-2 bg-[#e6f6ff] hover:bg-[#dbf1fe] rounded-lg transition-colors flex items-center justify-center gap-1"
          >
            <span>View All Logs</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>
      </div>

      {/* Asymmetric Management Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-6">
        {/* Faculty Management Card */}
        <div className="lg:col-span-7 bg-white p-6 rounded-xl shadow-xs border border-[#c6c5d4]">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="font-bold text-[18px] text-[#071e27]">Faculty Management</h3>
              <p className="text-[12px] text-[#454652]">Real-time status and departmental ranks</p>
            </div>
            <button
              onClick={() => onNavigate('faculty')}
              className="text-[#000666] font-semibold text-[13px] flex items-center gap-1 hover:gap-2 transition-all hover:underline"
            >
              <span>Manage All</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-[13px]">
              <thead className="bg-[#e6f6ff] text-[#454652] font-semibold border-b border-[#c6c5d4]">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Specialization</th>
                  <th className="px-4 py-3">Rank</th>
                  <th className="px-4 py-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#c6c5d4]/40">
                {facultyList.map((fac) => {
                  const statusColors = {
                    'ON CAMPUS': 'bg-[#a3f69c]/50 text-[#002204] border-emerald-300',
                    'IN MEETING': 'bg-[#d5ecf8] text-[#071e27] border-slate-300',
                    'IN LAB': 'bg-[#d9e2ff] text-[#00429c] border-blue-300',
                    'OFF CAMPUS': 'bg-[#ffdad6] text-[#93000a] border-red-300',
                  }[fac.status];

                  return (
                    <tr key={fac.id} className="hover:bg-[#f3faff] transition-colors">
                      <td className="px-4 py-3 font-semibold text-[#071e27]">{fac.name}</td>
                      <td className="px-4 py-3 text-[#454652]">{fac.specialization}</td>
                      <td className="px-4 py-3 text-[#071e27]">{fac.rank}</td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => onToggleFacultyStatus(fac.id)}
                          title="Click to toggle status"
                          className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase border transition-transform active:scale-95 ${statusColors}`}
                        >
                          {fac.status}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Action Panels */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Bulk Email Notice Broadcaster Access */}
          <div className="bg-[#000666] p-6 rounded-xl text-white shadow-lg flex flex-col justify-between relative overflow-hidden group">
            <div className="z-10 relative">
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-[24px] text-[#759efd]">campaign</span>
                <h3 className="font-bold text-[18px]">Notice Broadcaster</h3>
              </div>
              <p className="text-[13px] opacity-85 mb-6 leading-relaxed">
                Instantly dispatch critical updates to selected student groups or the entire department via email and push notifications.
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => onNavigate('bulk-email')}
                  className="bg-white text-[#000666] px-5 py-2 rounded-lg font-bold text-[13px] shadow-md hover:bg-[#cfe6f2] transition-colors"
                >
                  Launch Panel
                </button>
                <button
                  onClick={onOpenQuickNoticeModal}
                  className="border border-[#759efd] text-white px-5 py-2 rounded-lg font-bold text-[13px] hover:bg-white/10 transition-colors"
                >
                  Quick Draft
                </button>
              </div>
            </div>
            <span className="material-symbols-outlined text-[130px] absolute -right-6 -bottom-8 opacity-10 rotate-12 group-hover:scale-110 transition-transform">
              send
            </span>
          </div>

          {/* Admin Level Card */}
          <div className="bg-[#d5ecf8] p-5 rounded-xl border border-[#c6c5d4] flex items-center gap-4 shadow-xs">
            <div className="w-12 h-12 rounded-full bg-[#1a237e] flex items-center justify-center text-[#8690ee] shrink-0">
              <span className="material-symbols-outlined text-[26px]">security</span>
            </div>
            <div>
              <h4 className="font-bold text-[14px] text-[#071e27]">Admin Level: Superuser</h4>
              <p className="text-[12px] text-[#454652]">Full database access enabled. Logs are being recorded.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
