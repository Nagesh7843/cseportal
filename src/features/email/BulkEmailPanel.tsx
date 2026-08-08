import React, { useState } from 'react';
import { EmailLog, ViewMode, AcademicYear, Division, BatchGroup } from '@/types';

interface BulkEmailPanelProps {
  emailLogs: EmailLog[];
  onSendBroadcast: (newLog: EmailLog) => void;
  onNavigate: (view: ViewMode) => void;
}

export const BulkEmailPanel: React.FC<BulkEmailPanelProps> = ({
  emailLogs,
  onSendBroadcast,
  onNavigate
}) => {
  const [recipientGroup, setRecipientGroup] = useState('All Students');
  const [priority, setPriority] = useState<'URGENT' | 'NORMAL'>('NORMAL');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [scheduleForLater, setScheduleForLater] = useState(false);
  const [requestReceipts, setRequestReceipts] = useState(true);
  const [attachments, setAttachments] = useState<{ name: string; size: string }[]>([]);

  // Targeted Audience Filters
  const [selectedYears, setSelectedYears] = useState<AcademicYear[]>(['SE', 'TE', 'BE']);
  const [selectedDivs, setSelectedDivs] = useState<Division[]>(['Div A', 'Div B']);
  const [selectedBatches, setSelectedBatches] = useState<BatchGroup[]>(['B1', 'B2', 'B3']);

  // Sending Simulation State
  const [isSending, setIsSending] = useState(false);
  const [sendProgress, setSendProgress] = useState(0);
  const [showAiDraftModal, setShowAiDraftModal] = useState(false);
  const [aiTopic, setAiTopic] = useState('');
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [showAttachModal, setShowAttachModal] = useState(false);
  const [newFileName, setNewFileName] = useState('');
  const [selectedLog, setSelectedLog] = useState<EmailLog | null>(null);

  const toggleYear = (y: AcademicYear) => {
    setSelectedYears((prev) => (prev.includes(y) ? prev.filter((i) => i !== y) : [...prev, y]));
  };

  const toggleDiv = (d: Division) => {
    setSelectedDivs((prev) => (prev.includes(d) ? prev.filter((i) => i !== d) : [...prev, d]));
  };

  const toggleBatch = (b: BatchGroup) => {
    setSelectedBatches((prev) => (prev.includes(b) ? prev.filter((i) => i !== b) : [...prev, b]));
  };

  const applyTemplate = (templateType: 'EXAM' | 'LAB' | 'EVENT' | 'EMERGENCY') => {
    if (templateType === 'EXAM') {
      setSubject('URGENT DIRECTIVE: End-Semester Examination Schedule & Guidelines');
      setMessage(
        `Dear Students,\n\nThe official timetable for End-Semester Examinations is published. Please report 15 minutes before the start time in Hall 3 & Hall 4 with your official hall ticket and identity badge.\n\nBest regards,\nAcademic Coordinator\nCSE Department`
      );
    } else if (templateType === 'LAB') {
      setSubject('NOTICE: Computing Laboratory Maintenance & Hardware Upgrades');
      setMessage(
        `Dear Students & Staff,\n\nPlease note that CS Lab 2 & 4 will undergo hardware maintenance and GPU workstation updates from Friday 18:00 hrs to Saturday 08:00 hrs.\n\nSystems Administrator`
      );
    } else if (templateType === 'EVENT') {
      setSubject('ANNOUNCEMENT: Department Technical Symposium "Hack-SIT 2024"');
      setMessage(
        `Dear CSE Students,\n\nRegistrations are officially open for Hack-SIT 2024! Form your teams of 3-4 members and register before the submission deadline.\n\nEvent Advisory Committee`
      );
    } else if (templateType === 'EMERGENCY') {
      setPriority('URGENT');
      setSubject('[EMERGENCY OVERRIDE] Campus Administrative Alert');
      setMessage(
        `ATTENTION ALL STUDENTS AND FACULTY:\n\nImmediate department directive issued. All classes and laboratory sessions stand suspended for today. Monitor official channels for further updates.`
      );
    }
  };

  const handleRemoveAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const handleAddAttachment = () => {
    if (newFileName.trim()) {
      setAttachments([...attachments, { name: newFileName.trim(), size: '2.4 MB' }]);
      setNewFileName('');
      setShowAttachModal(false);
    }
  };

  const handleSend = () => {
    if (!subject.trim() || !message.trim()) {
      alert('Please fill out both Subject and Message content before sending.');
      return;
    }

    setIsSending(true);
    setSendProgress(10);

    const interval = setInterval(() => {
      setSendProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            const count = selectedYears.length * 60 + selectedDivs.length * 40;

            const newLog: EmailLog = {
              id: `log-${Date.now()}`,
              subject: subject,
              recipientGroup: `${recipientGroup} (${selectedYears.join(', ')})`,
              recipientCount: count,
              timestamp: 'Just now',
              status: 'SUCCESS',
              priority: priority,
              openRate: '88.4%',
              content: message
            };

            onSendBroadcast(newLog);
            setIsSending(false);
            setSendProgress(0);
            setSubject('');
            setMessage('');
            alert(`Broadcast sent successfully to ${count} targeted recipients!`);
          }, 300);
          return 100;
        }
        return prev + 22;
      });
    }, 250);
  };

  const generateAiDraft = () => {
    if (!aiTopic.trim()) return;
    setIsGeneratingAi(true);

    setTimeout(() => {
      if (aiTopic.toLowerCase().includes('exam') || aiTopic.toLowerCase().includes('schedule')) {
        setSubject('Urgent: B.Tech CSE End-Semester Examination Schedule & Guidelines');
        setMessage(
          `Dear Students,\n\nThe official timetable for the B.Tech CSE End-Semester Examinations is now published. Please carry official hall tickets and student ID cards to all examination halls.\n\nReporting time is 30 minutes prior to exam commencement.\n\nBest regards,\nDepartment Head & Academic Coordinator\nCSE Department`
        );
      } else if (aiTopic.toLowerCase().includes('lab') || aiTopic.toLowerCase().includes('maintenance')) {
        setSubject('Notice: Temporary Laboratory Maintenance & System Downtime');
        setMessage(
          `Dear Faculty & Students,\n\nPlease be advised that CS Labs 2 and 4 will undergo scheduled hardware maintenance and network upgrades.\n\nDowntime Schedule: Friday 18:00 hrs to Saturday 06:00 hrs.\n\nSystems Administrator`
        );
      } else {
        setSubject(`Department Announcement: ${aiTopic}`);
        setMessage(
          `Dear Department Community,\n\nWe are pleased to communicate an important update regarding ${aiTopic}.\n\nPlease review the attached documentation for detailed timelines and instructions.\n\nWarm regards,\nCSE Department`
        );
      }
      setIsGeneratingAi(false);
      setShowAiDraftModal(false);
      setAiTopic('');
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-[#000666] text-white p-6 rounded-2xl shadow-lg gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[28px] text-[#759efd]">mail</span>
            <h1 className="text-[24px] font-extrabold tracking-tight">Targeted Bulk Email Dispatcher</h1>
          </div>
          <p className="text-[#cfe6f2] text-[13px] mt-1">
            Broadcast targeted announcements by Academic Year, Division, and Batch Group with SMTP audit tracking.
          </p>
        </div>

        <button
          onClick={() => setShowAiDraftModal(true)}
          className="bg-[#759efd] text-[#00337c] font-bold px-4 py-2.5 rounded-xl text-[13px] hover:bg-[#b0c6ff] transition-all flex items-center gap-2 shadow-xs shrink-0"
        >
          <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
          <span>AI Draft Helper</span>
        </button>
      </div>

      {/* Main Grid: Composer & Sidebar Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Composer Card */}
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-[#c6c5d4] shadow-xs space-y-6">
          <div className="flex justify-between items-center border-b border-[#c6c5d4] pb-4">
            <h2 className="font-bold text-[18px] text-[#071e27]">Compose Department Broadcast</h2>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold text-[#454652] bg-[#e6f6ff] px-2.5 py-1 rounded-full">
                SMTP Relay Ready
              </span>
            </div>
          </div>

          {/* Quick Pre-built Templates */}
          <div>
            <label className="block text-[12px] font-bold text-[#454652] uppercase tracking-wider mb-1.5">
              Quick Email Templates
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => applyTemplate('EXAM')}
                className="px-3 py-1.5 bg-[#e6f6ff] text-[#000666] text-[12px] font-bold rounded-lg border border-[#c6c5d4] hover:bg-[#cfe6f2] transition-colors"
              >
                Exam Schedule Alert
              </button>
              <button
                type="button"
                onClick={() => applyTemplate('LAB')}
                className="px-3 py-1.5 bg-[#e6f6ff] text-[#000666] text-[12px] font-bold rounded-lg border border-[#c6c5d4] hover:bg-[#cfe6f2] transition-colors"
              >
                Lab Downtime Notice
              </button>
              <button
                type="button"
                onClick={() => applyTemplate('EVENT')}
                className="px-3 py-1.5 bg-[#e6f6ff] text-[#000666] text-[12px] font-bold rounded-lg border border-[#c6c5d4] hover:bg-[#cfe6f2] transition-colors"
              >
                Hackathon Announcement
              </button>
              <button
                type="button"
                onClick={() => applyTemplate('EMERGENCY')}
                className="px-3 py-1.5 bg-[#ffdad6] text-[#ba1a1a] text-[12px] font-bold rounded-lg border border-[#ffb4ab] hover:bg-[#ffb4ab]/40 transition-colors"
              >
                Emergency Override
              </button>
            </div>
          </div>

          {/* Targeted Audience Selector Panel */}
          <div className="bg-[#e6f6ff] p-4 rounded-xl border border-[#dbf1fe] space-y-3">
            <h4 className="text-[12px] font-bold text-[#000666] uppercase tracking-wider flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px]">groups</span>
              Target Audience Filter Selection
            </h4>

            {/* Academic Year Selection */}
            <div>
              <p className="text-[11px] font-semibold text-[#454652] mb-1">Academic Years:</p>
              <div className="flex flex-wrap gap-2">
                {(['FE', 'SE', 'TE', 'BE'] as AcademicYear[]).map((y) => (
                  <button
                    type="button"
                    key={y}
                    onClick={() => toggleYear(y)}
                    className={`px-3 py-1 rounded-lg text-[12px] font-bold border transition-colors ${
                      selectedYears.includes(y)
                        ? 'bg-[#000666] text-white border-[#000666]'
                        : 'bg-white text-[#454652] border-[#c6c5d4]'
                    }`}
                  >
                    {y}
                  </button>
                ))}
              </div>
            </div>

            {/* Division Selection */}
            <div>
              <p className="text-[11px] font-semibold text-[#454652] mb-1">Divisions:</p>
              <div className="flex flex-wrap gap-2">
                {(['Div A', 'Div B', 'Div C'] as Division[]).map((d) => (
                  <button
                    type="button"
                    key={d}
                    onClick={() => toggleDiv(d)}
                    className={`px-3 py-1 rounded-lg text-[12px] font-bold border transition-colors ${
                      selectedDivs.includes(d)
                        ? 'bg-[#2b5bb5] text-white border-[#2b5bb5]'
                        : 'bg-white text-[#454652] border-[#c6c5d4]'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Batch Selection */}
            <div>
              <p className="text-[11px] font-semibold text-[#454652] mb-1">Batches:</p>
              <div className="flex flex-wrap gap-2">
                {(['B1', 'B2', 'B3'] as BatchGroup[]).map((b) => (
                  <button
                    type="button"
                    key={b}
                    onClick={() => toggleBatch(b)}
                    className={`px-3 py-1 rounded-lg text-[12px] font-bold border transition-colors ${
                      selectedBatches.includes(b)
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

          {/* Subject Line & Priority */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-3">
              <label className="block text-[12px] font-bold text-[#454652] uppercase tracking-wider mb-1.5">
                Subject Line
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. B.Tech CSE Semester Examination Timetable 2024"
                className="w-full bg-[#f3faff] border border-[#c6c5d4] rounded-xl px-4 py-2.5 text-[13px] text-[#071e27] font-semibold focus:outline-none focus:ring-2 focus:ring-[#000666]"
              />
            </div>

            <div>
              <label className="block text-[12px] font-bold text-[#454652] uppercase tracking-wider mb-1.5">
                Priority Tag
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setPriority('NORMAL')}
                  className={`flex-1 py-2.5 rounded-xl text-[11px] font-bold transition-all ${
                    priority === 'NORMAL'
                      ? 'bg-[#d9e2ff] text-[#00429c] ring-2 ring-[#2b5bb5]'
                      : 'bg-[#f3faff] text-[#454652] border border-[#c6c5d4]'
                  }`}
                >
                  NORMAL
                </button>
                <button
                  type="button"
                  onClick={() => setPriority('URGENT')}
                  className={`flex-1 py-2.5 rounded-xl text-[11px] font-bold transition-all ${
                    priority === 'URGENT'
                      ? 'bg-[#ffdad6] text-[#ba1a1a] ring-2 ring-[#ba1a1a]'
                      : 'bg-[#f3faff] text-[#454652] border border-[#c6c5d4]'
                  }`}
                >
                  URGENT
                </button>
              </div>
            </div>
          </div>

          {/* Message Content */}
          <div>
            <label className="block text-[12px] font-bold text-[#454652] uppercase tracking-wider mb-1.5">
              Message Content
            </label>
            <div className="border border-[#c6c5d4] rounded-xl overflow-hidden bg-[#f3faff]">
              <textarea
                rows={7}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your official broadcast content here..."
                className="w-full p-4 bg-white text-[13px] text-[#071e27] focus:outline-none resize-none"
              ></textarea>
            </div>
          </div>

          {/* Attached Documents */}
          <div>
            <label className="block text-[12px] font-bold text-[#454652] uppercase tracking-wider mb-2">
              Attached Documents ({attachments.length})
            </label>
            <div className="flex flex-wrap gap-2.5 items-center">
              {attachments.map((att, idx) => (
                <div
                  key={idx}
                  className="bg-[#e6f6ff] text-[#000666] px-3 py-1.5 rounded-lg text-[12px] font-semibold border border-[#c6c5d4] flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[16px] text-[#2b5bb5]">attach_file</span>
                  <span>{att.name} ({att.size})</span>
                  <button
                    onClick={() => handleRemoveAttachment(idx)}
                    className="text-[#767683] hover:text-[#ba1a1a]"
                  >
                    <span className="material-symbols-outlined text-[16px]">close</span>
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={() => setShowAttachModal(true)}
                className="px-3 py-1.5 rounded-lg border border-dashed border-[#000666] text-[#000666] text-[12px] font-bold hover:bg-[#e6f6ff] transition-colors flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[16px]">add</span>
                <span>Attach Files</span>
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4 border-t border-[#c6c5d4]">
            <div className="flex flex-wrap gap-4 text-[13px] text-[#071e27] font-medium">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={scheduleForLater}
                  onChange={(e) => setScheduleForLater(e.target.checked)}
                  className="w-4 h-4 rounded text-[#000666]"
                />
                <span>Schedule for later</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={requestReceipts}
                  onChange={(e) => setRequestReceipts(e.target.checked)}
                  className="w-4 h-4 rounded text-[#000666]"
                />
                <span>Request read receipts</span>
              </label>
            </div>

            <button
              onClick={handleSend}
              disabled={isSending}
              className="w-full sm:w-auto px-8 py-3 bg-[#000666] text-white font-bold text-[14px] rounded-xl hover:bg-[#1a237e] transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-[18px]">send</span>
              <span>{isSending ? 'SENDING...' : 'SEND TARGETED BROADCAST'}</span>
            </button>
          </div>

          {/* Sending Progress Bar */}
          {isSending && (
            <div className="bg-[#e6f6ff] p-4 rounded-xl border border-[#759efd] animate-in fade-in duration-150">
              <div className="flex justify-between text-[12px] font-bold text-[#000666] mb-1.5">
                <span>Transmitting Encrypted Payload to SMTP Server...</span>
                <span>{sendProgress}%</span>
              </div>
              <div className="w-full bg-[#c6c5d4] rounded-full h-3 overflow-hidden">
                <div
                  className="bg-[#000666] h-3 rounded-full transition-all duration-200"
                  style={{ width: `${sendProgress}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        {/* Transmission Stats Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-[#c6c5d4] shadow-xs space-y-4">
            <h3 className="font-bold text-[16px] text-[#071e27]">Transmission Performance</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#e6f6ff] p-3.5 rounded-xl border border-[#dbf1fe]">
                <p className="text-[11px] font-bold text-[#454652] uppercase">Success Rate</p>
                <p className="text-[18px] font-extrabold text-[#000666]">99.4%</p>
              </div>
              <div className="bg-[#e6f6ff] p-3.5 rounded-xl border border-[#dbf1fe]">
                <p className="text-[11px] font-bold text-[#454652] uppercase">Avg Open Rate</p>
                <p className="text-[18px] font-extrabold text-[#2b5bb5]">88.2%</p>
              </div>
            </div>
          </div>

          <div className="bg-[#d5ecf8] p-5 rounded-2xl border border-[#c6c5d4] space-y-2">
            <div className="flex items-center gap-2 text-[#000666]">
              <span className="material-symbols-outlined text-[20px]">verified</span>
              <h4 className="font-bold text-[14px]">Security & Audit Notice</h4>
            </div>
            <p className="text-[12px] text-[#454652] leading-relaxed">
              Every broadcast dispatch is logged with full recipient lists and timestamped audit receipts.
            </p>
          </div>
        </div>
      </div>

      {/* Audit Logs Table */}
      <div className="bg-white p-6 rounded-2xl border border-[#c6c5d4] shadow-xs">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="font-bold text-[18px] text-[#071e27]">Recent Transmission Audit Logs</h2>
            <p className="text-[12px] text-[#454652]">Audit records of all departmental email broadcasts</p>
          </div>
          <span className="text-[12px] font-bold text-[#000666] bg-[#e6f6ff] px-3 py-1 rounded-full">
            Total Broadcasts: {emailLogs.length}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px]">
            <thead className="bg-[#e6f6ff] text-[#454652] font-semibold border-b border-[#c6c5d4]">
              <tr>
                <th className="py-3 px-4">Subject</th>
                <th className="py-3 px-4">Target Recipients</th>
                <th className="py-3 px-4">Recipients</th>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Priority</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#c6c5d4]/40">
              {emailLogs.map((log) => (
                <tr
                  key={log.id}
                  onClick={() => setSelectedLog(log)}
                  className="hover:bg-[#f3faff] transition-colors cursor-pointer"
                >
                  <td className="py-3 px-4 font-bold text-[#071e27]">{log.subject}</td>
                  <td className="py-3 px-4 text-[#454652]">{log.recipientGroup}</td>
                  <td className="py-3 px-4 font-semibold text-[#071e27]">{log.recipientCount || 240}</td>
                  <td className="py-3 px-4 text-[#454652]">{log.timestamp}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                        log.priority === 'URGENT'
                          ? 'bg-[#ffdad6] text-[#ba1a1a]'
                          : 'bg-[#d9e2ff] text-[#00429c]'
                      }`}
                    >
                      {log.priority}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    {log.status === 'SUCCESS' ? (
                      <span className="inline-flex items-center gap-1 text-emerald-600 font-bold text-[11px] bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                        SUCCESS
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-red-600 font-bold text-[11px] bg-red-50 px-2.5 py-0.5 rounded-full border border-red-200">
                        FAILED
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      {showAiDraftModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl border border-[#c6c5d4]">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#759efd]">auto_awesome</span>
                <h3 className="font-bold text-[18px] text-[#071e27]">AI Announcement Assistant</h3>
              </div>
              <button onClick={() => setShowAiDraftModal(false)} className="text-[#767683]">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <input
              type="text"
              value={aiTopic}
              onChange={(e) => setAiTopic(e.target.value)}
              placeholder="e.g. Exam Schedule, Lab Downtime..."
              className="w-full border rounded-xl p-3 text-[13px] mb-4"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowAiDraftModal(false)}
                className="px-4 py-2 border rounded-lg text-[13px]"
              >
                Cancel
              </button>
              <button
                onClick={generateAiDraft}
                className="px-5 py-2 bg-[#000666] text-white rounded-lg text-[13px] font-bold"
              >
                {isGeneratingAi ? 'Drafting...' : 'Generate Draft'}
              </button>
            </div>
          </div>
        </div>
      )}

      {showAttachModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-[#c6c5d4]">
            <h3 className="font-bold text-[18px] text-[#071e27] mb-3">Attach Document</h3>
            <input
              type="text"
              value={newFileName}
              onChange={(e) => setNewFileName(e.target.value)}
              placeholder="Document title (e.g. Circular_2024.pdf)"
              className="w-full border rounded-xl p-3 text-[13px] mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowAttachModal(false)}
                className="px-4 py-2 border rounded-lg text-[13px]"
              >
                Cancel
              </button>
              <button
                onClick={handleAddAttachment}
                className="px-4 py-2 bg-[#000666] text-white rounded-lg text-[13px] font-bold"
              >
                Add File
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedLog && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl border border-[#c6c5d4]">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-[#d9e2ff] text-[#00429c] px-2 py-0.5 rounded-full">
                  Transmission Log #{selectedLog.id}
                </span>
                <h3 className="font-bold text-[18px] text-[#071e27] mt-1">{selectedLog.subject}</h3>
              </div>
              <button onClick={() => setSelectedLog(null)} className="text-[#767683]">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="space-y-2 text-[13px] bg-[#e6f6ff] p-4 rounded-xl mb-4">
              <p><strong>Recipients:</strong> {selectedLog.recipientGroup}</p>
              <p><strong>Total Delivered:</strong> {selectedLog.recipientCount || 240}</p>
              <p><strong>Timestamp:</strong> {selectedLog.timestamp}</p>
              <p><strong>Open Rate:</strong> {selectedLog.openRate || '88.4%'}</p>
            </div>

            <div className="p-4 bg-gray-50 border rounded-xl text-[13px] whitespace-pre-wrap max-h-48 overflow-y-auto mb-4">
              {selectedLog.content || 'No body preview stored.'}
            </div>

            <div className="text-right">
              <button
                onClick={() => setSelectedLog(null)}
                className="px-5 py-2 bg-[#000666] text-white rounded-lg text-[13px] font-bold"
              >
                Close Audit Record
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
