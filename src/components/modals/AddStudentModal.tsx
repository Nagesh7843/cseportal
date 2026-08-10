import React, { useState, useEffect } from 'react';
import { StudentRecord, AcademicYear, Division, BatchGroup } from '@/types';

interface AddStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddStudent: (student: StudentRecord) => void;
  onAddStudentsBulk?: (students: StudentRecord[]) => void;
}

export const AddStudentModal: React.FC<AddStudentModalProps> = ({
  isOpen,
  onClose,
  onAddStudent,
  onAddStudentsBulk
}) => {
  const [mode, setMode] = useState<'single' | 'bulk'>('single');
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [csvError, setCsvError] = useState('');
  const [studentName, setStudentName] = useState('');
  const [studentRollNo, setStudentRollNo] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [studentBatch, setStudentBatch] = useState('2024-2028');
  const [academicYear, setAcademicYear] = useState<AcademicYear>('SE');
  const [division, setDivision] = useState<Division>('Div A');
  const [batchGroup, setBatchGroup] = useState<BatchGroup>('A1');
  const [studentPrn, setStudentPrn] = useState('');
  const [studentGpa, setStudentGpa] = useState('3.5');

  useEffect(() => {
    if (division === 'Div A' && !batchGroup.startsWith('A')) setBatchGroup('A1');
    if (division === 'Div B' && !batchGroup.startsWith('B')) setBatchGroup('B1');
    if (division === 'Div C' && !batchGroup.startsWith('C')) setBatchGroup('C1');
  }, [division]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (studentName.trim() && studentRollNo.trim()) {
      const newStudent: StudentRecord = {
        name: studentName.trim(),
        rollNo: studentRollNo.trim(),
        prn: studentPrn,
        gpa: Math.min(4, Math.max(0, Number(studentGpa) || 0)),
        cohortBatch: studentBatch,
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
      setBatchGroup('A1');
      setStudentPrn('');
      setStudentGpa('3.5');
      onClose();
    }
  };

  const handleBulkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!csvFile || !onAddStudentsBulk) return;
    
    setCsvError('');
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (!text) {
        setCsvError('Failed to read file.');
        return;
      }
      
      const lines = text.split('\n').filter(line => line.trim());
      if (lines.length < 2) {
        setCsvError('File appears empty or missing data rows.');
        return;
      }
      
      // Assume header: Name, RollNo, Email, AcademicYear, Division, BatchGroup
      const records: StudentRecord[] = [];
      for (let i = 1; i < lines.length; i++) {
        const row = lines[i].split(',').map(s => s.trim());
        if (row.length >= 2 && row[0] && row[1]) {
          records.push({
            name: row[0],
            rollNo: row[1],
            email: row[2] || `${row[1].toLowerCase()}@student.sitcoe.org`,
            academicYear: (row[3] as AcademicYear) || 'SE',
            division: (row[4] as Division) || 'Div A',
            batchGroup: (row[5] as BatchGroup) || 'A1',
            prn: '',
            gpa: 3.5,
            cohortBatch: '2024-2028',
            avatarBg: 'bg-[#d9e2ff] text-[#00429c]',
            initials: row[0].split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase(),
            status: 'Active'
          });
        }
      }
      
      if (records.length === 0) {
        setCsvError('No valid student records found in CSV.');
      } else {
        onAddStudentsBulk(records);
        setCsvFile(null);
        setMode('single');
        onClose();
      }
    };
    reader.readAsText(csvFile);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#c6c5d4] max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#000666]">{mode === 'single' ? 'person_add' : 'group_add'}</span>
            <h3 className="font-bold text-[18px] text-[#071e27]">Add Student {mode === 'bulk' ? 'Bulk Import' : 'Record'}</h3>
          </div>
          <button onClick={onClose} className="text-[#767683]">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="flex gap-2 p-1 bg-[#e6f6ff] rounded-xl mb-5">
          <button
            type="button"
            onClick={() => setMode('single')}
            className={`flex-1 py-1.5 text-[12px] font-bold rounded-lg transition-colors ${mode === 'single' ? 'bg-white text-[#000666] shadow-sm' : 'text-[#454652] hover:text-[#000666]'}`}
          >
            Single Entry
          </button>
          <button
            type="button"
            onClick={() => setMode('bulk')}
            className={`flex-1 py-1.5 text-[12px] font-bold rounded-lg transition-colors ${mode === 'bulk' ? 'bg-white text-[#000666] shadow-sm' : 'text-[#454652] hover:text-[#000666]'}`}
          >
            Bulk CSV Import
          </button>
        </div>

        {mode === 'single' ? (
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
                {division === 'Div A' && (
                  <>
                    <option value="A1">Batch A1</option>
                    <option value="A2">Batch A2</option>
                    <option value="A3">Batch A3</option>
                  </>
                )}
                {division === 'Div B' && (
                  <>
                    <option value="B1">Batch B1</option>
                    <option value="B2">Batch B2</option>
                    <option value="B3">Batch B3</option>
                  </>
                )}
                {division === 'Div C' && (
                  <>
                    <option value="C1">Batch C1</option>
                    <option value="C2">Batch C2</option>
                    <option value="C3">Batch C3</option>
                  </>
                )}
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
            <div className="md:col-span-1">
              <label className="block text-[12px] font-bold text-[#454652] uppercase mb-1">PRN Number</label>
              <div className="relative">
                <input 
                  type="text" 
                  value={studentPrn}
                  onChange={(e) => setStudentPrn(e.target.value)}
                  placeholder="e.g. 2024CSE12345"
                  className="w-full h-11 pl-4 pr-4 bg-white border border-[#c3d3d9] rounded-lg text-[14px] text-[#071e27] placeholder-[#7d828a] focus:outline-none focus:border-[#0060df] focus:ring-1 focus:ring-[#0060df] transition-all"
                />
              </div>
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
        ) : (
        <form onSubmit={handleBulkSubmit} className="space-y-4">
          <div className="bg-[#f3faff] border border-dashed border-[#000666] rounded-xl p-6 text-center">
            <span className="material-symbols-outlined text-[32px] text-[#000666] mb-2">upload_file</span>
            <p className="text-[13px] font-bold text-[#071e27] mb-1">Select a CSV or Excel export file</p>
            <p className="text-[11px] text-[#454652] mb-4">Format: Name, RollNo, Email, AcademicYear, Division, BatchGroup</p>
            
            <input 
              type="file" 
              accept=".csv"
              onChange={(e) => setCsvFile(e.target.files?.[0] || null)}
              className="w-full text-[12px] file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-[12px] file:font-bold file:bg-[#e6f6ff] file:text-[#000666] hover:file:bg-[#d9e2ff] cursor-pointer"
            />
          </div>
          {csvError && <p className="text-[12px] text-[#ba1a1a] font-bold">{csvError}</p>}
          <button
            type="submit"
            disabled={!csvFile}
            className="w-full bg-[#000666] text-white font-bold py-3 rounded-xl text-[14px] hover:bg-[#000444] transition-colors disabled:opacity-50"
          >
            Import CSV Data
          </button>
        </form>
        )}
      </div>
    </div>
  );
};
