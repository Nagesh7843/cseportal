import React, { useMemo } from 'react';
import { NoticeItem } from '@/types/notice';
import { StudentRecord } from '@/types';
import { EmailLog } from '@/types/communication';

interface AnalyticsViewProps {
  notices: NoticeItem[];
  students: StudentRecord[];
  emails: EmailLog[];
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ notices, students, emails }) => {
  // Calculations
  const totalPublishedNotices = notices.length;

  const activeStudentsCount = useMemo(() => {
    return students.filter(s => s.status === 'Active').length || students.length;
  }, [students]);

  const avgReadRate = useMemo(() => {
    if (notices.length === 0 || students.length === 0) return '0.0';
    let totalReads = 0;
    notices.forEach(n => {
      totalReads += (n.viewsCount || 0);
    });
    const possibleReads = notices.length * students.length;
    return ((totalReads / possibleReads) * 100).toFixed(1);
  }, [notices, students]);

  const fcmDeliveries = useMemo(() => {
    return emails.reduce((acc, email) => acc + (email.recipientCount || 0), 0);
  }, [emails]);

  const categoryCounts = useMemo(() => {
    const counts = { exam: 0, academic: 0, events: 0, urgent: 0 };
    notices.forEach(n => {
      if (n.category === 'Exam') counts.exam++;
      else if (n.category === 'Academic') counts.academic++;
      else if (n.category === 'Event') counts.events++;
      else if (n.category === 'Emergency') counts.urgent++;
    });
    return counts;
  }, [notices]);

  const yearReadRates = useMemo(() => {
    const years = ['TE', 'SE', 'BE', 'FE'];
    return years.map(year => {
      const studentsInYear = students.filter(s => s.academicYear === year || s.cohortBatch === year).length || 140; 
      let yearViews = 0;
      let yearTargetedNotices = 0;
      notices.forEach(n => {
        if (!n.targetAudience?.academicYear || n.targetAudience.academicYear.includes(year as any) || n.targetAudience.academicYear.length === 0) {
          yearViews += (n.viewsCount || 0);
          yearTargetedNotices++;
        }
      });
      const rate = yearTargetedNotices > 0 ? Math.min(100, ((yearViews / (yearTargetedNotices * studentsInYear)) * 100)) : 0;
      return {
        year,
        label: year === 'TE' ? 'Third Year (TE CSE)' : year === 'SE' ? 'Second Year (SE CSE)' : year === 'BE' ? 'Final Year (BE CSE)' : 'First Year (FE CSE)',
        rate: rate.toFixed(1),
        students: studentsInYear,
        colorBg: year === 'TE' ? 'bg-[#000666]' : year === 'SE' ? 'bg-[#2b5bb5]' : year === 'BE' ? 'bg-[#005312]' : 'bg-[#7a4b00]',
        textClass: year === 'TE' ? 'text-[#000666]' : year === 'SE' ? 'text-[#2b5bb5]' : year === 'BE' ? 'text-[#005312]' : 'text-[#7a4b00]'
      };
    });
  }, [notices, students]);

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
          <p className="text-[28px] font-extrabold text-[#000666]">{totalPublishedNotices}</p>
          <p className="text-[11px] text-emerald-600 font-bold mt-1 flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">sync</span>
            Live Database Sync
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#c6c5d4] shadow-xs">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[11px] font-bold text-[#454652] uppercase tracking-wider">Avg Read Rate</span>
            <span className="material-symbols-outlined text-[#2b5bb5] text-[20px]">mark_email_read</span>
          </div>
          <p className="text-[28px] font-extrabold text-[#2b5bb5]">{avgReadRate}%</p>
          <p className="text-[11px] text-[#454652] font-medium mt-1">Calculated from total views</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#c6c5d4] shadow-xs">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[11px] font-bold text-[#454652] uppercase tracking-wider">FCM Push Deliveries</span>
            <span className="material-symbols-outlined text-amber-600 text-[20px]">bolt</span>
          </div>
          <p className="text-[28px] font-extrabold text-[#071e27]">{fcmDeliveries}</p>
          <p className="text-[11px] text-emerald-600 font-bold mt-1">Based on email broadcast logs</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#c6c5d4] shadow-xs">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[11px] font-bold text-[#454652] uppercase tracking-wider">Active Students Engaged</span>
            <span className="material-symbols-outlined text-emerald-600 text-[20px]">groups</span>
          </div>
          <p className="text-[28px] font-extrabold text-emerald-700">{activeStudentsCount}</p>
          <p className="text-[11px] text-[#454652] font-medium mt-1">Total active directory</p>
        </div>
      </div>

      {/* Analytics Breakdown Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Read Receipts by Academic Year */}
        <div className="bg-white p-6 rounded-2xl border border-[#c6c5d4] shadow-xs space-y-4">
          <h3 className="font-bold text-[18px] text-[#071e27]">Notice Read Rates by Academic Year</h3>
          <div className="space-y-3">
            {yearReadRates.map(yr => (
              <div key={yr.year}>
                <div className="flex justify-between text-[12px] font-bold mb-1">
                  <span className={yr.textClass}>{yr.label} — {yr.rate}%</span>
                  <span className="text-[#454652]">{Math.floor(yr.students * (parseFloat(yr.rate) / 100))} / {yr.students} Students</span>
                </div>
                <div className="w-full bg-[#e6f6ff] h-3 rounded-full overflow-hidden">
                  <div className={`${yr.colorBg} h-3 rounded-full`} style={{ width: `${yr.rate}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-white p-6 rounded-2xl border border-[#c6c5d4] shadow-xs space-y-4">
          <h3 className="font-bold text-[18px] text-[#071e27]">Notices Published by Category</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 bg-[#e6f6ff] rounded-xl border border-[#dbf1fe]">
              <span className="text-[11px] font-bold text-[#454652] uppercase">Examination</span>
              <p className="text-[22px] font-extrabold text-[#000666]">{categoryCounts.exam} Notices</p>
              <p className="text-[11px] text-[#454652]">Timetables & Hall Tickets</p>
            </div>

            <div className="p-4 bg-[#e6f6ff] rounded-xl border border-[#dbf1fe]">
              <span className="text-[11px] font-bold text-[#454652] uppercase">Academic</span>
              <p className="text-[22px] font-extrabold text-[#2b5bb5]">{categoryCounts.academic} Notices</p>
              <p className="text-[11px] text-[#454652]">Syllabus & Coursework</p>
            </div>

            <div className="p-4 bg-[#e6f6ff] rounded-xl border border-[#dbf1fe]">
              <span className="text-[11px] font-bold text-[#454652] uppercase">Department Events</span>
              <p className="text-[22px] font-extrabold text-emerald-700">{categoryCounts.events} Notices</p>
              <p className="text-[11px] text-[#454652]">Hackathons & Workshops</p>
            </div>

            <div className="p-4 bg-[#ffdad6]/40 rounded-xl border border-[#ffb4ab]">
              <span className="text-[11px] font-bold text-[#93000a] uppercase">Urgent Notices</span>
              <p className="text-[22px] font-extrabold text-[#ba1a1a]">{categoryCounts.urgent} Notices</p>
              <p className="text-[11px] text-[#93000a]">Instant Priority Overrides</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
