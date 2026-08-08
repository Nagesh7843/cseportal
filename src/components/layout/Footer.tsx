import React from 'react';
import { ViewMode } from '@/types';
import sitLogo from '@/assets/sit-logo.png';

interface FooterProps {
  onNavigate?: (view: ViewMode) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="w-full bg-[#071e27] text-[#f3faff] py-8 px-6 mt-12 border-t border-[#767683]">
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <img src={sitLogo} alt="Sharad Institute of Technology" className="h-12 w-auto object-contain shrink-0" />
          <div>
            <span className="font-bold text-[18px] text-[#f3faff]">CSE Department Portal</span>
            <p className="text-[11px] text-[#cfe6f2]/80">Computer Science & Engineering Department</p>
          </div>
          <span className="w-px h-4 bg-[#c6c5d4] opacity-50 hidden sm:inline-block"></span>
          <p className="text-[13px] opacity-80">
            © 2024 Computer Science & Engineering Department.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 text-[13px]">
          <button 
            onClick={() => onNavigate && onNavigate('public-landing')} 
            className="text-[#cfe6f2] hover:text-[#e0e0ff] transition-colors"
          >
            Portal Home
          </button>
          <button 
            onClick={() => onNavigate && onNavigate('curriculum')} 
            className="text-[#cfe6f2] hover:text-[#e0e0ff] transition-colors"
          >
            Curriculum & Syllabus
          </button>
          <button 
            onClick={() => onNavigate && onNavigate('faculty')} 
            className="text-[#cfe6f2] hover:text-[#e0e0ff] transition-colors"
          >
            Faculty Directory
          </button>
          <button 
            onClick={() => onNavigate && onNavigate('settings')} 
            className="text-[#cfe6f2] hover:text-[#e0e0ff] transition-colors"
          >
            Settings
          </button>
        </div>
      </div>

      {/* Department Contact & Address */}
      <div className="max-w-[1440px] mx-auto mt-8 pt-8 border-t border-[#c6c5d4]/20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Address */}
          <div>
            <h4 className="text-[13px] font-bold text-[#759efd] uppercase tracking-widest mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">location_on</span>
              Department Address
            </h4>
            <p className="text-[13px] text-[#cfe6f2] leading-relaxed">
              Department of Computer Science & Engineering
              <br />
              Sharad Institute of Technology College of Engineering,
              <br />
              Yadrav – Ichalkaranji – 416121, Tal- Shirol, Dist.- Kolhapur, Maharashtra, India
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[13px] font-bold text-[#759efd] uppercase tracking-widest mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">mail</span>
              Department Contact
            </h4>
            <ul className="space-y-2 text-[13px] text-[#cfe6f2]">
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-[#759efd]">school</span>
                Department Email: <a href="mailto:csedepartment@sitcoe.org.in" className="hover:text-[#e0e0ff] transition-colors font-semibold">csedepartment@sitcoe.org.in</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
