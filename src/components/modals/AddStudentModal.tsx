import React, { useState } from 'react';
import { StudentRecord, AcademicYear, Division, BatchGroup } from '@/types';

interface AddStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddStudent: (student: StudentRecord) => void;
}

export const AddStudentModal: React.FC<AddStudentModalProps> = ({
  isOpen,
  onClose,
  onAddStudent
}) => {
  const [studentName, setStudentName] = useState('');
  const [studentRollNo, setStudentRollNo] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [studentBatch, setStudentBatch] = useState('2024-2028');
  const [academicYear, setAcademicYear] = useState<AcademicYear>('SE');
  const [division, setDivision] = useState<Division>('Div A');
  const [batchGroup, setBatchGroup] = useState<BatchGroup>('B1');
  const [studentAttendance, setStudentAttendance] = useState('90');
  const [studentGpa, setStudentGpa] = useState('3.5');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (studentName.trim() && studentRollNo.trim()) {
      const newStudent: StudentRecord = {
        id: `stu-${Date.now()}`,
        name: studentName.trim(),
        rollNo: studentRollNo.trim(),
        attendance: Math.min(100, Math.max(0, Number(studentAttendance) || 0)),
        gpa: Math.min(4, Math.max(0, Number(studentGpa) || 0)),
        batch: studentBatch,
        email: studentEmail.trim() || `${studentRollNo.trim().toLowerCase()}@student.sitcoe.org`,
        avatarBg: 'bg-[#d9e2ff] text-[#00429c]',
        initials: studentName.trim().split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase(),
        academicYear,
        division,
        batchGroup,
        status: 'Active'
      };
      onAddStudent(newStudent);
      setStudentName('');
      setStudentRollNo('');
      setStudentEmail('');
      setStudentBatch('2024-2028');
      setAcademicYear('SE');
      setDivision('Div A');
      setBatchGroup('B1');
      setStudentAttendance('90');
      setStudentGpa('3.5');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#c6c5d4] max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#000666]">person_add</span>
            <h3 className="font-bold text-[18px] text-[#071e27]">Add Student Record</h3>
          </div>
          <button onClick={onClose} className="text-[#767683]">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[12px] font-bold text-[#454652] uppercase mb-1">Full Name</label>
            <input
              type="text"
              required
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="e.g. Riya N. Joshi"
              className="w-full border border-[#c6c5d4] rounded-xl p-3 text-[13px] outline-none focus:ring-2 focus:ring-[#000666]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[12px] font-bold text-[#454652] uppercase mb-1">Roll Number</label>
              <input
                type="text"
                required
                value={studentRollNo}
                onChange={(e) => setStudentRollNo(e.target.value)}
                placeholder="e.g. CS24-045"
                className="w-full border border-[#c6c5d4] rounded-xl p-3 text-[13px] outline-none focus:ring-2 focus:ring-[#000666]"
              />
            </div>
            <div>
              <label className="block text-[12px] font-bold text-[#454652] uppercase mb-1">Academic Year</label>
              <select
                value={academicYear}
                onChange={(e) => setAcademicYear(e.target.value as AcademicYear)}
                className="w-full border border-[#c6c5d4] rounded-xl p-3 text-[13px] outline-none font-semibold text-[#071e27]"
              >
                <option value="FE">First Year (FE)</option>
                <option value="SE">Second Year (SE)</option>
                <option value="TE">Third Year (TE)</option>
                <option value="BE">Final Year (BE)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-[12px] font-bold text-[#454652] uppercase mb-1">Division</label>
              <select
                value={division}
                onChange={(e) => setDivision(e.target.value as Division)}
                className="w-full border border-[#c6c5d4] rounded-xl p-2.5 text-[12px] outline-none font-semibold text-[#071e27]"
              >
                <option value="Div A">Div A</option>
                <option value="Div B">Div B</option>
                <option value="Div C">Div C</option>
              </select>
            </div>
            <div>
              <label className="block text-[12px] font-bold text-[#454652] uppercase mb-1">Batch Group</label>
              <select
                value={batchGroup}
                onChange={(e) => setBatchGroup(e.target.value as BatchGroup)}
                className="w-full border border-[#c6c5d4] rounded-xl p-2.5 text-[12px] outline-none font-semibold text-[#071e27]"
              >
                <option value="B1">Batch B1</option>
                <option value="B2">Batch B2</option>
                <option value="B3">Batch B3</option>
              </select>
            </div>
            <div>
              <label className="block text-[12px] font-bold text-[#454652] uppercase mb-1">Cohort Batch</label>
              <select
                value={studentBatch}
                onChange={(e) => setStudentBatch(e.target.value)}
                className="w-full border border-[#c6c5d4] rounded-xl p-2.5 text-[12px] outline-none font-semibold text-[#071e27]"
              >
                <option value="2024-2028">2024-28</option>
                <option value="2023-2027">2023-27</option>
                <option value="2022-2026">2022-26</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[12px] font-bold text-[#454652] uppercase mb-1">Email Address</label>
            <input
              type="email"
              value={studentEmail}
              onChange={(e) => setStudentEmail(e.target.value)}
              placeholder="student@student.sitcoe.org (auto if blank)"
              className="w-full border border-[#c6c5d4] rounded-xl p-3 text-[13px] outline-none focus:ring-2 focus:ring-[#000666]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[12px] font-bold text-[#454652] uppercase mb-1">Attendance %</label>
              <input
                type="number"
                min={0}
                max={100}
                value={studentAttendance}
                onChange={(e) => setStudentAttendance(e.target.value)}
                className="w-full border border-[#c6c5d4] rounded-xl p-3 text-[13px] outline-none focus:ring-2 focus:ring-[#000666]"
              />
            </div>
            <div>
              <label className="block text-[12px] font-bold text-[#454652] uppercase mb-1">SGPA (0-4)</label>
              <input
                type="number"
                step="0.1"
                min={0}
                max={4}
                value={studentGpa}
                onChange={(e) => setStudentGpa(e.target.value)}
                className="w-full border border-[#c6c5d4] rounded-xl p-3 text-[13px] outline-none focus:ring-2 focus:ring-[#000666]"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-[#c6c5d4] rounded-lg text-[13px] font-semibold text-[#071e27]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#000666] text-white rounded-lg text-[13px] font-bold hover:bg-[#1a237e]"
            >
              Add Student
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
