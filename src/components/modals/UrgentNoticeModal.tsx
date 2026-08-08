import React, { useState } from 'react';

interface UrgentNoticeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSendUrgentNotice: (title: string, message: string) => void;
}

export const UrgentNoticeModal: React.FC<UrgentNoticeModalProps> = ({
  isOpen,
  onClose,
  onSendUrgentNotice
}) => {
  const [urgentTitle, setUrgentTitle] = useState('');
  const [urgentMsg, setUrgentMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (urgentTitle.trim() && urgentMsg.trim()) {
      onSendUrgentNotice(urgentTitle, urgentMsg);
      setUrgentTitle('');
      setUrgentMsg('');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border-2 border-[#ba1a1a] animate-in zoom-in-95 duration-150">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#ffdad6] text-[#93000a] flex items-center justify-center font-bold">
              <span className="material-symbols-outlined">warning</span>
            </div>
            <div>
              <h3 className="font-bold text-[18px] text-[#071e27]">Dispatch Emergency Notice</h3>
              <p className="text-[11px] text-[#ba1a1a] font-bold uppercase tracking-wider">
                High Priority Override Broadcast
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-[#767683] hover:text-[#071e27]">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[12px] font-bold text-[#454652] uppercase mb-1">
              Alert Subject
            </label>
            <input
              type="text"
              required
              value={urgentTitle}
              onChange={(e) => setUrgentTitle(e.target.value)}
              placeholder="e.g. URGENT: Campus Evacuation / Lab Emergency Closure"
              className="w-full border border-[#ba1a1a]/40 bg-red-50/30 rounded-xl p-3 text-[13px] font-semibold text-[#071e27] outline-none focus:ring-2 focus:ring-[#ba1a1a]"
            />
          </div>

          <div>
            <label className="block text-[12px] font-bold text-[#454652] uppercase mb-1">
              Emergency Directive Content
            </label>
            <textarea
              rows={4}
              required
              value={urgentMsg}
              onChange={(e) => setUrgentMsg(e.target.value)}
              placeholder="Provide urgent instructions for students and faculty..."
              className="w-full border border-[#c6c5d4] rounded-xl p-3 text-[13px] text-[#071e27] outline-none focus:ring-2 focus:ring-[#ba1a1a]"
            ></textarea>
          </div>

          <div className="p-3 bg-[#ffdad6] text-[#93000a] rounded-xl text-[11px] font-medium flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">info</span>
            <span>This alert will trigger immediate mobile push alerts and red banner warnings.</span>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-[#c6c5d4] rounded-lg text-[13px] font-semibold text-[#071e27]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#ba1a1a] text-white rounded-lg text-[13px] font-bold hover:bg-[#93000a] transition-colors shadow-md"
            >
              BROADCAST EMERGENCY ALERT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
