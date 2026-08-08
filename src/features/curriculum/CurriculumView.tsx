import React, { useState } from 'react';
import { CourseItem, ViewMode } from '@/types';

const THIRD_YEAR_CSE_SYLLABUS = '/syllabus/TY-CSE_0001-2.pdf';

interface CurriculumViewProps {
  courses: CourseItem[];
  onNavigate: (view: ViewMode) => void;
}

export const CurriculumView: React.FC<CurriculumViewProps> = ({ courses }) => {
  const [selectedSemester, setSelectedSemester] = useState<number | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCourses = courses.filter((course) => {
    const matchesSem = selectedSemester === 'ALL' || course.semester === selectedSemester;
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSem && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[#000666] text-white p-6 rounded-2xl shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-[24px] font-extrabold flex items-center gap-2">
            <span className="material-symbols-outlined text-[28px] text-[#759efd]">menu_book</span>
            Department Curriculum & Syllabus
          </h1>
          <p className="text-[#cfe6f2] text-[13px] mt-1">
            B.Tech Computer Science & Engineering • Choice-Based Credit System (CBCS)
          </p>
        </div>

        <a
          href={THIRD_YEAR_CSE_SYLLABUS}
          download="TY-CSE_0001-2.pdf"
          className="bg-white text-[#000666] font-bold px-4 py-2.5 rounded-xl text-[13px] hover:bg-[#cfe6f2] transition-colors shadow-xs flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-[18px]">download</span>
          <span>Download Third-Year CSE Syllabus</span>
        </a>
      </div>

      <section className="bg-white p-5 rounded-2xl border border-[#c6c5d4] shadow-xs flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex items-start gap-3">
          <span className="material-symbols-outlined text-[28px] text-[#000666]">picture_as_pdf</span>
          <div>
            <h2 className="font-bold text-[16px] text-[#071e27]">Third-Year CSE Syllabus</h2>
            <p className="text-[13px] text-[#454652] mt-1">Official syllabus document for TY Computer Science &amp; Engineering.</p>
          </div>
        </div>
        <div className="flex gap-3 shrink-0">
          <a href={THIRD_YEAR_CSE_SYLLABUS} target="_blank" rel="noreferrer" className="text-[#000666] font-bold text-[13px] hover:underline">View PDF</a>
          <a href={THIRD_YEAR_CSE_SYLLABUS} download="TY-CSE_0001-2.pdf" className="text-[#000666] font-bold text-[13px] hover:underline">Download</a>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-[#c6c5d4] shadow-xs flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[12px] font-bold text-[#454652] uppercase tracking-wider mr-2">Semester:</span>
          {(['ALL', 3, 4, 5, 7, 8] as const).map((sem) => (
            <button
              key={sem}
              onClick={() => setSelectedSemester(sem)}
              className={`px-3 py-1 rounded-full text-[12px] font-semibold transition-all ${
                selectedSemester === sem
                  ? 'bg-[#000666] text-white shadow-xs'
                  : 'bg-[#e6f6ff] text-[#454652] hover:bg-[#cfe6f2]'
              }`}
            >
              {sem === 'ALL' ? 'All Semesters' : `Sem ${sem}`}
            </button>
          ))}
        </div>

        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Filter courses by code, title, or instructor..."
          className="w-full sm:w-72 bg-[#f3faff] border border-[#c6c5d4] rounded-lg px-3.5 py-1.5 text-[13px] focus:ring-2 focus:ring-[#000666] outline-none"
        />
      </div>

      {/* Courses List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCourses.map((course) => (
          <div
            key={course.code}
            className="bg-white p-6 rounded-2xl border border-[#c6c5d4] shadow-xs hover:border-[#000666] transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-start mb-2">
                <span className="bg-[#1a237e] text-white font-bold text-[12px] px-2.5 py-0.5 rounded-md">
                  {course.code}
                </span>
                <span className="text-[11px] font-bold bg-[#e6f6ff] text-[#000666] px-2.5 py-0.5 rounded-full">
                  Sem {course.semester} • {course.credits} Credits
                </span>
              </div>

              <h3 className="font-bold text-[18px] text-[#071e27] mb-2">{course.title}</h3>
              <p className="text-[13px] text-[#454652] leading-relaxed mb-4">{course.description}</p>
            </div>

            <div className="pt-4 border-t border-[#c6c5d4]/40 flex justify-between items-center text-[12px]">
              <div>
                <p className="text-[#767683] uppercase text-[10px] font-bold">Course Instructor</p>
                <p className="font-semibold text-[#071e27]">{course.instructor}</p>
              </div>
              <a
                href={THIRD_YEAR_CSE_SYLLABUS}
                download="TY-CSE_0001-2.pdf"
                className="text-[#000666] font-bold hover:underline flex items-center gap-1"
              >
                <span>TY Syllabus PDF</span>
                <span className="material-symbols-outlined text-[16px]">file_download</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
