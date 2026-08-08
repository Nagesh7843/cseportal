import React, { useState } from 'react';

export const SettingsView: React.FC = () => {
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [autoSyncDB, setAutoSyncDB] = useState(true);
  const [fcmPushEnabled, setFcmPushEnabled] = useState(true);
  const [smtpHost, setSmtpHost] = useState('smtp.sitcoe.org');
  const [activeDepartment, setActiveDepartment] = useState('CSE');

  const handleSave = () => {
    alert('System preferences and security settings saved successfully.');
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="bg-[#000666] text-white p-6 rounded-2xl shadow-md">
        <h1 className="text-[24px] font-extrabold flex items-center gap-2">
          <span className="material-symbols-outlined text-[28px] text-[#759efd]">settings</span>
          Portal Configuration & Security Audit
        </h1>
        <p className="text-[#cfe6f2] text-[13px] mt-1">
          Configure multi-department settings, SMTP credentials, FCM push permissions, and system security logs.
        </p>
      </div>

      {/* Multi-Department Expansion Setup */}
      <div className="bg-white p-6 rounded-2xl border border-[#c6c5d4] shadow-xs space-y-4">
        <h3 className="font-bold text-[16px] text-[#071e27] flex items-center gap-2">
          <span className="material-symbols-outlined text-[#000666]">domain</span>
          Department Scope Configuration
        </h3>
        <p className="text-[12px] text-[#454652]">
          Select active department scope or enable multi-department cross-broadcast capability.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { code: 'CSE', name: 'Computer Science & Eng.' },
            { code: 'IT', name: 'Information Technology' },
            { code: 'ENTC', name: 'Electronics & Telecomm.' },
          ].map((dept) => (
            <button
              key={dept.code}
              onClick={() => setActiveDepartment(dept.code)}
              className={`p-3.5 rounded-xl border text-left font-bold text-[13px] transition-all ${
                activeDepartment === dept.code
                  ? 'bg-[#000666] text-white border-[#000666] shadow-sm'
                  : 'bg-[#f3faff] text-[#454652] border-[#c6c5d4]'
              }`}
            >
              <span className="block text-[11px] opacity-75 uppercase">Department</span>
              <span>{dept.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-[#c6c5d4] shadow-xs space-y-6">
        <div>
          <h3 className="font-bold text-[16px] text-[#071e27] mb-3">SMTP & Notification Gateway</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-bold text-[#454652] uppercase mb-1">
                SMTP Relay Host
              </label>
              <input
                type="text"
                value={smtpHost}
                onChange={(e) => setSmtpHost(e.target.value)}
                className="w-full bg-[#f3faff] border border-[#c6c5d4] rounded-xl p-3 text-[13px] text-[#071e27] outline-none"
              />
            </div>
            <div>
              <label className="block text-[12px] font-bold text-[#454652] uppercase mb-1">
                Port Number
              </label>
              <input
                type="text"
                defaultValue="587 (TLS)"
                className="w-full bg-[#f3faff] border border-[#c6c5d4] rounded-xl p-3 text-[13px] text-[#071e27] outline-none"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-[#c6c5d4] space-y-3">
          <h3 className="font-bold text-[16px] text-[#071e27]">Automated Services & FCM Push</h3>
          <label className="flex items-center justify-between p-3 bg-[#e6f6ff] rounded-xl cursor-pointer">
            <div>
              <p className="font-bold text-[13px] text-[#071e27]">Firebase Cloud Messaging (FCM) Push Service</p>
              <p className="text-[11px] text-[#454652]">Dispatch instant web push notifications when urgent notices are published</p>
            </div>
            <input
              type="checkbox"
              checked={fcmPushEnabled}
              onChange={(e) => setFcmPushEnabled(e.target.checked)}
              className="w-5 h-5 text-[#000666]"
            />
          </label>

          <label className="flex items-center justify-between p-3 bg-[#e6f6ff] rounded-xl cursor-pointer">
            <div>
              <p className="font-bold text-[13px] text-[#071e27]">Automatic Student Database Sync</p>
              <p className="text-[11px] text-[#454652]">Reconcile attendance and enrollment nightly at 00:00 UTC</p>
            </div>
            <input
              type="checkbox"
              checked={autoSyncDB}
              onChange={(e) => setAutoSyncDB(e.target.checked)}
              className="w-5 h-5 text-[#000666]"
            />
          </label>

          <label className="flex items-center justify-between p-3 bg-[#e6f6ff] rounded-xl cursor-pointer">
            <div>
              <p className="font-bold text-[13px] text-[#071e27]">Email Audit Trail Digests</p>
              <p className="text-[11px] text-[#454652]">Send daily transmission audit digests to Department Head</p>
            </div>
            <input
              type="checkbox"
              checked={emailAlerts}
              onChange={(e) => setEmailAlerts(e.target.checked)}
              className="w-5 h-5 text-[#000666]"
            />
          </label>
        </div>

        {/* System Security Audit Stream */}
        <div className="pt-4 border-t border-[#c6c5d4] space-y-3">
          <h3 className="font-bold text-[16px] text-[#071e27]">System Audit Stream</h3>
          <div className="space-y-2 text-[12px]">
            <div className="p-3 bg-[#f3faff] rounded-xl border border-[#c6c5d4] flex justify-between items-center">
              <div>
                <p className="font-bold text-[#071e27]">Notice Category Published: Exam Directive</p>
                <p className="text-[11px] text-[#454652]">Author: Dr. S. S. Gurav (HOD)</p>
              </div>
              <span className="text-[10px] text-[#767683]">Today, 11:20 AM</span>
            </div>

            <div className="p-3 bg-[#f3faff] rounded-xl border border-[#c6c5d4] flex justify-between items-center">
              <div>
                <p className="font-bold text-[#071e27]">FCM Web Push Device Token Registered</p>
                <p className="text-[11px] text-[#454652]">Role: Student (Alex Chen)</p>
              </div>
              <span className="text-[10px] text-[#767683]">Today, 10:45 AM</span>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-[#c6c5d4] flex justify-end">
          <button
            onClick={handleSave}
            className="px-6 py-2.5 bg-[#000666] text-white font-bold rounded-xl text-[13px] hover:bg-[#1a237e] transition-colors"
          >
            Save Configuration
          </button>
        </div>
      </div>
    </div>
  );
};
