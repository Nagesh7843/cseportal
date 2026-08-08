import React, { useMemo, useState } from 'react';
import { LABORATORIES } from '@/data';
import { ViewMode } from '@/types';

interface ResearchViewProps {
  onNavigate: (view: ViewMode) => void;
}

export const ResearchView: React.FC<ResearchViewProps> = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const filteredLabs = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return LABORATORIES.filter((lab) => !query || lab.name.toLowerCase().includes(query) || lab.roomNumber.toLowerCase().includes(query));
  }, [searchQuery]);

  return (
    <div className="space-y-6">
      <div className="bg-[#000666] text-white p-6 rounded-2xl shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-[24px] font-extrabold flex items-center gap-2">
            <span className="material-symbols-outlined text-[28px] text-[#759efd]">computer</span>
            Laboratories
          </h1>
          <p className="text-[#cfe6f2] text-[13px] mt-1">Computer Science & Engineering laboratory infrastructure and equipment.</p>
        </div>
        <div className="bg-white/10 rounded-xl px-4 py-2 text-[13px] font-semibold">{LABORATORIES.length} Laboratories</div>
      </div>

      <div className="bg-white rounded-2xl border border-[#c6c5d4] shadow-xs overflow-hidden">
        <div className="p-5 border-b border-[#c6c5d4] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-bold text-[18px] text-[#071e27]">Laboratory Directory</h2>
            <p className="text-[13px] text-[#454652]">Room allocation, equipment configuration, and total investment.</p>
          </div>
          <label className="relative w-full sm:w-72">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#454652] text-[20px]">search</span>
            <input value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Search lab or room number" className="w-full pl-10 pr-4 py-2.5 bg-[#f3faff] border border-[#c6c5d4] rounded-xl text-[13px] outline-none focus:ring-2 focus:ring-[#000666]" />
          </label>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left">
            <thead className="bg-[#e6f6ff] text-[#000666] text-[11px] uppercase tracking-wider">
              <tr>
                <th className="px-5 py-4 font-bold">Sr. No.</th>
                <th className="px-5 py-4 font-bold">Room Number</th>
                <th className="px-5 py-4 font-bold">Laboratory Name</th>
                <th className="px-5 py-4 font-bold">Equipment List</th>
                <th className="px-5 py-4 font-bold text-right">Total Cost</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#c6c5d4]/60">
              {filteredLabs.map((lab) => (
                <tr key={lab.id} className="hover:bg-[#f3faff] transition-colors align-top">
                  <td className="px-5 py-5 text-[13px] font-bold text-[#071e27]">{lab.id}</td>
                  <td className="px-5 py-5 text-[13px] font-semibold text-[#00429c]">{lab.roomNumber}</td>
                  <td className="px-5 py-5 text-[14px] font-bold text-[#071e27]">{lab.name}</td>
                  <td className="px-5 py-5">
                    <ul className="space-y-1 text-[12px] text-[#454652]">
                      <li className="font-semibold text-[#071e27]">{lab.computers}</li>
                      <li>Processor: {lab.processor}</li>
                      <li>RAM: {lab.ram}</li>
                      <li>Storage: {lab.storage}</li>
                      <li>{lab.additionalEquipment}</li>
                    </ul>
                  </td>
                  <td className="px-5 py-5 text-right text-[14px] font-extrabold text-[#000666] whitespace-nowrap">{lab.totalCost}</td>
                </tr>
              ))}
              {filteredLabs.length === 0 && (
                <tr><td colSpan={5} className="px-5 py-12 text-center text-[13px] text-[#454652]">No laboratories match “{searchQuery}”.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
