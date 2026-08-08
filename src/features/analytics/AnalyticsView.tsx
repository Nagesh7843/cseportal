import React from 'react';

export const AnalyticsView: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-[#000666] text-white p-6 rounded-2xl shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-[24px] font-extrabold flex items-center gap-2">
            <span className="material-symbols-outlined text-[28px] text-[#759efd]">analytics</span>
            Communication & Notice Analytics
          </h1>
          <p className="text-[#cfe6f2] text-[13px] mt-1">
            Real-time delivery statistics, student read rates, category distributions, and engagement audits.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl border border-white/20">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-[12px] font-bold text-white">Live FCM & Read Tracker</span>
        </div>
      </div>

      {/* KPI Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#c6c5d4] shadow-xs">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[11px] font-bold text-[#454652] uppercase tracking-wider">Total Published Notices</span>
            <span className="material-symbols-outlined text-[#000666] text-[20px]">campaign</span>
          </div>
          <p className="text-[28px] font-extrabold text-[#000666]">148</p>
          <p className="text-[11px] text-emerald-600 font-bold mt-1 flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">trending_up</span>
            +18% vs last month
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#c6c5d4] shadow-xs">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[11px] font-bold text-[#454652] uppercase tracking-wider">Avg Read Rate</span>
            <span className="material-symbols-outlined text-[#2b5bb5] text-[20px]">mark_email_read</span>
          </div>
          <p className="text-[28px] font-extrabold text-[#2b5bb5]">89.4%</p>
          <p className="text-[11px] text-[#454652] font-medium mt-1">Target threshold: 85%</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#c6c5d4] shadow-xs">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[11px] font-bold text-[#454652] uppercase tracking-wider">FCM Push Deliveries</span>
            <span className="material-symbols-outlined text-amber-600 text-[20px]">bolt</span>
          </div>
          <p className="text-[28px] font-extrabold text-[#071e27]">1,420</p>
          <p className="text-[11px] text-emerald-600 font-bold mt-1">99.2% delivery success</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#c6c5d4] shadow-xs">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[11px] font-bold text-[#454652] uppercase tracking-wider">Active Students Engaged</span>
            <span className="material-symbols-outlined text-emerald-600 text-[20px]">groups</span>
          </div>
          <p className="text-[28px] font-extrabold text-emerald-700">420</p>
          <p className="text-[11px] text-[#454652] font-medium mt-1">Across FE, SE, TE & BE</p>
        </div>
      </div>

      {/* Analytics Breakdown Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Read Receipts by Academic Year */}
        <div className="bg-white p-6 rounded-2xl border border-[#c6c5d4] shadow-xs space-y-4">
          <h3 className="font-bold text-[18px] text-[#071e27]">Notice Read Rates by Academic Year</h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-[12px] font-bold mb-1">
                <span className="text-[#000666]">Third Year (TE CSE) — 94.2%</span>
                <span className="text-[#454652]">132 / 140 Students</span>
              </div>
              <div className="w-full bg-[#e6f6ff] h-3 rounded-full overflow-hidden">
                <div className="bg-[#000666] h-3 rounded-full" style={{ width: '94.2%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[12px] font-bold mb-1">
                <span className="text-[#2b5bb5]">Second Year (SE CSE) — 88.5%</span>
                <span className="text-[#454652]">124 / 140 Students</span>
              </div>
              <div className="w-full bg-[#e6f6ff] h-3 rounded-full overflow-hidden">
                <div className="bg-[#2b5bb5] h-3 rounded-full" style={{ width: '88.5%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[12px] font-bold mb-1">
                <span className="text-[#005312]">Final Year (BE CSE) — 91.0%</span>
                <span className="text-[#454652]">127 / 140 Students</span>
              </div>
              <div className="w-full bg-[#e6f6ff] h-3 rounded-full overflow-hidden">
                <div className="bg-[#005312] h-3 rounded-full" style={{ width: '91.0%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[12px] font-bold mb-1">
                <span className="text-[#7a4b00]">First Year (FE CSE) — 82.0%</span>
                <span className="text-[#454652]">115 / 140 Students</span>
              </div>
              <div className="w-full bg-[#e6f6ff] h-3 rounded-full overflow-hidden">
                <div className="bg-[#7a4b00] h-3 rounded-full" style={{ width: '82.0%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-white p-6 rounded-2xl border border-[#c6c5d4] shadow-xs space-y-4">
          <h3 className="font-bold text-[18px] text-[#071e27]">Notices Published by Category</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 bg-[#e6f6ff] rounded-xl border border-[#dbf1fe]">
              <span className="text-[11px] font-bold text-[#454652] uppercase">Examination</span>
              <p className="text-[22px] font-extrabold text-[#000666]">42 Notices</p>
              <p className="text-[11px] text-[#454652]">Timetables & Hall Tickets</p>
            </div>

            <div className="p-4 bg-[#e6f6ff] rounded-xl border border-[#dbf1fe]">
              <span className="text-[11px] font-bold text-[#454652] uppercase">Academic</span>
              <p className="text-[22px] font-extrabold text-[#2b5bb5]">56 Notices</p>
              <p className="text-[11px] text-[#454652]">Syllabus & Coursework</p>
            </div>

            <div className="p-4 bg-[#e6f6ff] rounded-xl border border-[#dbf1fe]">
              <span className="text-[11px] font-bold text-[#454652] uppercase">Department Events</span>
              <p className="text-[22px] font-extrabold text-emerald-700">30 Notices</p>
              <p className="text-[11px] text-[#454652]">Hackathons & Workshops</p>
            </div>

            <div className="p-4 bg-[#ffdad6]/40 rounded-xl border border-[#ffb4ab]">
              <span className="text-[11px] font-bold text-[#93000a] uppercase">Emergency Directives</span>
              <p className="text-[22px] font-extrabold text-[#ba1a1a]">20 Directives</p>
              <p className="text-[11px] text-[#93000a]">Instant Priority Overrides</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
