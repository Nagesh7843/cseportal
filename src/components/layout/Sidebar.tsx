import React from 'react';
import { ViewMode, UserRole } from '@/types';

interface SidebarProps {
  activeView: ViewMode;
  onNavigate: (view: ViewMode) => void;
  userRole: UserRole;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
  onOpenUrgentNotice?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeView,
  onNavigate,
  userRole,
  isMobileOpen = false,
  onCloseMobile
}) => {
  // Role-aware Navigation Items
  const getNavItems = (): { id: ViewMode; label: string; icon: string }[] => {
    if (userRole === 'admin') {
      return [
        { id: 'dashboard', label: 'Admin Dashboard', icon: 'dashboard' },
        { id: 'notices', label: 'Digital Notices', icon: 'campaign' },
        { id: 'documents', label: 'Document Library', icon: 'folder_open' },
        { id: 'curriculum', label: 'Curriculum', icon: 'menu_book' },
        { id: 'faculty', label: 'Faculty Directory', icon: 'groups' },
        { id: 'students', label: 'Students Directory', icon: 'school' },
        { id: 'analytics', label: 'System Analytics', icon: 'analytics' },
      ];
    } else if (userRole === 'hod') {
      return [
        { id: 'hod-dashboard', label: 'HOD Executive Hub', icon: 'shield' },
        { id: 'notices', label: 'Digital Notices', icon: 'campaign' },
        { id: 'documents', label: 'Document Library', icon: 'folder_open' },
        { id: 'curriculum', label: 'Curriculum', icon: 'menu_book' },
        { id: 'faculty', label: 'Faculty Directory', icon: 'groups' },
        { id: 'students', label: 'Students Directory', icon: 'school' },
      ];
    } else if (userRole === 'faculty') {
      return [
        { id: 'faculty-portal', label: 'Faculty Hub', icon: 'badge' },
        { id: 'notices', label: 'Digital Notices', icon: 'campaign' },
        { id: 'documents', label: 'Document Library', icon: 'folder_open' },
        { id: 'curriculum', label: 'Curriculum', icon: 'menu_book' },
        { id: 'faculty', label: 'Faculty Roster', icon: 'groups' },
        { id: 'students', label: 'Students Directory', icon: 'school' },
      ];
    } else {
      // Student or Public
      return [
        { id: 'notices', label: 'Digital Notices', icon: 'campaign' },
        { id: 'documents', label: 'Document Library', icon: 'folder_open' },
        { id: 'curriculum', label: 'Curriculum & Syllabus', icon: 'menu_book' },
        { id: 'faculty', label: 'Faculty Availability', icon: 'groups' },
      ];
    }
  };

  const navItems = getNavItems();

  const handleNavClick = (view: ViewMode) => {
    onNavigate(view);
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isMobileOpen && (
        <div 
          onClick={onCloseMobile}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 lg:hidden transition-opacity"
        />
      )}

      {/* Responsive Sidebar Drawer */}
      <aside className={`w-[260px] h-screen fixed left-0 top-0 bg-[#e6f6ff] border-r border-[#c6c5d4] flex flex-col py-2 z-50 transition-transform duration-300 ${
        isMobileOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'
      }`}>
        {/* Brand Identity & Close Mobile Button */}
        <div className="px-4 mb-4 flex items-center justify-between">
          <div 
            onClick={() => handleNavClick('public-landing')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 bg-[#000666] flex items-center justify-center rounded-xl text-white group-hover:scale-105 transition-transform shadow-md">
              <span className="material-symbols-outlined text-[24px]">school</span>
            </div>
            <div>
              <h1 className="font-bold text-[17px] leading-tight text-[#071e27] group-hover:text-[#2b5bb5] transition-colors">
                CSE Department
              </h1>
              <p className="text-[10px] font-semibold text-[#454652] opacity-80 uppercase tracking-wider">
                Communication Portal
              </p>
            </div>
          </div>

          {/* Close button for Mobile Drawer */}
          {onCloseMobile && (
            <button 
              onClick={onCloseMobile}
              className="lg:hidden p-1 text-[#767683] hover:text-[#071e27] rounded-lg"
            >
              <span className="material-symbols-outlined text-[22px]">close</span>
            </button>
          )}
        </div>

        {/* Primary Navigation */}
        <nav className="flex-1 space-y-1 px-2 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => {
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-left text-[13px] font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-[#759efd] text-[#00337c] border-l-4 border-[#2b5bb5] shadow-xs'
                    : 'text-[#454652] hover:bg-[#d5ecf8] hover:text-[#000666]'
                }`}
              >
                <span className={`material-symbols-outlined text-[20px] ${isActive ? 'text-[#00337c]' : 'text-[#454652]'}`}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* CTA Section & Module Badge */}
        <div className="mt-auto px-3 pb-3 space-y-2 pt-2 border-t border-[#c6c5d4]">
          {/* Admin/HOD/Faculty Bulk Email Panel CTA */}
          {(userRole === 'admin' || userRole === 'hod' || userRole === 'faculty') && (
            <button
              onClick={() => handleNavClick('bulk-email')}
              className={`w-full py-2.5 px-3 rounded-xl font-semibold text-[13px] shadow-md transition-all flex items-center justify-center gap-2 active:scale-95 ${
                activeView === 'bulk-email'
                  ? 'bg-[#1a237e] text-white ring-2 ring-[#759efd]'
                  : 'bg-[#000666] hover:bg-[#1a237e] text-white hover:shadow-lg'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">mail</span>
              <span>Bulk Email Panel</span>
            </button>
          )}

          {/* View Switching Quick Links */}
          <div className="space-y-1">
            <button
              onClick={() => handleNavClick('public-landing')}
              className={`w-full flex items-center gap-3 px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-colors ${
                activeView === 'public-landing'
                  ? 'bg-[#cfe6f2] text-[#000666]'
                  : 'text-[#454652] hover:bg-[#d5ecf8]'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">public</span>
              <span>Portal Home</span>
            </button>

            {userRole !== 'public' && (
              <button
                onClick={() => handleNavClick('settings')}
                className={`w-full flex items-center gap-3 px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-colors ${
                  activeView === 'settings'
                    ? 'bg-[#cfe6f2] text-[#000666]'
                    : 'text-[#454652] hover:bg-[#d5ecf8]'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">settings</span>
                <span>Settings</span>
              </button>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};
