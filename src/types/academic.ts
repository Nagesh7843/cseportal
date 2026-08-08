export type AcademicYear = 'FE' | 'SE' | 'TE' | 'BE';
export type Division = 'Div A' | 'Div B' | 'Div C';
export type BatchGroup = 'B1' | 'B2' | 'B3';
export type DepartmentCode = 'CSE' | 'IT' | 'E&TC' | 'AI&DS';

export interface FacultyMember {
  id: string;
  name: string;
  specialization: string;
  rank: string;
  status: 'ON CAMPUS' | 'IN MEETING' | 'IN LAB' | 'OFF CAMPUS';
  email: string;
  avatar?: string;
  officeHours?: string;
  publicationsCount?: number;
  designation?: string;
  qualification?: string;
  teachingExperience?: string;
  industrialExperience?: string;
  department?: DepartmentCode;
  assignedDivisions?: Division[];
  assignedCourses?: string[];
}

export interface StudentRecord {
  id: string;
  name: string;
  rollNo: string;
  attendance: number;
  gpa: number;
  batch: string;
  email: string;
  avatarBg?: string;
  initials?: string;
  academicYear?: AcademicYear;
  division?: Division;
  batchGroup?: BatchGroup;
  status?: 'Active' | 'Inactive';
}

export interface CourseItem {
  code: string;
  title: string;
  semester: number;
  credits: number;
  type: 'Core' | 'Elective' | 'Lab';
  instructor: string;
  description: string;
}
