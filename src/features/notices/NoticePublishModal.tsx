import React, { useState } from 'react';
import { NoticeItem, NoticeCategory, NoticePriority, NoticeStatus, AcademicYear, Division, BatchGroup, UploadAsset } from '@/types';

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

  // Audience Target Selection
  const [targetYears, setTargetYears] = useState<AcademicYear[]>(['SE', 'TE', 'BE']);
  const [targetDivisions, setTargetDivisions] = useState<Division[]>(['Div A', 'Div B']);
  const [targetBatches, setTargetBatches] = useState<BatchGroup[]>(['B1', 'B2', 'B3']);

  // Attachments
  const [attachmentName, setAttachmentName] = useState('');
  const [attachmentsList, setAttachmentsList] = useState<UploadAsset[]>([]);

  if (!isOpen) return null;

  const toggleYear = (y: AcademicYear) => {
    setTargetYears((prev) => (prev.includes(y) ? prev.filter((item) => item !== y) : [...prev, y]));
  };

  const toggleDivision = (d: Division) => {
    setTargetDivisions((prev) => (prev.includes(d) ? prev.filter((item) => item !== d) : [...prev, d]));
  };

  const toggleBatch = (b: BatchGroup) => {
    setTargetBatches((prev) => (prev.includes(b) ? prev.filter((item) => item !== b) : [...prev, b]));
  };

  const handleAddAttachment = () => {
    if (attachmentName.trim()) {
      const name = attachmentName.endsWith('.pdf') || attachmentName.endsWith('.zip') ? attachmentName : `${attachmentName}.pdf`;
      const newAtt: UploadAsset = {
        id: `att-${Date.now()}`,
        name,
        category: 'Notice',
        date: 'Today',
        status: 'Published',
        fileSize: '2.4 MB'
      };
      setAttachmentsList([...attachmentsList, newAtt]);
      setAttachmentName('');
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
      id: `notice-${Date.now()}`,
      title: title.trim(),
      content: content.trim(),
      authorName: currentUserName,
      authorRole: currentUserRoleTitle,
      category,
      priority,
      status,
      targetAudience: {
        academicYear: targetYears.length > 0 ? targetYears : undefined,
        division: targetDivisions.length > 0 ? targetDivisions : undefined,
        batchGroup: targetBatches.length > 0 ? targetBatches : undefined
      },
      attachments: attachmentsList.length > 0 ? attachmentsList : undefined,
      publishedAt: status === 'PUBLISHED' ? 'Just now' : 'Scheduled',
      scheduledFor: status === 'SCHEDULED' ? scheduledFor : undefined,
      expiresAt,
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
                <option value="Emergency">Emergency Directive</option>
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

          {/* Targeted Audience Selector Box */}
          <div className="bg-[#e6f6ff] p-4 rounded-xl border border-[#dbf1fe] space-y-3">
            <h4 className="text-[12px] font-bold text-[#000666] uppercase tracking-wider flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px]">groups</span>
              Target Audience Selection
            </h4>

            {/* Academic Year Checkboxes */}
            <div>
              <p className="text-[11px] font-semibold text-[#454652] mb-1.5">Academic Years:</p>
              <div className="flex flex-wrap gap-2">
                {(['FE', 'SE', 'TE', 'BE'] as AcademicYear[]).map((y) => (
                  <button
                    type="button"
                    key={y}
                    onClick={() => toggleYear(y)}
                    className={`px-3 py-1 rounded-lg text-[12px] font-bold border transition-colors ${
                      targetYears.includes(y)
                        ? 'bg-[#000666] text-white border-[#000666]'
                        : 'bg-white text-[#454652] border-[#c6c5d4]'
                    }`}
                  >
                    {y}
                  </button>
                ))}
              </div>
            </div>

            {/* Division Checkboxes */}
            <div>
              <p className="text-[11px] font-semibold text-[#454652] mb-1.5">Divisions:</p>
              <div className="flex flex-wrap gap-2">
                {(['Div A', 'Div B', 'Div C'] as Division[]).map((d) => (
                  <button
                    type="button"
                    key={d}
                    onClick={() => toggleDivision(d)}
                    className={`px-3 py-1 rounded-lg text-[12px] font-bold border transition-colors ${
                      targetDivisions.includes(d)
                        ? 'bg-[#2b5bb5] text-white border-[#2b5bb5]'
                        : 'bg-white text-[#454652] border-[#c6c5d4]'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Batch Group Checkboxes */}
            <div>
              <p className="text-[11px] font-semibold text-[#454652] mb-1.5">Batches:</p>
              <div className="flex flex-wrap gap-2">
                {(['B1', 'B2', 'B3'] as BatchGroup[]).map((b) => (
                  <button
                    type="button"
                    key={b}
                    onClick={() => toggleBatch(b)}
                    className={`px-3 py-1 rounded-lg text-[12px] font-bold border transition-colors ${
                      targetBatches.includes(b)
                        ? 'bg-[#003909] text-[#a3f69c] border-[#003909]'
                        : 'bg-white text-[#454652] border-[#c6c5d4]'
                    }`}
                  >
                    Batch {b}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Content TextArea */}
          <div>
            <label className="block text-[12px] font-bold text-[#454652] uppercase mb-1">Notice Directive Body</label>
            <textarea
              rows={5}
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Provide detailed information, guidelines, and directives for students..."
              className="w-full border border-[#c6c5d4] bg-[#f3faff] rounded-xl p-3 text-[13px] text-[#071e27] outline-none focus:ring-2 focus:ring-[#000666]"
            ></textarea>
          </div>

          {/* File Attachments Uploader */}
          <div>
            <label className="block text-[12px] font-bold text-[#454652] uppercase mb-1">Notice Attachments</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={attachmentName}
                onChange={(e) => setAttachmentName(e.target.value)}
                placeholder="Attachment title (e.g. Circular_Doc_2024.pdf)"
                className="flex-1 border border-[#c6c5d4] rounded-xl px-3 py-2 text-[12px] outline-none"
              />
              <button
                type="button"
                onClick={handleAddAttachment}
                className="px-4 py-2 bg-[#e6f6ff] text-[#000666] font-bold text-[12px] rounded-xl border border-[#c6c5d4]"
              >
                Add File
              </button>
            </div>

            {attachmentsList.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {attachmentsList.map((att, idx) => (
                  <span key={idx} className="bg-[#d9e2ff] text-[#00429c] text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-2">
                    <span className="material-symbols-outlined text-[14px]">attach_file</span>
                    {att.name}
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
