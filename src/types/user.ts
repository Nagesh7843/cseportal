export type UserRole = 'admin' | 'hod' | 'faculty' | 'student' | 'public';

export interface UserProfile {
  name: string;
  roleTitle: string;
  role: UserRole;
  avatar: string;
  department: string;
  email: string;
}
