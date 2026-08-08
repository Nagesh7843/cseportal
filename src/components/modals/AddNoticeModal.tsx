import React, { useState } from 'react';
import { ActivityLog } from '@/types';

interface AddNoticeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddNotice: (notice: ActivityLog) => void;
}

export const AddNoticeModal: React.FC<AddNoticeModalProps> = ({
  isOpen,
  onClose,
  onAddNotice
}) => {
  const [noticeTitle, setNoticeTitle] = useState('');
  const [noticeSubtitle, setNoticeSubtitle] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (noticeTitle.trim()) {
      const newAct: ActivityLog = {
        id: `act-${Date.now()}`,
        title: noticeTitle,
        subtitle: noticeSubtitle || 'Posted by Faculty Member',
        timeAgo: 'Just now',
        icon: 'campaign',
        type: 'notice',
        colorBg: 'bg-[#d9e2ff]',
        colorIcon: 'text-[#00429c]',
      };
      onAddNotice(newAct);
      setNoticeTitle('');
      setNoticeSubtitle('');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#c6c5d4]">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-[18px] text-[#071e27]">Post Department Notice</h3>
          <button onClick={onClose} className="text-[#767683]">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[12px] font-bold text-[#454652] uppercase mb-1">Notice Heading</label>
            <input
              type="text"
              required
              value={noticeTitle}
              onChange={(e) => setNoticeTitle(e.target.value)}
              placeholder="e.g. Mid-Term Project Submissions Open"
              className="w-full border border-[#c6c5d4] rounded-xl p-3 text-[13px] outline-none focus:ring-2 focus:ring-[#000666]"
            />
          </div>

          <div>
            <label className="block text-[12px] font-bold text-[#454652] uppercase mb-1">Subtitle / Author</label>
            <input
              type="text"
              value={noticeSubtitle}
              onChange={(e) => setNoticeSubtitle(e.target.value)}
              placeholder="e.g. Posted by Prof. Thorne for CS402"
              className="w-full border border-[#c6c5d4] rounded-xl p-3 text-[13px] outline-none focus:ring-2 focus:ring-[#000666]"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-[#c6c5d4] rounded-lg text-[13px] font-semibold text-[#071e27]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#000666] text-white rounded-lg text-[13px] font-bold hover:bg-[#1a237e]"
            >
              Publish Notice
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
