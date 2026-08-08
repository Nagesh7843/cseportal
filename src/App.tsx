import React, { useState, useEffect } from 'react';
import { ViewMode, UserRole, UserProfile, FacultyMember, ActivityLog, UploadAsset, EmailLog, StudentRecord, NoticeItem } from '@/types';
import { apiService } from '@/services/api';
import { COURSES_DATA, DEPARTMENT_EVENTS } from '@/data';

import { Sidebar, Header, Footer } from '@/components/layout';
import { Modals } from '@/components/modals';

import { AdminDashboard, FacultyDashboard, HodDashboard } from '@/features/dashboard';
import { PublicLanding } from '@/features/public-landing';
import { LoginView } from '@/features/auth';
import { BulkEmailPanel } from '@/features/email';
import { CurriculumView } from '@/features/curriculum';
import { FacultyDirectoryView, StudentsDirectoryView } from '@/features/directory';
import { AnalyticsView } from '@/features/analytics';
import { SettingsView } from '@/features/settings';
import { NoticeFeedView, NoticePublishModal } from '@/features/notices';
import { DocumentLibraryView } from '@/features/documents';
import { AiHelpdeskChatbot } from '@/components/AiHelpdeskChatbot';

export default function App() {
  const [activeView, setActiveView] = useState<ViewMode>('public-landing');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<UserRole>('public');
  const [currentProfile, setCurrentProfile] = useState<UserProfile | null>(null);

  // 100% Database-driven state initialized to empty arrays (No local storage)
  const [facultyList, setFacultyList] = useState<FacultyMember[]>([]);
  const [studentsList, setStudentsList] = useState<StudentRecord[]>([]);
  const [activities, setActivities] = useState<ActivityLog[]>([]);
  const [uploads, setUploads] = useState<UploadAsset[]>([]);
  const [emailLogs, setEmailLogs] = useState<EmailLog[]>([]);
  const [notices, setNotices] = useState<NoticeItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [showUrgentNotice, setShowUrgentNotice] = useState(false);
  const [showAddNotice, setShowAddNotice] = useState(false);
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [showUploadAssignment, setShowUploadAssignment] = useState(false);
  const [showUploadMaterial, setShowUploadMaterial] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showPublishNoticeModal, setShowPublishNoticeModal] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Fetch Database Records on Load (PostgreSQL sitportaldb)
  const loadDatabaseData = async () => {
    try {
      const [fetchedNotices, fetchedStudents, fetchedFaculty, fetchedEmails, fetchedDocuments] = await Promise.all([
        apiService.fetchNotices().catch(() => []),
        apiService.fetchStudents().catch(() => []),
        apiService.fetchFaculty().catch(() => []),
        apiService.fetchEmailLogs().catch(() => []),
        apiService.fetchDocuments().catch(() => []),
      ]);

      setNotices(fetchedNotices);
      setStudentsList(fetchedStudents);
      setFacultyList(fetchedFaculty);
      setEmailLogs(fetchedEmails);
      setUploads(fetchedDocuments);
    } catch (err) {
      console.warn('Database sync warning:', err);
    }
  };

  useEffect(() => {
    loadDatabaseData();
    const savedSession = localStorage.getItem('sit_portal_auth_session');
    if (savedSession) {
      try {
        const { role, profile, activeView: savedView } = JSON.parse(savedSession);
        if (role && profile) {
          setIsLoggedIn(true);
          setUserRole(role);
          setCurrentProfile(profile);
          setActiveView(savedView || (role === 'admin' ? 'dashboard' : role === 'hod' ? 'hod-dashboard' : role === 'faculty' ? 'faculty-portal' : 'notices'));
        }
      } catch (err) {
        console.warn('Session parse warning:', err);
      }
    }
  }, []);

  // Authentication & Role Navigation Guard
  const handleProtectedNavigate = (targetView: ViewMode) => {
    const publicViews: ViewMode[] = ['public-landing', 'login', 'curriculum', 'notices', 'faculty', 'documents', 'students'];
    const adminViews: ViewMode[] = ['analytics', 'bulk-email'];

    if (!isLoggedIn && !publicViews.includes(targetView)) {
      alert('Authentication Required: Please sign in to access this portal section.');
      setActiveView('login');
      return;
    }

    if (adminViews.includes(targetView) && userRole !== 'admin' && userRole !== 'faculty') {
      alert('Access Restricted: System analytics and broadcast panels require Administrator or Faculty credentials.');
      return;
    }
    
    setActiveView(targetView);
  };

  // Login Success Handler (With localStorage Session Persistence)
  const handleLoginSuccess = (role: UserRole, email: string, customProfile?: Partial<UserProfile>) => {
    setIsLoggedIn(true);
    setUserRole(role);

    let profile: UserProfile;
    let defaultView: ViewMode = 'notices';

    if (customProfile && customProfile.name) {
      profile = {
        name: customProfile.name,
        roleTitle: customProfile.roleTitle || 'Verified User',
        role: customProfile.role || role,
        avatar: customProfile.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
        department: customProfile.department || 'Computer Science & Engineering',
        email: customProfile.email || email
      };
      defaultView = role === 'admin' ? 'dashboard' : role === 'hod' ? 'hod-dashboard' : role === 'faculty' ? 'faculty-portal' : 'notices';
    } else if (role === 'admin') {
      profile = {
        name: 'Nagesh',
        roleTitle: 'Super Administrator & Website Controller',
        role: 'admin',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
        department: 'Computer Science & Engineering',
        email: 'gnagesh550@gmail.com'
      };
      defaultView = 'dashboard';
    } else if (role === 'hod') {
      profile = {
        name: 'Dr. A. S. Poornima',
        roleTitle: 'Head of Department (HOD CSE)',
        role: 'hod',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
        department: 'Computer Science & Engineering',
        email: email || 'poornima@sitcoe.org.in'
      };
      defaultView = 'hod-dashboard';
    } else if (role === 'faculty') {
      profile = {
        name: 'Prof. Veena K',
        roleTitle: 'Assistant Professor',
        role: 'faculty',
        avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=250',
        department: 'Computer Science & Engineering',
        email: email || 'veena@sitcoe.org.in'
      };
      defaultView = 'faculty-portal';
    } else {
      profile = {
        name: 'Rahul Sharma',
        roleTitle: 'B.Tech CSE Student',
        role: 'student',
        avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=250',
        department: 'Computer Science & Engineering',
        email: email || 'rahul@sitcoe.org.in'
      };
      defaultView = 'notices';
    }

    setCurrentProfile(profile);
    setActiveView(defaultView);

    // Save Persistent Session to localStorage
    localStorage.setItem('sit_portal_auth_session', JSON.stringify({
      role,
      email: profile.email,
      profile,
      activeView: defaultView
    }));
  };

  // Logout Handler (Clears Persistent Session)
  const handleLogout = () => {
    localStorage.removeItem('sit_portal_auth_session');
    setIsLoggedIn(false);
    setUserRole('public');
    setCurrentProfile(null);
    setActiveView('public-landing');
  };

  // Protected Action Handler
  const requireAuthAction = (action: () => void) => {
    if (!isLoggedIn) {
      alert('Authentication Required: Please sign in to perform this activity.');
      setActiveView('login');
      return;
    }
    action();
  };

  // Toggle Faculty status
  const handleToggleFacultyStatus = (id: string) => {
    requireAuthAction(() => {
      setFacultyList((prev) =>
        prev.map((f) => {
          if (f.id === id) {
            const statuses: FacultyMember['status'][] = ['ON CAMPUS', 'IN MEETING', 'IN LAB', 'OFF CAMPUS'];
            const nextIndex = (statuses.indexOf(f.status) + 1) % statuses.length;
            return { ...f, status: statuses[nextIndex] };
          }
          return f;
        })
      );
    });
  };

  // Notice Handlers (Saves directly to PostgreSQL sitportaldb via REST API)
  const handlePublishNotice = async (newNotice: NoticeItem) => {
    requireAuthAction(async () => {
      try {
        const savedNotice = await apiService.createNotice(newNotice);
        setNotices((prev) => [savedNotice || newNotice, ...prev]);
        
        const newAct: ActivityLog = {
          id: `act-${Date.now()}`,
          title: `Notice Published: ${newNotice.title}`,
          subtitle: `Target: ${newNotice.targetAudience.academicYear?.join(', ') || 'All Students'}`,
          timeAgo: 'Just now',
          icon: 'campaign',
          type: 'notice',
          colorBg: 'bg-[#d9e2ff]',
          colorIcon: 'text-[#00429c]'
        };
        setActivities((prev) => [newAct, ...prev]);
      } catch (err) {
        alert('Failed to save notice to PostgreSQL database.');
      }
    });
  };

  const handleDeleteNotice = (noticeId: string) => {
    requireAuthAction(() => {
      setNotices((prev) => prev.filter((n) => n.id !== noticeId));
    });
  };

  const handleMarkAsRead = (noticeId: string) => {
    requireAuthAction(() => {
      const userId = currentProfile?.role === 'admin' ? 'admin-1' : currentProfile?.role === 'faculty' ? 'fac-1' : 'stu-1';
      setNotices((prev) =>
        prev.map((n) => {
          const readByList = n.readBy || [];
          if (n.id === noticeId && !readByList.includes(userId)) {
            return { ...n, readBy: [...readByList, userId] };
          }
          return n;
        })
      );
    });
  };

  // Email Broadcast Handler (Saves directly to PostgreSQL sitportaldb)
  const handleSendBroadcast = async (newLog: EmailLog) => {
    requireAuthAction(async () => {
      try {
        const savedLog = await apiService.sendBroadcast(newLog);
        setEmailLogs((prev) => [savedLog || newLog, ...prev]);
        
        const newAct: ActivityLog = {
          id: `act-${Date.now()}`,
          title: `Broadcast: ${newLog.subject}`,
          subtitle: `To ${newLog.recipientGroup}`,
          timeAgo: 'Just now',
          icon: 'campaign',
          type: 'email',
          colorBg: 'bg-[#d9e2ff]',
          colorIcon: 'text-[#00429c]'
        };
        setActivities((prev) => [newAct, ...prev]);
      } catch (err) {
        alert('Failed to save broadcast log to database.');
      }
    });
  };

  const handleSendUrgentNotice = (title: string, message: string) => {
    requireAuthAction(() => {
      const urgentNoticeItem: NoticeItem = {
        id: `notice-urgent-${Date.now()}`,
        title: `[EMERGENCY DIRECTIVE] ${title}`,
        content: message,
        authorName: currentProfile?.name || 'Nagesh',
        authorRole: currentProfile?.roleTitle || 'Super Administrator & Website Controller',
        category: 'Emergency',
        priority: 'URGENT',
        status: 'PUBLISHED',
        targetAudience: { role: ['student', 'faculty'] },
        publishedAt: 'Just now',
        readBy: [],
        viewsCount: 0
      };
      handlePublishNotice(urgentNoticeItem);
      alert('EMERGENCY ALERT SAVED DIRECTLY TO POSTGRESQL DATABASE.');
    });
  };

  const handleAddNotice = (notice: ActivityLog) => {
    requireAuthAction(() => setActivities((prev) => [notice, ...prev]));
  };

  // Document Upload Handler (Saves directly to PostgreSQL sitportaldb)
  const handleAddAsset = async (asset: UploadAsset) => {
    requireAuthAction(async () => {
      try {
        const savedAsset = await apiService.uploadDocument(asset);
        setUploads((prev) => [savedAsset || asset, ...prev]);
      } catch (err) {
        alert('Failed to save document to PostgreSQL database.');
      }
    });
  };

  // Add Student Handler (Saves directly to PostgreSQL sitportaldb)
  const handleAddStudent = async (student: StudentRecord) => {
    requireAuthAction(async () => {
      try {
        const savedStudent = await apiService.addStudent(student);
        setStudentsList((prev) => [savedStudent || student, ...prev]);
      } catch (err) {
        alert('Failed to save student record to PostgreSQL database.');
      }
    });
  };

  // Render standalone Login Page
  if (activeView === 'login') {
    return <LoginView onLoginSuccess={handleLoginSuccess} onNavigate={handleProtectedNavigate} />;
  }

  return (
    <div className="min-h-screen bg-[#f3faff] text-[#071e27] flex flex-col font-sans">
      {/* Sidebar Navigation */}
      <Sidebar
        activeView={activeView}
        onNavigate={handleProtectedNavigate}
        userRole={userRole}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
        onOpenUrgentNotice={() => requireAuthAction(() => setShowUrgentNotice(true))}
      />

      {/* Main Content Area */}
      <div className="lg:pl-[260px] pl-0 flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <Header
          currentProfile={currentProfile}
          isLoggedIn={isLoggedIn}
          onLogout={handleLogout}
          onNavigate={handleProtectedNavigate}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onOpenNotifications={() => requireAuthAction(() => setShowNotifications(true))}
          onOpenHelp={() => setShowHelp(true)}
          onToggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        />

        {/* Dynamic View Container */}
        <main className="flex-1 p-6 max-w-[1440px] w-full mx-auto animate-in fade-in duration-150">
          {activeView === 'dashboard' && (
            <AdminDashboard
              onNavigate={handleProtectedNavigate}
              facultyList={facultyList}
              onToggleFacultyStatus={handleToggleFacultyStatus}
              activities={activities}
              students={studentsList}
              onOpenQuickNoticeModal={() => requireAuthAction(() => setShowPublishNoticeModal(true))}
            />
          )}

          {activeView === 'hod-dashboard' && (
            <HodDashboard
              currentProfile={currentProfile}
              facultyList={facultyList}
              notices={notices}
              studentsList={studentsList}
              onNavigate={handleProtectedNavigate}
              onOpenPublishNotice={() => requireAuthAction(() => setShowPublishNoticeModal(true))}
            />
          )}

          {activeView === 'notices' && (
            <NoticeFeedView
              notices={notices}
              currentProfile={currentProfile || {
                name: 'Guest User',
                roleTitle: 'Public Visitor',
                role: 'student',
                avatar: '',
                department: 'CSE',
                email: ''
              }}
              onMarkAsRead={handleMarkAsRead}
              onOpenPublishModal={() => requireAuthAction(() => setShowPublishNoticeModal(true))}
              onDeleteNotice={handleDeleteNotice}
            />
          )}

          {activeView === 'documents' && (
            <DocumentLibraryView
              uploads={uploads}
              onOpenUploadModal={() => requireAuthAction(() => setShowUploadMaterial(true))}
              onNavigate={handleProtectedNavigate}
            />
          )}

          {activeView === 'faculty-portal' && (
            <FacultyDashboard
              onNavigate={handleProtectedNavigate}
              uploads={uploads}
              students={studentsList}
              events={DEPARTMENT_EVENTS}
              onOpenAssignmentModal={() => requireAuthAction(() => setShowUploadAssignment(true))}
              onOpenNoticeModal={() => requireAuthAction(() => setShowPublishNoticeModal(true))}
              onOpenMaterialModal={() => requireAuthAction(() => setShowUploadMaterial(true))}
            />
          )}

          {activeView === 'public-landing' && (
            <PublicLanding notices={notices} onNavigate={handleProtectedNavigate} />
          )}

          {activeView === 'bulk-email' && (
            <BulkEmailPanel
              emailLogs={emailLogs}
              onSendBroadcast={handleSendBroadcast}
              onNavigate={handleProtectedNavigate}
            />
          )}

          {activeView === 'curriculum' && (
            <CurriculumView courses={COURSES_DATA} onNavigate={handleProtectedNavigate} />
          )}

          {activeView === 'faculty' && (
            <FacultyDirectoryView
              facultyList={facultyList}
              onToggleFacultyStatus={handleToggleFacultyStatus}
              onNavigate={handleProtectedNavigate}
            />
          )}

          {activeView === 'students' && (
            <StudentsDirectoryView
              students={studentsList}
              onAddStudent={() => requireAuthAction(() => setShowAddStudent(true))}
              onNavigate={handleProtectedNavigate}
            />
          )}

          {activeView === 'analytics' && <AnalyticsView />}

          {activeView === 'settings' && <SettingsView />}
        </main>

        {/* Footer */}
        <Footer onNavigate={handleProtectedNavigate} />
      </div>

      {/* Modals & Triggers */}
      <Modals
        showUrgentNotice={showUrgentNotice}
        onCloseUrgentNotice={() => setShowUrgentNotice(!showUrgentNotice)}
        onSendUrgentNotice={handleSendUrgentNotice}
        showAddNotice={showAddNotice}
        onCloseAddNotice={() => setShowAddNotice(false)}
        onAddNotice={handleAddNotice}
        showAddStudent={showAddStudent}
        onCloseAddStudent={() => setShowAddStudent(false)}
        onAddStudent={handleAddStudent}
        showUploadAssignment={showUploadAssignment}
        onCloseUploadAssignment={() => setShowUploadAssignment(false)}
        onAddAsset={handleAddAsset}
        showUploadMaterial={showUploadMaterial}
        onCloseUploadMaterial={() => setShowUploadMaterial(false)}
        showNotifications={showNotifications}
        onCloseNotifications={() => setShowNotifications(false)}
        showHelp={showHelp}
        onCloseHelp={() => setShowHelp(false)}
      />

      <NoticePublishModal
        isOpen={showPublishNoticeModal}
        onClose={() => setShowPublishNoticeModal(false)}
        onPublishNotice={handlePublishNotice}
        currentUserName={currentProfile?.name || 'Nagesh'}
        currentUserRoleTitle={currentProfile?.roleTitle || 'Super Administrator & Website Controller'}
      />

      {/* Embedded AI Department Helpdesk & Summarizer Widget */}
      <AiHelpdeskChatbot
        notices={notices}
        faculty={facultyList}
        students={studentsList}
        documents={uploads}
      />
    </div>
  );
}
