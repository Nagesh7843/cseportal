import React from 'react';
import { ActivityLog } from '@/types';

interface ActivityLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  activities: ActivityLog[];
}

export const ActivityLogModal: React.FC<ActivityLogModalProps> = ({
  isOpen,
  onClose,
  activities,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh]">
        <div className="bg-[#000666] text-white p-5 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-2xl text-[#759efd]">history</span>
            <h2 className="text-lg font-bold">Activity Logs</h2>
          </div>
          <button onClick={onClose} className="text-slate-300 hover:text-white transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="p-0 overflow-y-auto custom-scrollbar">
          <div className="divide-y divide-[#c6c5d4]/40">
            {activities.map((act) => (
              <div key={act.id} className="flex gap-4 p-4 hover:bg-[#f3faff] transition-colors">
                <div className={`w-10 h-10 rounded-full ${act.colorBg} flex items-center justify-center shrink-0`}>
                  <span className={`material-symbols-outlined text-[20px] ${act.colorIcon}`}>
                    {act.icon}
                  </span>
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-4">
                    <p className="text-[14px] text-[#071e27] font-bold truncate">
                      {act.title}
                    </p>
                    <span className="text-[11px] text-[#767683] whitespace-nowrap font-medium">
                      {act.timeAgo}
                    </span>
                  </div>
                  <p className="text-[13px] text-[#454652] mt-0.5">{act.subtitle}</p>
                </div>
              </div>
            ))}
            {activities.length === 0 && (
              <div className="p-8 text-center text-[#454652]">
                <span className="material-symbols-outlined text-4xl text-[#c6c5d4] mb-2">history_toggle_off</span>
                <p>No activity logs found.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
