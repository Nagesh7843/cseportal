import React, { useState } from 'react';
import { ViewMode, NoticeItem } from '@/types';
import sitLogo from '@/assets/sit-logo.png';
import { Shield, Megaphone, BookOpen, Users, ArrowRight, Sparkles, Clock, ChevronRight } from 'lucide-react';

interface PublicLandingProps {
  onNavigate: (view: ViewMode) => void;
  notices?: NoticeItem[];
}

export const PublicLanding: React.FC<PublicLandingProps> = ({ onNavigate, notices = [] }) => {
  const [selectedNotice, setSelectedNotice] = useState<NoticeItem | null>(null);

  return (
    <div className="space-y-6 font-sans text-slate-800">
      
      {/* Vibrant SIT Navy Hero Banner */}
      <section className="bg-gradient-to-r from-[#000666] via-[#1a237e] to-[#002171] text-white p-6 sm:p-8 rounded-2xl border border-blue-900/40 shadow-2xl relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-cyan-200 text-xs font-semibold border border-white/20 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              Official Department Portal • SIT CSE
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
              Computer Science & Engineering <br />
              <span className="text-cyan-200 font-normal">Communication Portal</span>
            </h1>

            <p className="text-[#cfe6f2] text-xs sm:text-sm leading-relaxed max-w-xl">
              Centralized platform for students & faculty. Digital notice board, curriculum syllabus, document archives, and live directory.
            </p>

            <div className="flex flex-wrap gap-2.5 pt-1">
              <button
                onClick={() => onNavigate('login')}
                className="px-4 py-2.5 bg-amber-400 text-slate-950 font-bold rounded-xl shadow-lg hover:bg-amber-300 transition-all text-xs flex items-center gap-1.5 border border-amber-300 active:scale-95"
              >
                <span>Sign In to Portal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onNavigate('notices')}
                className="px-4 py-2.5 bg-white/10 border border-white/20 text-white hover:bg-white/20 font-semibold rounded-xl transition-all text-xs flex items-center gap-1.5 backdrop-blur-md"
              >
                <Megaphone className="w-3.5 h-3.5 text-cyan-300" />
                <span>Digital Notices</span>
              </button>
              <button
                onClick={() => onNavigate('curriculum')}
                className="px-4 py-2.5 bg-white/10 border border-white/20 text-white hover:bg-white/20 font-semibold rounded-xl transition-all text-xs flex items-center gap-1.5 backdrop-blur-md"
              >
                <BookOpen className="w-3.5 h-3.5 text-cyan-300" />
                <span>Curriculum</span>
              </button>
            </div>
          </div>

          <div className="shrink-0 p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg">
            <img src={sitLogo} alt="SIT Logo" className="h-16 w-auto object-contain brightness-105" />
          </div>
        </div>
      </section>

      {/* Minimal Department Updates Ticker */}
      <div className="bg-white border border-slate-200 rounded-xl h-10 flex items-center overflow-hidden px-4 text-xs">
        <span className="font-bold text-zinc-900 uppercase tracking-wider text-[11px] shrink-0 mr-4 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          Updates
        </span>
        <div className="flex-1 overflow-hidden relative">
          <div className="ticker-animate whitespace-nowrap flex items-center gap-10 text-slate-600 text-[12px]">
            <span>• Academic notice broadcasts active live on central board</span>
            <span>• Document repository updated with new syllabus materials</span>
            <span>• Centralized faculty availability matrix active</span>
          </div>
        </div>
      </div>

      {/* 📌 Sleek Central Digital Notice Stream */}
      <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Megaphone className="w-4 h-4 text-indigo-600" />
              Central Digital Notice Stream
            </h2>
            <p className="text-xs text-slate-500">Live official circulars and academic directives</p>
          </div>

          <button
            onClick={() => onNavigate('notices')}
            className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1"
          >
            <span>All Circulars</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Live Notices Stream */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {notices.slice(0, 4).map((notice) => (
            <div
              key={notice.id}
              onClick={() => setSelectedNotice(notice)}
              className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 hover:border-indigo-300 hover:bg-slate-100/60 transition-all cursor-pointer space-y-2 flex flex-col justify-between"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                    {notice.category}
                  </span>
                  {notice.expiresAt && (
                    <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {notice.expiresAt}
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-xs text-slate-900 line-clamp-1">
                  {notice.title}
                </h3>
                
                <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                  {notice.content}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[10px] text-slate-500">
                <span>By <strong>{notice.authorName}</strong></span>
                <span className="text-indigo-600 font-bold hover:underline flex items-center gap-0.5">
                  Read Directive
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sleek Department Modules Grid */}
      <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-base font-bold text-slate-900">Department Modules</h2>
          <p className="text-xs text-slate-500">Quick navigation to key academic tools</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div 
            onClick={() => onNavigate('notices')}
            className="p-4 bg-slate-50 rounded-xl border border-slate-200 hover:border-indigo-400 transition-all cursor-pointer space-y-2 group"
          >
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold">
              <Megaphone className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-xs text-slate-900">Digital Notice Board</h3>
            <p className="text-[11px] text-slate-500 leading-relaxed">Targeted circulars by Year, Division, and Batch.</p>
          </div>

          <div 
            onClick={() => onNavigate('curriculum')}
            className="p-4 bg-slate-50 rounded-xl border border-slate-200 hover:border-indigo-400 transition-all cursor-pointer space-y-2 group"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
              <BookOpen className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-xs text-slate-900">Curriculum & Syllabus</h3>
            <p className="text-[11px] text-slate-500 leading-relaxed">Course structures, credit schemes, and official syllabus.</p>
          </div>

          <div 
            onClick={() => onNavigate('faculty')}
            className="p-4 bg-slate-50 rounded-xl border border-slate-200 hover:border-indigo-400 transition-all cursor-pointer space-y-2 group"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              <Users className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-xs text-slate-900">Faculty Directory</h3>
            <p className="text-[11px] text-slate-500 leading-relaxed">Faculty profiles, availability status, and office hours.</p>
          </div>
        </div>
      </section>

      {/* Embedded Notice Detail Modal */}
      {selectedNotice && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-xl w-full shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto font-sans">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="bg-indigo-50 text-indigo-700 font-bold text-[11px] px-2.5 py-0.5 rounded-full">
                  {selectedNotice.category}
                </span>
                <h3 className="font-bold text-lg text-slate-900 mt-2 leading-snug">{selectedNotice.title}</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Published by <strong>{selectedNotice.authorName}</strong> ({selectedNotice.authorRole}) • {selectedNotice.publishedAt}
                </p>
                {selectedNotice.expiresAt && (
                  <p className="text-xs text-amber-800 font-bold mt-1">
                    ⏳ Auto-Expiry Timer: {selectedNotice.expiresAt}
                  </p>
                )}
              </div>
              <button onClick={() => setSelectedNotice(null)} className="text-slate-400 hover:text-slate-700">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-800 whitespace-pre-wrap leading-relaxed mb-4">
              {selectedNotice.content}
            </div>

            <div className="flex justify-end pt-2 border-t border-slate-100">
              <button
                onClick={() => setSelectedNotice(null)}
                className="px-5 py-2 bg-slate-900 text-white rounded-xl font-bold text-xs"
              >
                Close Notice
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
