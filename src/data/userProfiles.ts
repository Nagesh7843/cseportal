import { UserProfile } from '@/types';

export const ADMIN_PROFILE: UserProfile = {
  name: 'Department Administrator',
  roleTitle: 'System Admin',
  role: 'admin',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
  department: 'Computer Science & Engineering',
  email: 'admin@sitcoe.org.in'
};

export const FACULTY_PROFILE: UserProfile = {
  name: 'Faculty Member',
  roleTitle: 'Assistant Professor',
  role: 'faculty',
  avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
  department: 'Computer Science & Engineering',
  email: 'faculty@sitcoe.org.in'
};
