import React from 'react';
import { ActivityLog, UploadAsset, StudentRecord } from '@/types';
import { UrgentNoticeModal } from './UrgentNoticeModal';
import { AddNoticeModal } from './AddNoticeModal';
import { AddStudentModal } from './AddStudentModal';
import { UploadAssetModal } from './UploadAssetModal';
import { NotificationsDrawer } from './NotificationsDrawer';
import { HelpModal } from './HelpModal';

interface ModalsContainerProps {
  showUrgentNotice: boolean;
  onCloseUrgentNotice: () => void;
  onSendUrgentNotice: (title: string, message: string) => void;

  showAddNotice: boolean;
  onCloseAddNotice: () => void;
  onAddNotice: (notice: ActivityLog) => void;

  showAddStudent: boolean;
  onCloseAddStudent: () => void;
  onAddStudent: (student: StudentRecord) => void;

  showUploadAssignment: boolean;
  onCloseUploadAssignment: () => void;
  onAddAsset: (asset: UploadAsset) => void;

  showUploadMaterial: boolean;
  onCloseUploadMaterial: () => void;

  showNotifications: boolean;
  onCloseNotifications: () => void;

  showHelp: boolean;
  onCloseHelp: () => void;
}

export const ModalsContainer: React.FC<ModalsContainerProps> = ({
  showUrgentNotice,
  onCloseUrgentNotice,
  onSendUrgentNotice,
  showAddNotice,
  onCloseAddNotice,
  onAddNotice,
  showAddStudent,
  onCloseAddStudent,
  onAddStudent,
  showUploadAssignment,
  onCloseUploadAssignment,
  onAddAsset,
  showUploadMaterial,
  onCloseUploadMaterial,
  showNotifications,
  onCloseNotifications,
  showHelp,
  onCloseHelp,
}) => {
  return (
    <>
      {/* Floating Emergency Action FAB */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={onCloseUrgentNotice}
          className="w-14 h-14 bg-[#ba1a1a] hover:bg-[#93000a] text-white rounded-full flex items-center justify-center shadow-2xl transition-transform active:scale-95 group relative cursor-pointer"
          title="Dispatch Urgent Emergency Notice"
        >
          <span className="material-symbols-outlined text-[28px] animate-pulse">
            campaign
          </span>
          <span className="absolute right-16 bg-[#071e27] text-white text-[11px] font-bold px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
            Urgent Notice
          </span>
        </button>
      </div>

      <UrgentNoticeModal
        isOpen={showUrgentNotice}
        onClose={onCloseUrgentNotice}
        onSendUrgentNotice={onSendUrgentNotice}
      />

      <AddNoticeModal
        isOpen={showAddNotice}
        onClose={onCloseAddNotice}
        onAddNotice={onAddNotice}
      />

      <AddStudentModal
        isOpen={showAddStudent}
        onClose={onCloseAddStudent}
        onAddStudent={onAddStudent}
      />

      <UploadAssetModal
        isOpen={showUploadAssignment || showUploadMaterial}
        isAssignmentMode={showUploadAssignment}
        onClose={() => {
          onCloseUploadAssignment();
          onCloseUploadMaterial();
        }}
        onAddAsset={onAddAsset}
      />

      <NotificationsDrawer
        isOpen={showNotifications}
        onClose={onCloseNotifications}
      />

      <HelpModal
        isOpen={showHelp}
        onClose={onCloseHelp}
      />
    </>
  );
};
