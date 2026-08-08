export interface ActivityLog {
  id: string;
  title: string;
  subtitle: string;
  timeAgo: string;
  icon: string;
  type: 'notice' | 'faculty' | 'email' | 'system';
  colorBg: string;
  colorIcon: string;
}

export interface UploadAsset {
  id: string;
  name: string;
  category: 'Material' | 'Assignment' | 'Notice' | 'Syllabus';
  date: string;
  status: 'Published' | 'Pending Review' | 'Archived';
  fileSize?: string;
  downloadUrl?: string;
}

export interface EmailLog {
  id: string;
  subject: string;
  recipientGroup: string;
  recipientCount: number;
  timestamp: string;
  status: 'SUCCESS' | 'FAILED' | 'SCHEDULED' | 'SENDING';
  priority: 'URGENT' | 'NORMAL';
  openRate?: string;
  content?: string;
}

export interface DepartmentEvent {
  id: string;
  title: string;
  dateDay: string;
  dateMonth: string;
  location: string;
  time: string;
  category: string;
  status: 'Upcoming' | 'Closed' | 'Live';
}
