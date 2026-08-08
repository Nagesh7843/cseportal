import { NoticeItem, StudentRecord, FacultyMember, EmailLog, UploadAsset } from '@/types';

const API_BASE_URL = 'http://localhost:8080/api/v1';

const getAuthHeaders = (): Record<string, string> => {
  const token = localStorage.getItem('sit_portal_jwt_token');
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

export const apiService = {
  // Authentication Endpoints (JWT + PostgreSQL sitportaldb)
  async loginUser(email: string, password: string, role: string) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, role }),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Authentication failed');
    }
    const data = await response.json();
    if (data.token) {
      localStorage.setItem('sit_portal_jwt_token', data.token);
    }
    return data;
  },

  // Notice Endpoints (PostgreSQL sitportaldb)
  async fetchNotices(): Promise<NoticeItem[]> {
    const response = await fetch(`${API_BASE_URL}/notices`, { headers: getAuthHeaders() });
    if (!response.ok) throw new Error('Failed to fetch notices from database');
    return await response.json();
  },

  async createNotice(notice: Partial<NoticeItem>): Promise<NoticeItem> {
    const response = await fetch(`${API_BASE_URL}/notices`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(notice),
    });
    if (!response.ok) throw new Error('Failed to save notice to database');
    return await response.json();
  },

  // Student Endpoints (PostgreSQL sitportaldb)
  async fetchStudents(): Promise<StudentRecord[]> {
    const response = await fetch(`${API_BASE_URL}/students`, { headers: getAuthHeaders() });
    if (!response.ok) throw new Error('Failed to fetch students from database');
    return await response.json();
  },

  async addStudent(student: StudentRecord): Promise<StudentRecord> {
    const response = await fetch(`${API_BASE_URL}/students`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(student),
    });
    if (!response.ok) throw new Error('Failed to save student to database');
    return await response.json();
  },

  // Faculty Endpoints (PostgreSQL sitportaldb)
  async fetchFaculty(): Promise<FacultyMember[]> {
    const response = await fetch(`${API_BASE_URL}/faculty`, { headers: getAuthHeaders() });
    if (!response.ok) throw new Error('Failed to fetch faculty from database');
    return await response.json();
  },

  async addFaculty(faculty: FacultyMember): Promise<FacultyMember> {
    const response = await fetch(`${API_BASE_URL}/faculty`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(faculty),
    });
    if (!response.ok) throw new Error('Failed to save faculty to database');
    return await response.json();
  },

  // Document Endpoints (PostgreSQL sitportaldb)
  async fetchDocuments(): Promise<UploadAsset[]> {
    const response = await fetch(`${API_BASE_URL}/documents`, { headers: getAuthHeaders() });
    if (!response.ok) throw new Error('Failed to fetch documents from database');
    return await response.json();
  },

  async uploadDocument(asset: UploadAsset): Promise<UploadAsset> {
    const response = await fetch(`${API_BASE_URL}/documents`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(asset),
    });
    if (!response.ok) throw new Error('Failed to save document to database');
    return await response.json();
  },

  // Email Broadcast Endpoints (PostgreSQL sitportaldb)
  async fetchEmailLogs(): Promise<EmailLog[]> {
    const response = await fetch(`${API_BASE_URL}/email/logs`, { headers: getAuthHeaders() });
    if (!response.ok) throw new Error('Failed to fetch email logs from database');
    return await response.json();
  },

  async sendBroadcast(emailLog: EmailLog): Promise<EmailLog> {
    const response = await fetch(`${API_BASE_URL}/email/broadcast`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(emailLog),
    });
    if (!response.ok) throw new Error('Failed to save email broadcast to database');
    return await response.json();
  },

  // FCM Device Token Registration for Push Notifications
  async registerFcmToken(token: string, email?: string) {
    const response = await fetch(`${API_BASE_URL}/notifications/register-token`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ token, email, deviceType: 'Web Browser' }),
    });
    if (!response.ok) throw new Error('Failed to register FCM push token');
    return await response.json();
  },

  // Real-time Analytics Statistics
  async fetchAnalyticsStats() {
    const response = await fetch(`${API_BASE_URL}/analytics/stats`, { headers: getAuthHeaders() });
    if (!response.ok) throw new Error('Failed to fetch analytics stats');
    return await response.json();
  }
};
