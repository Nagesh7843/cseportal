import React, { useState, useRef } from 'react';
import { NoticeItem, NoticeCategory, NoticePriority, NoticeStatus, AcademicYear, Division, BatchGroup, UploadAsset, UserRole } from '@/types';

interface NoticePublishModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPublishNotice: (notice: NoticeItem) => void;
  currentUserName: string;
  currentUserRoleTitle: string;
}

export const NoticePublishModal: React.FC<NoticePublishModalProps> = ({
  isOpen,
  onClose,
  onPublishNotice,
  currentUserName,
  currentUserRoleTitle
}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<NoticeCategory>('Academic');
  const [priority, setPriority] = useState<NoticePriority>('NORMAL');
  const [status, setStatus] = useState<NoticeStatus>('PUBLISHED');
  const [scheduledFor, setScheduledFor] = useState('');
  
  // Auto-Delete / Expiry Timer State
  const [expiryPreset, setExpiryPreset] = useState<'none' | '12h' | '24h' | '3d' | '7d' | 'custom'>('none');
  const [customExpiryDate, setCustomExpiryDate] = useState('');

  // Attachments
  const [attachmentName, setAttachmentName] = useState('');
  const [attachmentsList, setAttachmentsList] = useState<UploadAsset[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleAddAttachment = () => {
    if (attachmentName.trim()) {
      const name = attachmentName.includes('.') ? attachmentName : `${attachmentName}.pdf`;
      const newAtt: UploadAsset = {
        title: name,
        category: 'Notice',
        uploadedAt: new Date().toISOString(),
        status: 'Published',
        fileSize: '2.4 MB'
      };
      setAttachmentsList([...attachmentsList, newAtt]);
      setAttachmentName('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const calculateExpiresAt = (): string | undefined => {
    if (expiryPreset === 'none') return undefined;

    const now = new Date();
    if (expiryPreset === '12h') {
      now.setHours(now.getHours() + 12);
      return now.toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    }
    if (expiryPreset === '24h') {
      now.setHours(now.getHours() + 24);
      return now.toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    }
    if (expiryPreset === '3d') {
      now.setDate(now.getDate() + 3);
      return now.toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    }
    if (expiryPreset === '7d') {
      now.setDate(now.getDate() + 7);
      return now.toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    }
    if (expiryPreset === 'custom' && customExpiryDate) {
      return new Date(customExpiryDate).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    }
    return undefined;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const expiresAt = calculateExpiresAt();

    const newNotice: NoticeItem = {
      title: title.trim(),
      content: content.trim(),
      authorName: currentUserName,
      authorRole: currentUserRoleTitle,
      category,
      priority,
      status,
      targetAudience: {},
      attachments: attachmentsList.length > 0 ? attachmentsList : undefined,
      scheduledFor: status === 'SCHEDULED' ? scheduledFor : undefined,
      expiresAt,
      publishedAt: new Date().toISOString(),
      readBy: [],
      viewsCount: 0
    };

    onPublishNotice(newNotice);
    setTitle('');
    setContent('');
    setAttachmentsList([]);
    setExpiryPreset('none');
    setCustomExpiryDate('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-[#c6c5d4] max-h-[90vh] overflow-y-auto font-sans text-slate-800">
        <div className="flex justify-between items-center mb-4 border-b border-[#c6c5d4] pb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#000666] text-[24px]">campaign</span>
            <h3 className="font-bold text-[20px] text-[#071e27]">Publish Official Notice</h3>
          </div>
          <button onClick={onClose} className="text-[#767683] hover:text-[#071e27]">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div>
            <label className="block text-[12px] font-bold text-[#454652] uppercase mb-1">Notice Heading</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. End-Semester Practical Exam Schedule for TE CSE"
              className="w-full border border-[#c6c5d4] bg-[#f3faff] rounded-xl p-3 text-[13px] font-semibold text-[#071e27] outline-none focus:ring-2 focus:ring-[#000666]"
            />
          </div>

          {/* Category & Priority Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-bold text-[#454652] uppercase mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as NoticeCategory)}
                className="w-full border border-[#c6c5d4] bg-[#f3faff] rounded-xl p-3 text-[13px] font-semibold text-[#071e27] outline-none"
              >
                <option value="Academic">Academic</option>
                <option value="Exam">Examination</option>
                <option value="Event">Department Event</option>
                <option value="Emergency">Urgent Notice</option>
                <option value="Administrative">Administrative</option>
                <option value="Placement">Placement Notice</option>
              </select>
            </div>

            <div>
              <label className="block text-[12px] font-bold text-[#454652] uppercase mb-1">Priority</label>
              <div className="flex gap-2">
                {(['NORMAL', 'HIGH', 'URGENT'] as NoticePriority[]).map((p) => (
                  <button
                    type="button"
                    key={p}
                    onClick={() => setPriority(p)}
                    className={`flex-1 py-2.5 rounded-xl text-[11px] font-bold transition-all ${
                      priority === p
                        ? p === 'URGENT'
                          ? 'bg-[#ffdad6] text-[#ba1a1a] ring-2 ring-[#ba1a1a]'
                          : p === 'HIGH'
                          ? 'bg-[#ffe9c7] text-[#7a4b00] ring-2 ring-amber-500'
                          : 'bg-[#d9e2ff] text-[#00429c] ring-2 ring-[#000666]'
                        : 'bg-[#f3faff] text-[#454652] border border-[#c6c5d4]'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Auto-Delete / Expiry Timer Selector */}
          <div className="bg-[#fff8f6] p-4 rounded-xl border border-[#ffb4ab] space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-[12px] font-bold text-[#ba1a1a] uppercase tracking-wider flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px]">timer</span>
                Auto-Delete Expiry Timer
              </h4>
              <span className="text-[11px] text-[#767683]">Notice will automatically expire & delete</span>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              {[
                { id: 'none', label: '♾️ Never Expire' },
                { id: '12h', label: '⏱️ 12 Hours' },
                { id: '24h', label: '⏱️ 24 Hours (1 Day)' },
                { id: '3d', label: '⏱️ 3 Days' },
                { id: '7d', label: '⏱️ 7 Days (1 Week)' },
                { id: 'custom', label: '📅 Custom Date' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setExpiryPreset(opt.id as any)}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-bold border transition-all ${
                    expiryPreset === opt.id
                      ? 'bg-[#ba1a1a] text-white border-[#ba1a1a] shadow-xs'
                      : 'bg-white text-[#454652] border-[#c6c5d4] hover:bg-[#fff0ee]'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {expiryPreset === 'custom' && (
              <div className="pt-2">
                <input
                  type="datetime-local"
                  value={customExpiryDate}
                  onChange={(e) => setCustomExpiryDate(e.target.value)}
                  className="bg-white border border-[#c6c5d4] rounded-lg px-3 py-1.5 text-xs text-[#071e27] font-medium outline-none focus:ring-2 focus:ring-[#ba1a1a]"
                />
              </div>
            )}
          </div>

          {/* Content TextArea */}
          <div>
            <label className="block text-[12px] font-bold text-[#454652] uppercase mb-1">Notice Content</label>
            <textarea
              rows={5}
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Provide information for students..."
              className="w-full border border-[#c6c5d4] bg-[#f3faff] rounded-xl p-3 text-[13px] text-[#071e27] outline-none focus:ring-2 focus:ring-[#000666]"
            ></textarea>
          </div>

          {/* File Attachments Uploader */}
          <div>
            <label className="block text-[12px] font-bold text-[#454652] uppercase mb-1">Notice Attachments</label>
            <div className="flex gap-2 mb-2">
              <input
                type="file"
                ref={fileInputRef}
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    setAttachmentName(e.target.files[0].name);
                  }
                }}
                className="flex-1 border border-[#c6c5d4] rounded-xl px-3 py-1.5 text-[12px] outline-none file:mr-4 file:py-1.5 file:px-4 file:rounded-full file:border-0 file:text-[11px] file:font-bold file:bg-[#e6f6ff] file:text-[#000666] hover:file:bg-[#d9e2ff] cursor-pointer"
              />
              <button
                type="button"
                onClick={handleAddAttachment}
                className="px-4 py-2 bg-[#e6f6ff] text-[#000666] font-bold text-[12px] rounded-xl border border-[#c6c5d4] hover:bg-[#d9e2ff] transition-colors"
              >
                Upload
              </button>
            </div>

            {attachmentsList.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {attachmentsList.map((att, idx) => (
                  <span key={idx} className="bg-[#d9e2ff] text-[#00429c] text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-2">
                    <span className="material-symbols-outlined text-[14px]">attach_file</span>
                    {att.title}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Publishing Mode */}
          <div className="flex items-center justify-between pt-3 border-t border-[#c6c5d4]">
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-1.5 text-[12px] font-bold text-[#071e27] cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  checked={status === 'PUBLISHED'}
                  onChange={() => setStatus('PUBLISHED')}
                  className="w-4 h-4 text-[#000666]"
                />
                <span>Publish Immediately</span>
              </label>

              <label className="flex items-center gap-1.5 text-[12px] font-bold text-[#071e27] cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  checked={status === 'DRAFT'}
                  onChange={() => setStatus('DRAFT')}
                  className="w-4 h-4 text-[#000666]"
                />
                <span>Save as Draft</span>
              </label>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-[#c6c5d4] rounded-lg text-[13px] font-semibold text-[#071e27]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-[#000666] text-white rounded-lg text-[13px] font-bold hover:bg-[#1a237e] transition-colors shadow-md"
              >
                {status === 'DRAFT' ? 'SAVE DRAFT' : 'PUBLISH NOTICE NOW'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
